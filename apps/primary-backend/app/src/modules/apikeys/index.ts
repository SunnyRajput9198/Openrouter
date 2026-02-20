import { Elysia ,Cookie } from "elysia";
import  jwt  from '@elysiajs/jwt'
import { Apikeymodel } from "./model";
import {ApiKeyService} from "./service";

export const app = new Elysia({ prefix: "/apikeys" })
     .use(
            jwt({
                name: 'jwt',
                secret: process.env.JWT_SECRET!
            })
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
    .post("/",async ({userId, body}) => {
        const {apiKey, id} = await ApiKeyService.createApiKey( Number(userId),body.name);
        return {
            id,
            apiKey
        }

    },{
            body: Apikeymodel.createApiKeySchema,
            response: {
                200: Apikeymodel.createApiKeyResponse
        }
    })

    .get("/",async ({userId}) => {
        const apiKeys = await ApiKeyService.getApiKey(Number(userId));
        return {
            apiKeys: apiKeys
         }
        },{
            response: {
                200: Apikeymodel.getApiKeyResponseSchema
        }
    })

    .put("/",async ({userId, body,status}) => {
        try{
            await ApiKeyService.updateApiKeydisabled(body.id, Number(userId),body.disabled);
            return {
                message: 'Updated API key successfully'
            }
        }catch(e){
            return status(411,{
                message: 'Updating API key unsuccessful'
            })

        }

    },{
        body: Apikeymodel.updateApiKeySchema,
        response: {
            200: Apikeymodel.updateApiKeyResponseSchema,
            411: Apikeymodel.updateApiKeyFailedResponseSchema
        }
    })
    .delete("/:id",async ({params:{id},userId,status})=>{
        try{
            await ApiKeyService.deleteApiKeySchema(Number(id), Number(userId));
            return {
                message: 'API key deleted successfully'
            }
 
        }catch(e){
            return status(411,{
                message: 'Deleting API key unsuccessful'
            })
        }
    
    },{
        response: {
            200: Apikeymodel.deleteApiKeySchema,
            411: Apikeymodel.deleteApiKeyResponseFailedSchema
    }})