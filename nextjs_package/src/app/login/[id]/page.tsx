import {prisma} from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import getMovieFact, { setMovie } from "@/actions/chat";
export default async function UserHome({params}:any){
    const user=await prisma.user.findUnique({
        where: {
            id: Number(await params.id),
        }
    });
    if(user==null || await params.id==-1 || user.LoggedIn==false){
        return(
            <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
                <h1 className="large-text">No account Found, Need to Log In</h1>
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
        setMovie(user.movie);
        const fact=await getMovieFact();
        return (
        <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
            <h1>Hello, {user?.name}</h1>
            <Image
                src= {String(user.profileIMG)}
                alt="profilepic"
                width={50}
                height={50}
            ></Image>
            <div>{fact}</div>
            <Link href="/" onClick={async ()=>{
                "use server";
                await prisma.user.update({
                    where:{
                        email: user.email
                    },
                    data: {
                        LoggedIn: false
                    }});
            }} className="underline">Click to Logout and Go Home</Link>
        </main>
    )}
    
}