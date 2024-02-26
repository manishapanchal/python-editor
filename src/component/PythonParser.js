/* global globalThis */
import React, { useState, useEffect } from "react";
import { useScript } from "usehooks-ts";

const PythonParser = ({ editorInstance: value }) => {
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

  const clearCode = () => {
    setOutput(null);
  };

  const handleRunCode = async () => {
    const code = `
import sys
from io import StringIO

# Redirect stdout
sys.stdout = mystdout = StringIO()

${value}

# Get the value of stdout
output = mystdout.getvalue()
      `;
    console.log("value", value);
    console.log("code", code);
    setShowErr(false);
    try {
      const containsPrint = value.includes("print");
      if (containsPrint) {
        pyodide?.runPython(code);
        console.log("executedCode", pyodide.globals.get("output").toString());
        setOutput(pyodide.globals.get("output").toString());
      }

      if (!pyodide.globals.get("output").toString()) {
        pyodide
          .runPythonAsync(value)
          .then((output) => setOutput(output))
          .catch((error) => setOutput(`Error: ${error.toString()}`));
      }
    } catch (error) {
      setShowErr(true);
      setOutput(`Error: ${error.toString()}`);
      console.log("Error", error);
      return error.toString();
    }
  };

  return (
    <div className="console">
      <div className="button-container">
        <button onClick={handleRunCode}>Run</button>
      </div>
      <div className="output">
        <div className="console-header">
          <p>console</p>
          <span onClick={clearCode}>clear</span>
        </div>
        <div
          className={showErr ? "console-container err" : "console-container"}
        >
          {output}
        </div>
      </div>
    </div>
  );
};

export default PythonParser;
