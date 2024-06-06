async function loadPyodideAndMain() {
    let pyodide = await loadPyodide();
    await pyodide.loadPackage(["micropip"]);
    await pyodide.runPythonAsync(`
        import micropip
        await micropip.install('pygame')
    `);
    let code = await fetch('main.py');
    let python_code = await code.text();
    pyodide.runPython(python_code);
}

loadPyodideAndMain();
