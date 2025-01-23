'use server';
import { prisma } from "@/lib/db";
import { error } from "console";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function makeUser( formData: FormData ) {
    await prisma.user.create({
        data: {
            name: formData.get("name") as string,
            email: formData.get("email") as string
            //PUT GOOGLE PFP LINK HERE 
        }
    });
}

export async function checkUser(formData: FormData){
    try{
        const user=await prisma.user.findUnique({
            where: {
                email: formData.get('userEmail') as string,
            }
        })
        if(user!==null){
            console.log(user.name);
            console.log(user.id)
            redirect(`/login/${user.id}`);
        }
        else{
            throw error;
        }
    } catch(error){
        if(isRedirectError(error)) throw error;
        else{
            console.log(error);
            redirect('/login');
        }
    }
}