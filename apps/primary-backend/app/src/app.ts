import { Elysia } from "elysia";
import { app as authApp } from "./modules/auth";
import { app as apiKeyApp } from "./modules/apikeys";
import { app as modelsApp } from "./modules/models";
import { app as paymentApp } from "./modules/payments";
export const app = new Elysia()
    .use(authApp)
    .use(apiKeyApp)
    .use(modelsApp)
    .use(paymentApp)
    .listen(3000);

export type App = typeof app;