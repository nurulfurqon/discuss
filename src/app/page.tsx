import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 space-y-5">
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {
        session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Sign Out</div>
      }

      <Profile />
    </div>
  );
}
