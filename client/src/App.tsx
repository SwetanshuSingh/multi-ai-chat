import { authClient } from "./lib/auth-client";

const App = () => {
  async function authenticate() {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173",
    });
  }

  return (
    <main className="w-full h-screen flex justify-center items-center bg-black">
      <button className="text-white border border-gray-200 rounded p-2">
        <p>Sign in With Google</p>
      </button>
    </main>
  );
};

export default App;
