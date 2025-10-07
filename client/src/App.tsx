import { authClient } from "./lib/auth-client";

const App = () => {
  async function authenticate() {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173",
    });
  }

  return (
    <main
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <button onClick={authenticate} style={{ height: "40px" }}>
        Sign In With Google
      </button>
    </main>
  );
};

export default App;
