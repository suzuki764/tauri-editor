import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="main">
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="info-text">{text.length}文字</div>
    </div>
  );
}

export default App;
