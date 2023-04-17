import { useState, useEffect } from "react";

const Switch = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = mode === "dark";

    root.classList.remove(isDarkMode ? "light" : "dark");
    root.classList.add(mode);

    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("mode") as "light" | "dark";
    savedMode && setMode(savedMode);
  }, []);

  return (
    <button onClick={toggleMode}>
      {mode === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default Switch;
