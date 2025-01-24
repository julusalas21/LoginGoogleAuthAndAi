import { checkUser } from "@/actions/actions";
import {prisma} from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    else if(user.movie==null){
        return(
            <div className="flex flex-col items-center pt-23 text-center">
                <form action={async (e)=>{
                    "use server";
                    await prisma.user.update({
                    where:{
                        email: user.email
                    },
                    data: {
                        movie: e.get('movieName') as string
                    }
                })
                redirect(`/login/${user.id}`);
            }
                
                } className="flex flex-col space-y-2">
                    <input 
                        type="text"
                        name="movieName"
                        placeholder="Favorite Movie?"
                        className="text-black"
                    />
                    <button
                        type="submit"
                        className="bg-white text-black rounded-sm"
                    >
                    Ready!
                    </button>
                   </form>
            </div>
        );
    }
    else{
        return (
        <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
            <h1>Hello, {user?.name}</h1>
            <div>Your favorite movie is {user?.movie}</div>
            <Link href="/" className="underline">Click to Logout and Go Home</Link>
        </main>
    )}
    
}