"use client";
import { useEffect } from "react";
import { useFiles, loadDataFromStepchild } from "./context/FilesContext";

function arrayBufferToString(buffer: ArrayBuffer) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}

export default function Home() {
  const { state, dispatch } = useFiles();

  useEffect(() => {
    const fetchData = async () => {
      const files = await loadDataFromStepchild();
      dispatch({ type: "SET_FILES", payload: files });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {state.files.map((file) => (
        <div key={file.id} className="p-4">
          <p>Name: {file.name}</p>
          <p>Path: {file.path}</p>
          <p>File Size: {file.fileSize} bytes</p>
          <p>Data: {arrayBufferToString(file.data)}</p>
        </div>
      ))}
    </div>
  );
}
