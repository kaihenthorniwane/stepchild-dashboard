"use client";
import { useEffect } from "react";
import { useFiles } from "./context/FilesContext";
import { loadTestData } from "@/stepchild_interface/test_data_functions";
import FilesPanel from "./panels/FilesPanel";

export default function Home() {
  const { state, dispatch } = useFiles();

  useEffect(() => {
    const fetchData = async () => {
      const files = await loadTestData();
      dispatch({ type: "SET_FILES", payload: files });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex flex-col min-h-0">
      <div className="grid grid-cols-[2fr,1fr] h-full w-full">
        <FilesPanel files={state.files} />
        <div className="p-5 min-h-0 min-w-0">
          <div className="border-2 border-textTertiary"></div>
        </div>
      </div>
    </div>
  );
}
