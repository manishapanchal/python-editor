"use-strict";

import "./App.css";
import { useRef } from "react";
import Editor from "./component/Editor";
import PythonParser from "./component/PythonParser";

function App() {
  const editorInstance = useRef(null);

  const obj = {
    a: 10,
    x: () => {
      console.log("this = ", this);
    },
  };

  obj.x();

  return (
    <div className='App'>
      <Editor editorInstance={editorInstance} />
      <PythonParser />
    </div>
  );
}

export default App;
