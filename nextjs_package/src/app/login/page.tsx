import { checkUser } from "@/actions/actions";
export default async function LoggingIn() {
    return (
        <div className="flex flex-col items-center pt-23 text-center">
           <form action={checkUser} className="flex flex-col space-y-2">
            <input 
                type="text"
                name="userEmail"
                placeholder="Email"
                className="text-black"
            />
            <button
                type="submit"
                className="bg-white text-black rounded-sm"
            >
                Log in
            </button>
           </form>
        </div>
   );
}