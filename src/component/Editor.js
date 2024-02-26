import React from "react";
import PythonParser from "./PythonParser";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const Editor = ({ editorInstance }) => {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    // console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <div className="main">
      <div className="heading">
        <h1>Pyhton Editor</h1>
      </div>
      <div className="cols">
        <CodeMirror value={value} extensions={[python()]} onChange={onChange} />
        <PythonParser editorInstance={value} />
      </div>
    </div>
  );
};

export default Editor;
