import { useState, useEffect } from "react";
import loginService from "./services/login";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername("");
      setPassword("");
      console.log("login successfully");
    } catch (exception) {
      throw new Error("Login failed: " + exception.message);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {/* <Notification message={errorMessage} /> */}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) =>
                setUsername(target.value)
              }
              id="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) =>
                setPassword(target.value)
              }
              id="password"
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  }
}

export default App;
