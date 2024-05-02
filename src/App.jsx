import { useState } from "react";
import loginService from "./services/login";
import Products from "./components/Products";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      console.log(user);
    } catch (exception) {
      setError("Login failed: " + exception.message);
    }
  };

  if (user === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">
            Log in to application
          </h2>
          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block font-medium"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) =>
                  setUsername(target.value)
                }
                id="username"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block font-medium"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) =>
                  setPassword(target.value)
                }
                id="password"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              id="login-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Hello, {user["username"]}</h2>
      <Products />
    </div>
  );
}

export default App;
