import JwtPassport from "passport-jwt";

//Database model

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "ZomatoApp" 
};

export default (passport) => {
    passport.use(
        new JWTStrategy(jwtOptions, async(jwt__payload, done) => {
            try{
                // Find user in the database
                const user = await UserModel.findById(jwt__payload.user);
                if(!user) return done(null, false);
                return done(null, user);
            }catch(error){
                throw new Error(error);
            }
        })
    );
};