import {Messages} from "../types";

export type LlmResponse = {
    completions: {
        choices: {
            message: {
                content: string
            }   
        }[]
    },
    inputTokensConsumed: number,
    outputTokensConsumed: number

}
// 
// console.log(completion.choices[0].message.content); si output fomrat ka response mene openrouter ke routr ke quick start se liy ahia
export class Basellm{
static async chat(model: string, messages: Messages): Promise<LlmResponse> {
        throw new Error("Not implemented chat function");
        
    }
}