"use-strict";

import "./App.css";
import { useRef } from "react";
import Editor from "./component/Editor";

function App() {
  const editorInstance = useRef(null);

  return (
    <div className='App'>
      <Editor editorInstance={editorInstance} />
    </div>
  );
}

export default App;
