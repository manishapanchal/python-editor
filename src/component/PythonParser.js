/* global globalThis */
import React, { useState, useEffect } from "react";
import { useScript } from "usehooks-ts";

const PythonParser = () => {
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
    console.log("res = ", res);
  };

  useEffect(() => {
    console.log("pyodideStatus = ", pyodideStatus);
    if (pyodideStatus === "ready") {
      loadPyodide();
    }
  }, [pyodideStatus]);

  async function callThis() {
    const myPython = `
                def func():
                    return 5 + 7
                func() `;
    if (pyodideLoaded) {
      console.log(pyodide);
      let element = document.getElementById("replace");
      element.innerHTML = pyodide.runPython(myPython);
    } else {
      console.log("Pyodide not loaded yet");
    }
  }

  return (
    <div>
      <h1>loading</h1>
      <div id='replace'>Replace this</div>
      <button onClick={callThis}>Execute Python</button>
    </div>
  );
};

export default PythonParser;
