import { Elysia } from "elysia";
import { app as authApp } from "./modules/auth";
import { app as apiKeyApp } from "./modules/apikeys";
const app = new Elysia()
    .use(authApp)
    .use(apiKeyApp)
    .listen(3000);


/*
auth-> signup,signin
api key-> create api key, get api keys, delete api key ,disable api key
model -> get all supported models, their pricing ,provider etc
payment ->razorpay,stripe
*/
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
