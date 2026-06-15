import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../models/user.model.js';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../services/email/email.services.js';
import dotenv from 'dotenv';

dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          success: false,
          message: "All fields are required" 
        });
      }
      
      const existingUser = await UserModel.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ 
          success: false,
          message: "User already exists with this email or username" 
        });
      }

      const newUser = new UserModel({ username, email, password });
      await newUser.save();

      return res.status(StatusCodes.CREATED).json({ 
        success: true,
        message: "User registered successfully",
        data: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        } 
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  },
  
  login: async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Email and password are required"
      });
    }
    
    try {
      const user = await UserModel.findOne({ email });
      
      if (!user || !(await user.comparePassword(password))) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          success: false,
          message: "Invalid email or password" 
        });
      }

      
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: "Internal server error" 
          });
        }

        req.session.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        };

        return res.status(StatusCodes.OK).json({ 
          success: true,
          message: "Login successful",
          data: req.session.user
        });
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  },

  googleLogin: async (req, res) => {
    const { token } = req.body;
    
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      const { sub: googleId, email, name, picture } = payload;
      
      let user = await UserModel.findOne({ $or: [{ email }, { googleId }] });
      
      if (!user) {
        user = new UserModel({
          username: name.replace(/\s/g, '').toLowerCase() + Date.now(),
          email,
          googleId,
          avatar: picture,
          password: null
        });
        await user.save();
      } else if (!user.googleId) {
        
        user.googleId = googleId;
        user.avatar = picture || user.avatar;
        await user.save();
      }
      
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            success: false,
            message: "Internal server error" 
          });
        }
        
        req.session.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        };
        
        return res.status(StatusCodes.OK).json({ 
          success: true,
          message: "Google login successful",
          data: req.session.user
        });
      });
    } catch (error) {
      console.error("Google login error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Google authentication failed" 
      });
    }
  },
  
  
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await UserModel.findOne({ email });
      
      if (!user) {
        return res.status(StatusCodes.OK).json({ 
          success: true,
          message: "If an account exists with that email, you will receive a reset link." 
        });
      }
      
      if (user.googleId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "This account uses Google login. Please sign in with Google."
        });
      }
      
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
      
      await sendResetPasswordEmail(email, resetToken);
      
      return res.status(StatusCodes.OK).json({ 
        success: true,
        message: "Password reset email sent." 
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  },
  
  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
      const user = await UserModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
      
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Password reset token is invalid or has expired."
        });
      }
      
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      return res.status(StatusCodes.OK).json({ 
        success: true,
        message: "Password has been reset successfully." 
      });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Internal server error" 
      });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
          success: false,
          message: "Internal server error" 
        });
      }

      res.clearCookie("personal_blog_session", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      
      return res.status(StatusCodes.OK).json({ 
        success: true,
        message: "Logout successful" 
      });
    });
  },
  
  getMe: async (req, res) => {
    try {
      const user = await UserModel.findById(req.session.user.id).select('-password');
      
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not found"
        });
      }
      
      return res.status(StatusCodes.OK).json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
};