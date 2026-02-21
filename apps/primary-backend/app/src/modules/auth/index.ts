import { Elysia, Cookie } from "elysia";
import { Authmodel } from "./model";
import { Authservice } from "./service";
import  jwt  from '@elysiajs/jwt'

export const app = new Elysia({ prefix: "/auth" })
  .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET!
        })
  )
  .post("/sign-up",async ({ body, status }) => {
      try {
        const userId = await Authservice.signUp(body.email, body.password);
        return {
          id: userId,
        }
      } catch (e) {
        console.log(e);
        return status(400, {
          message: "Invalid username or password",
        });
      }
    },
  
    {
      body: Authmodel.signupSchema,
      response: {
        200: Authmodel.signupResponseSchema,
        400: Authmodel.signupFailedSchema,
      },
    },
  )
  .post(
    "/signin",
    async ({ jwt,body, status,cookie: {auth} }) => {
      const {correctCredentials, userId} = await Authservice.signin(
        body.email,
        body.password
      );
       if (correctCredentials && userId) {
            const token = await jwt.sign({ userId })
            if (!auth) {
                auth = new Cookie("auth", {});
            }

            auth.set({
                value: token,
                httpOnly: true,
                maxAge: 7 * 86400,
            })

            return {
                message: "Login successful"
            }
        } else {
            return status(403, {
                message: "Incorrect credentials"
            })
        }
    },
    {
      body: Authmodel.signinSchema,
      response: {
        200: Authmodel.signinResponseSchema,
        403: Authmodel.signinFailedSchema,
      }
    }
  )
 
  .resolve(async ({ cookie: { auth }, status, jwt}) => {
           if (!auth) {
               return status(401)
           }
   
           const decoded = await jwt.verify(auth.value as string);
   
           if (!decoded || !decoded.userId) {
               return status(401)
           }
   
           return {
               userId: decoded.userId as string
           }
       })

   .get("/profile",async({userId,status})=>{
    const userdata= await Authservice.getUserDetails(Number(userId));
    if(!userdata){
        return status(400,{
          message: "Error fetching user details"
        })
    }

    return userdata;
    
    },{
        response: {
            200: Authmodel.getUserDetailsResponseSchema,
            400: Authmodel.getUserDetailsResponseErrorSchema

   }})
// auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1IiwiaWF0IjoxNzcxNTYwNDEwfQ.N9DdANIbS6bO9EhtUlNQFF98isOvO4Y3I9aFoggp41w; Max-Age=604800; Path=/; HttpOnly