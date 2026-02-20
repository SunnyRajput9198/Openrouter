import {prisma} from "db";

export abstract class ApiKeyService {
    
    static createRandomApiKey(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let apiKey = '';
        for (let i = 0; i < 64; i++) {
            apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return apiKey;
    }
    static async createApiKey(userId:number, name: string): Promise<{ id: string, apiKey: string }> {
        const apiKey=ApiKeyService.createRandomApiKey();
        const apiKeyDb = await prisma.apiKey.create({
            data: {
                name,
                apiKey,
                userId,
            }
            })
            return {
                id: apiKeyDb.id.toString(),
                apiKey
            }
    }
    
    static async getApiKey(userId: number): Promise<{id: string,apiKey: string, name: string, creditsConsumed: number, lastUsed: Date | null}[]> {
        const apiKeys = await prisma.apiKey.findMany({
            where: {
                userId:userId,
                deleted: false
            }
        })

        return apiKeys.map(apiKey => ({
                    id: apiKey.id.toString(),
                    apiKey: apiKey.apiKey,
                    name: apiKey.name,
                    creditsConsumed: apiKey.creditsConsumed,
                    lastUsed: apiKey.lastUsed,
                    disabled: apiKey.disabled
                }))
        
    }

    static async updateApiKeydisabled(apikeyId: string, userId: number, disabled: boolean) {
        const response= await prisma.apiKey.update({
            where: {
                id: parseInt(apikeyId),
                userId 
            },
            data:{
                disabled: true
            }
        })

    }

     static async deleteApiKeySchema(id:number, userId: number) {
            await prisma.apiKey.update({
                where: {
                    id,
                    userId
                },
                data:{
                    deleted: true
                }
            })
        
     
    }
    
}