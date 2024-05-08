import { useEffect, useState } from "react";
import loginService from "./services/login";
import Products from "./components/Products";
import "./App.css";
import apiAxios from "./services/apiAxios";

function App() {
  // Trạng thái cho form đăng nhập
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Trạng thái cho form đăng ký
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] =
    useState("");
  const [registerPassword, setRegisterPassword] =
    useState("");
  const [domain, setDomain] = useState("");

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [token, setToken] = useState(null); // Sử dụng useState để lưu trữ token

  // useEffect(() => {
  //   const getAccessToken = JSON.parse(
  //     window.localStorage.getItem("loggedBloglistUser")
  //   );
  //   console.log(getAccessToken.accessToken);
  //   const updatedUser = {
  //     ...user,
  //     accessToken: newAccessToken,
  //   };
  //   window.localStorage.setItem(
  //     "loggedBloglistUser",
  //     JSON.stringify(updatedUser)
  //   );
  // }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem(
      "loggedBloglistUser"
    );
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      setToken(user.accessToken); // Cập nhật token khi user đã đăng nhập
      apiAxios.setToken(user.accessToken); // Cập nhật token trong axios
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: loginUsername,
        password: loginPassword,
      });
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(user)
      );
      setUser(user);
      setLoginUsername("");
      setLoginPassword("");
      setToken(user.accessToken); // Cập nhật token khi đăng nhập thành công
      apiAxios.setToken(user.accessToken); // Cập nhật token trong axios
    } catch (exception) {
      setError("Login failed: " + exception.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        domain: domain,
      };
      const response = await apiAxios.registerUser(
        userData
      );
      handleClosePopUp();
    } catch (error) {
      setError("Registration failed: " + error.message);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
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
                htmlFor="login-username"
                className="block font-medium"
              >
                Username
              </label>
              <input
                type="text"
                value={loginUsername}
                name="Username"
                onChange={({ target }) =>
                  setLoginUsername(target.value)
                }
                id="login-username"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="login-password"
                className="block font-medium"
              >
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                name="Password"
                onChange={({ target }) =>
                  setLoginPassword(target.value)
                }
                id="login-password"
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              id="login-button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Login
            </button>
          </form>
          <div className="mt-3 flex flex-col items-center">
            <h3>New user ?</h3>
            <button
              onClick={handleRegisterClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-2"
            >
              Register
            </button>
          </div>
        </div>
        {showPopUp && (
          <div className="popup">
            <div className="popup-content">
              <span
                className="close"
                onClick={handleClosePopUp}
              >
                &times;
              </span>
              <h2>Sign up</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    htmlFor="register-email"
                    className="block font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) =>
                      setRegisterEmail(e.target.value)
                    }
                    id="register-email"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="register-domain"
                    className="block font-medium"
                  >
                    Domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) =>
                      setDomain(e.target.value)
                    }
                    id="register-domain"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="register-username"
                    className="block font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={registerUsername}
                    onChange={(e) =>
                      setRegisterUsername(e.target.value)
                    }
                    id="register-username"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="register-password"
                    className="block font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) =>
                      setRegisterPassword(e.target.value)
                    }
                    id="register-password"
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Hello, {user["username"]}</h2>
      <Products token={token} />
    </div>
  );
}

export default App;
