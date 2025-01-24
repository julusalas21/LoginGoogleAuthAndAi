import {prisma} from "@/lib/db";
import Link from "next/link";

export default async function UserHome({params}:any){
    const user=await prisma.user.findUnique({
        where: {
            id: Number(await params.id),
        }
    });
    if(user==null || await params.id==-1){
        return(
            <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
                <h1 className="large-text">No account Found</h1>
                <Link href="/" className="underline">Back to Home</Link>
        </main>
        )
    }
    else{
        return (
        <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
            <h1>Hello, {user?.name}</h1>
            <Link href="/" className="underline">Click to Logout and Go Home</Link>
        </main>
    )}
    
}