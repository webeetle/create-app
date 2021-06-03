import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "store";

const Http404 = () => {
  const { layout } = useStore();
  useEffect(() => {
    layout.setCurrentPage("");
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold text-center text-indigo-500">
        Ops... Page not Found
      </h1>
      <p className="mt-5 text-gray-400">
        Are you lost? Go to the{" "}
        <Link to={"/"}>
          <span className="text-green-500">Home</span>
        </Link>
      </p>
    </div>
  );
};

export default Http404;
