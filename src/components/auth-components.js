import { signIn, signOut } from "auth";
import { Button } from "./ui/button";

export function SignIn({ provider, ...props }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button
        className="w-full  bg-primary
        text-secondary
        hover:bg-primary-dark
        hover:text-secondary-foreground
        font-bold
        text-md  

        "
        {...props}
      >
        Sign In
      </Button>
    </form>
  );
}

export function SignOut(props) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button
        // variant="ghost"
        className="w-full 
        bg-secondary
        text-white
      "
        {...props}
      >
        Sign Out
      </Button>
    </form>
  );
}
