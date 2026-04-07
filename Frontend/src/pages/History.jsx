import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const History = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch("http://localhost:3000/url/history", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setUrls(data);
    };

    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-5">
        {urls.map((u) => (
          <div key={u._id} className="border p-3 mb-2 flex flex-col items-start gap-1">
            <p className="font-semibold text-gray-800">{u.originalUrl}</p>
            <a href={`http://localhost:3000/url/${u.shortId}`} target="_blank" className="text-blue-500 hover:underline">
              http://localhost:3000/url/{u.shortId}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
