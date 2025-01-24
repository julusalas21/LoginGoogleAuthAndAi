'use server';
import { prisma } from "@/lib/db";
import { error } from "console";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import {signIn} from "@/lib/auth";

export async function makeUser() {
    await signIn('google')
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
            console.log(user.id);
            await prisma.user.update({
                where:{
                    email: user.email
                },
                data: {
                    LoggedIn: true
                }});
            redirect(`/login/${user.id}`);
        }
        else{
            throw error;
        }
    } catch(error){
        if(isRedirectError(error)) throw error;
        else{
            console.log(error);
            redirect('/login/-1');
        }
    }
}

export async function redir(id: Number){
    try{
        redirect(`/login/${id}`);
    } catch(error){
        if(isRedirectError(error)) throw error;
        else{
            console.log(error);
        }
    }
}

export async function checkUserWithJson(session:any){
    let id=Number(-1);
    try{
        const user=await prisma.user.findUnique({
            where: {
                email: session?.email as string,
            }
        })
        if(user!==null){
            console.log(user.name);
            console.log(user.id);
            id=Number(user.id);
        }
        else if(session.email!==null){
            //new users
            const tempUser= await prisma.user.create({
            data: {
                name: session?.name as string,
                email: session?.email as string,
                profileIMG: session?.image as string
            }
            });
            console.log(tempUser.name);
            console.log(tempUser.id);
            id=Number(tempUser.id);
        }
    }
    catch(Exception){
            console.error("warning");
            console.log(id);
    }
    redir(id);

}