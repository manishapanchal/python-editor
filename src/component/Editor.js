import React, { useEffect, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import PythonParser from "./PythonParser";
import editorjsCodeflask from "@calumk/editorjs-codeflask";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const Editor = ({ editorInstance }) => {
  // const initializeEditor = useCallback(() => {
  //   editorInstance.current = new EditorJS({
  //     holder: "editorjs",
  //     tools: {
  //       paragraph: editorjsCodeflask,
  //       // code: editorjsCodeflask,
  //     },
  //   });
  // }, [editorInstance]);

  // useEffect(() => {
  //   initializeEditor();

  //   return () => {
  //     if (
  //       editorInstance.current &&
  //       typeof editorInstance.current.destroy === "function"
  //     ) {
  //       editorInstance.current.destroy();
  //     }
  //   };
  // }, [initializeEditor]);

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
        {/* <div id="editorjs"></div> */}
        <CodeMirror value={value} extensions={[python()]} onChange={onChange} />
        <PythonParser editorInstance={value} />
      </div>
    </div>
  );
};

export default Editor;
