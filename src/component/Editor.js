import React, { useEffect, useCallback } from "react";
import EditorJS from "@editorjs/editorjs";
import PythonParser from "./PythonParser";
import editorjsCodeflask from "@calumk/editorjs-codeflask";

const Editor = ({ editorInstance }) => {
  const initializeEditor = useCallback(() => {
    editorInstance.current = new EditorJS({
      holder: "editorjs",
      tools: {
        paragraph: editorjsCodeflask,
        // code: editorjsCodeflask,
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

  return (
    <div className="main">
      <div className="heading">
        <h1>Pyhton Editor</h1>
      </div>
      <div className="cols">
        <div id="editorjs"></div>
        <PythonParser editorInstance={editorInstance} />
      </div>
    </div>
  );
};

export default Editor;
