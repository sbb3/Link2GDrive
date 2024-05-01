import Link from "next/link";
import UserButton from "./user-button";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky flex justify-center">
      <div className="flex items-center justify-between w-full  h-16 max-w-full px-4 mx-auto sm:px-6">
        <Link href="/">
          {/* <Button variant="ghost" className="p-0"> */}
          <Image
            src="/assets/logo/logo.svg"
            alt="Home"
            className="min-w-8"
            width={190}
            height={0}
          />
          {/* </Button> */}
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
