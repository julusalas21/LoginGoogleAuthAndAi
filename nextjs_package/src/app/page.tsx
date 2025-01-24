import { checkUser, checkUserWithJson, makeUser } from "@/actions/actions";
import Link from "next/link";
import {auth} from "@/lib/auth";

export default async function HomePage() {
  //const router=useRouter();
  const session=await auth();
  const user=session?.user
  checkUserWithJson(user);
 return (
      <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
        <h1>Home Page</h1>
        <Link href="/login" className="underline">Sign in</Link>
          <button
          onClick={makeUser}
                type="submit"
                className="bg-white text-black rounded-sm"
            >Sign In With Google</button>
      </main>
    );
}