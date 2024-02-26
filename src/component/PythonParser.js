/* global globalThis */
import React, { useState, useEffect } from "react";
import { useScript } from "usehooks-ts";

const PythonParser = ({ editorInstance }) => {
  const [output, setOutput] = useState(null);
  const [pyodide, setPyodide] = useState(null);
  const [showErr, setShowErr] = useState(false);
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

  function compileCodeWithPrint(code) {
    let output = pyodide.runPython(`
import sys
from io import StringIO
              
# Redirect stdout
sys.stdout = mystdout = StringIO()
              
${code}
              
# Get the value of stdout
output = mystdout.getvalue()
                      `);
    output = pyodide.globals.get("output").toString();
    return output ? output.split("\n") : [];
  }

  async function excuteCode() {
    try {
      if (editorInstance?.current) {
        const savedData = await editorInstance.current.save();
        if (pyodideLoaded) {
          // console.log("Saved Data:", savedData);
          const result = savedData?.blocks?.map((item) => {
            try {
              const containsPrint = item?.data?.code.includes("print");
              pyodide.globals.set("output", "");
              let executedCode = "";
              if (containsPrint) {
                executedCode = compileCodeWithPrint(item?.data?.code);
              } else {
                executedCode = pyodide?.runPython(item?.data?.code);
              }
              setShowErr(false);
              return executedCode;
            } catch (pythonError) {
              console.log("error = ", pythonError, typeof err);
              setShowErr(true);
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
      <div className={showErr ? "output err" : "output"}>{output}</div>
    </div>
  );
};

export default PythonParser;
