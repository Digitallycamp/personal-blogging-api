export const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ 
      success: false, 
      message: "Unauthorized. Please login first." 
    });
  }
};


export const adminAuth = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      success: false, 
      message: "Forbidden. Admin access required." 
    });
  }
};