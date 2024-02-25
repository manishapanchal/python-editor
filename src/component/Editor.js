import React, { useEffect, useCallback } from "react";
import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import editorjsCodeflask from "@calumk/editorjs-codeflask";

const Editor = ({ editorInstance }) => {
  const initializeEditor = useCallback(() => {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        code: editorjsCodeflask,
      },
    });
  }, [editorInstance]);

  useEffect(() => {
    initializeEditor();

    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
      }
    };
  }, [initializeEditor]);

  // async function runPythonCode() {
  // pyodide.current = await globalThis.loadPyodide({ indexURL });
  // if (editorInstance?.current) {
  //   const savedData = await editorInstance.current.save();
  //   console.log("Saved Data:", savedData);
  // }
  // const res = await pyodide.loadPackage(["numpy"]);
  // console.log("res = ", res);
  // }

  return (
    <div className='editoContainer'>
      <h1>Pyhton Editor</h1>
      <div id='editorjs'></div>
    </div>
  );
};

export default Editor;
