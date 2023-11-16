'use server'

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"

const handler= async ( data : InputType) : Promise<ReturnType> => {
    const { userId } = auth();

    if(!userId) {
        return {
            error : 'Unauthorized'
        }
    }

    const { title } = data;

    let board ;

    try {
        
    } catch (error) {
        
    }
}