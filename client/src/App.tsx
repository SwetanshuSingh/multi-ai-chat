import { useEffect } from "react";
import { authClient } from "./lib/auth-client";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate()
  const { useSession } = authClient;
  const { data: session, isPending, error, refetch } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!isPending && session === null) return;

    if (!isPending && session) navigate("/chat")
  }, [isPending]);

  console.log(session, isPending);

  return (
    <main className="w-full h-screen bg-black text-white flex justify-center items-center">
      {isPending ? <p>loading...</p> : <h2>This is home page</h2>}
    </main>
  );
}

export default App;
