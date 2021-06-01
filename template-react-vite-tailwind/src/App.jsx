import React, { useState } from "react";
import classes from "./styles/app.module.css";

function App() {
  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ready to Code!</h1>
          <h2 className={classes.subtitle}>
            React + Tailwind with Vite crafted by{" "}
            <strong className="text-green-600">Webeetle</strong>
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
