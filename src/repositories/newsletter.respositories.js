import { NewsLetterModel } from "../models/newsletter.model.js";

export const newsletterServices  = {
    create: async (payload) => {
        try {
            const existingSubscriber  = await NewsLetterModel.findOne(
                { email: payload.email.toLowerCase() }
            );

            if (existingSubscriber) {
                
                if (!existingSubscriber.isActive) {
                    existingSubscriber.isActive = true;
                    existingSubscriber.name = payload.name;
                    await existingSubscriber.save();
                    return existingSubscriber;
                }
                throw new Error('Email already subscribed to newsletter');
            }

            const subscriber = new NewsletterModel({
                name: payload.name,
                email: payload.email.toLowerCase(),
                subscribedAt: new Date()
            });
            
            await subscriber.save();
            return subscriber;

        } catch (error) {
            throw new Error(`Service Error`, error.message);
        }
    },
    update: async (email) => {
        console.log(email);
        try {
            const subscriber = await NewsletterModel.findOneAndUpdate(
                { email: email.toLowerCase() },
                { isActive: false },
                { new: true }
            );
            
            if (!subscriber) {
                throw new Error('Subscriber not found');
            }
            
            return subscriber;
        } catch (error) {
            throw new Error(`Service Error`, error.message);
        }
    },
    delete: async (email) => {
        try {
            const subscriber = await NewsletterModel.findOneAndDelete(
                {email: email.toLowerCase()}
            );
            
            if (!subscriber) {
                throw new Error('Subscriber not found');
            }
            
            return subscriber;
        } catch (error) {
            throw new Error(`Service Error: ${error.message}`);
        }
    }
};
