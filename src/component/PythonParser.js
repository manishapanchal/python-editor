/* global globalThis */
import React, { useState, useEffect } from "react";
import { useScript } from "usehooks-ts";

const PythonParser = ({ editorInstance }) => {
  const [output, setOutput] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const pyodideStatus = useScript(
    "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js",
    {
      removeOnUnmount: false,
    }
  );

  const loadPyodide = async () => {
    const indexURL = "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/";
    const res = await globalThis.loadPyodide({ indexURL });
    setPyodide(res);
    setPyodideLoaded(true);
    // console.log("res = ", res);
  };

  useEffect(() => {
    console.log("pyodideStatus = ", pyodideStatus);
    if (pyodideStatus === "ready") {
      loadPyodide();
    }
  }, [pyodideStatus]);

  async function excuteCode() {
    try {
      if (editorInstance?.current) {
        // setLoading(true);
        const savedData = await editorInstance.current.save();
        if (pyodideLoaded) {
          console.log("Saved Data:", savedData);
          const result = savedData.blocks.map((item) => {
            try {
              const codeString = pyodide?.runPython(item?.data?.code);
              return codeString;
            } catch (pythonError) {
              console.log("error = ", pythonError, typeof err);
              return pythonError.toString();
            }
          });
          setOutput(result);
        } else {
          alert("Please try again later");
        }
      }
    } catch (error) {
      console.log("error = ", error);
      alert("Please try again later");
    }
  }

  return (
    <div>
      <button onClick={excuteCode}>Run</button>
      <div>{output}</div>
    </div>
  );
};

export default PythonParser;
