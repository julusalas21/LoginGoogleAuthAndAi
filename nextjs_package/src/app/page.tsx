import Link from "next/link";
export default async function HomePage() {
 return (
      <main className="flex flex-col items-center gapy-y-5 pt-18 text-center">
        <h1>Home Page</h1>
        <Link href="/login" className="underline">Log in</Link>
        <Link href="/login" className="underline">sign in placeholder</Link>
      </main>
    );
}