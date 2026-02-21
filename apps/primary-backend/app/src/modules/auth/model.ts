import {t} from "elysia";

export namespace Authmodel{
     export const signinSchema = t.Object({
        email: t.String(),
        password: t.String(),
    })
    export type signinSchema=typeof signinSchema.static

    export const signinResponseSchema = t.Object({
        message: t.Literal('Login successful'),
    })

    export type signinResponseSchema=typeof signinResponseSchema.static

    export const signupSchema = t.Object({ 
        email: t.String(),
        password: t.String()
    })
    export type signupSchema=typeof signupSchema.static
    
    export const signupFailedSchema = t.Object({
        message: t.Literal('Invalid username or password')
    })
    export type signupFailedSchema=typeof signupFailedSchema.static
    export const signinFailedSchema = t.Object({
        message: t.Literal('Invalid username or password')
    })
    export type signinFailedSchema=typeof signinFailedSchema.static

    export const signupResponseSchema = t.Object({
        id: t.String()
    })
    export type signupResponseSchema=typeof signupResponseSchema.static

    export const signInInvalid = t.Literal('Invalid username or password')
    export const signUpInvalid = t.Literal('User already exists')
    
	export type signInInvalid = typeof signInInvalid.static
    export type signUpInvalid = typeof signUpInvalid.static

     export const getUserDetailsResponseSchema = t.Object({
        credits: t.Number()
    })
    export type getUserDetailsResponseSchema=typeof getUserDetailsResponseSchema.static
     export const getUserDetailsResponseErrorSchema = t.Object({
        message: t.Literal('Error fetching user details')
    })
    export type getUserDetailsResponseErrorSchema=typeof getUserDetailsResponseErrorSchema.static
}