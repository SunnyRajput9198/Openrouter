
import { status } from 'elysia';
import type { Authmodel } from './model';
import { jwt } from '@elysiajs/jwt'
import {prisma} from "db";

export abstract class Authservice {
	static async signUp( email:string, password:string ) : Promise<string> {
              const user = await prisma.user.create({
                    data: {
                        email: email,
                        password:await Bun.password.hash(password),
                    },
                });
        return user.id.toString();
		
	}

static async signin(email: string, password: string): Promise<{correctCredentials: boolean, userId?: string}> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            return { correctCredentials: false };
        }

        if (!await Bun.password.verify(password, user.password)) {
            return { correctCredentials: false };
        }

        return { correctCredentials: true, userId: user.id.toString() };
    } 

static async getUserDetails(userId: number) : Promise<{credits: number} | null> {
    return prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            credits: true
        }
    })
}

}