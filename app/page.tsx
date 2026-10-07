import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import HomeClient from "./home-client";
export default async function Home() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <HomeClient name={session.user?.name || "Euphoria customer"} />;
}
