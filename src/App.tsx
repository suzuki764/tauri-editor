import { useState } from "react";
import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [contents, setContents] = useState("");
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);

  const previewHandler = () => {
    setPreview((prev) => !prev);
  };

  const saveHandler = async () => {
    if (filename === "") {
      setMessage("ファイル名を入力してください");
      return;
    }
    const saveName = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    await writeTextFile(saveName, contents, { dir: BaseDirectory.Desktop });
    setMessage("保存しました");
  };

  return (
    <div className="main">
      {preview ? (
        <ReactMarkdown className="editor-area" children={contents} />
      ) : (
        <textarea
          className="editor-area"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
      )}
      <div className="footer">
        <div>{countChars(contents)}文字</div>
        <input
          value={filename}
          placeholder="ファイル名"
          onChange={(e) => setFilename(e.target.value)}
          className="filename-input"
        />
        <button
          className={preview ? "button-on" : ""}
          onClick={() => previewHandler()}
        >
          Preview
        </button>
        <button onClick={() => saveHandler()}>Save</button>
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

const countChars = (text: string) => text.replace(/\r?\n/g, "").length;

export default App;
