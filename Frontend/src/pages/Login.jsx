import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-6 w-80 rounded shadow">
        <h2 className="text-center mb-4 text-lg">Login</h2>

        <input
          placeholder="Email or Username"
          className="border p-2 w-full mb-2"
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2"
        >
          Login
        </button>

        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

        {msg && <p className="text-red-500 mt-2 text-center">{msg}</p>}
      </div>
    </div>
  );
};

export default Login;
