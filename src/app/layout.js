import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { auth } from "auth";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Clouds from "@/components/clouds/clouds";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Download Link to Google Drive",
  description: "An app that lets you download any content to your Google Drive",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={spaceGrotesk.className}>
        {/* <SessionProvider basePath={"/auth"} session={session}> */}
        <div
          className="relative flex flex-col  w-full h-full min-h-screen
          bg-secondary text-white
        "
        >
          <Clouds />

          <Header />
          <main
            className=" flex flex-auto 
            justify-center items-center
            "
          >
            {children}
          </main>
        </div>
        {/* </SessionProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
