import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout";
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <Layout>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </Layout>
    )
  }
  return (
    <Layout>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </Layout>
  )
}