import { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState("");
  const [error, setError] = useState("");

  const validate = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!validate(url)) {
      setError("Invalid URL");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Error creating short URL");
        return;
      }

      setShort(data.shortUrl);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-20">
        <input
          className="border p-2 w-96"
          placeholder="Enter URL"
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="bg-black text-white mt-3 px-4 py-2"
          onClick={handleShorten}
        >
          Shorten
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {short && (
          <div className="mt-4 text-center">
            <p>{short}</p>
            <a href={short} target="_blank">
              <button className="bg-blue-500 text-white px-3 py-1 mt-2">
                Redirect
              </button>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
