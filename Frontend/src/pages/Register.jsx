import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg);
        return;
      }

      navigate("/login");
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border p-6 w-80 rounded shadow">
        <h2 className="text-center mb-4 text-lg">Register</h2>

        <input
          placeholder="Username"
          className="border p-2 w-full mb-2"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="bg-black text-white w-full py-2"
        >
          Register
        </button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {msg && <p className="text-red-500 mt-2 text-center">{msg}</p>}
      </div>
    </div>
  );
};

export default Register;
