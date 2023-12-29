import type { GetServerSideProps, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req);

  return {
    props: {
      session,
    },
  };
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  session,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
