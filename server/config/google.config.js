import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../database/user';

export default (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }, async (accessToken, refreshToken, profile, done) =>{
            //creating a new user
            const newUser = {
                email: profile.emails[0].value,
                fullname: profile.displayName,
                profilePic: profile.photos[0].value
            };
            try{
                //check if the user exists
                const user = await User.findOne({email: newUser.email});
                if(user){
                    //generate token
                    const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                }else{
                    //create new user
                    const user = await User.create(newUser);
                    //generate token
                    const token = user.generateJwtToken();
                    //return user
                    done(null, {user, token});
                }
            }catch(error){
                done(error, null);
            }
        })
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));
}