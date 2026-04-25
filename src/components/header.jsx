import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Header() {
  // NOTE state to toggle between light and dark mode
  const [getMode, setMode] = useState(() => {
    var mode = localStorage.getItem("mode") ?? "dark";
    document.body.className = mode;
    return mode;
  });

  //NOTE useEffect to set the mode in localStorage
  useEffect(() => {
    localStorage.setItem("mode", getMode);
    document.body.className = getMode;
  }, [getMode]);

  return (
    <header>
      <section>
        <h1>Where in the world?</h1>
        <div
          onClick={() =>
            setMode((prev) => (prev == "light" ? "dark" : "light"))
          }
        >
          <FontAwesomeIcon
            icon={getMode === "light" ? faSun : faMoon}
            size="xs"
          />
          <p>{getMode === "light" ? "Light" : "Dark"} Mode</p>
        </div>
      </section>
    </header>
  );
}
