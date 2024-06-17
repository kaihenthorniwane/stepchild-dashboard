"use client";
import { useFiles } from "./context/FilesContext";
import FilesPanel from "./panels/FilesPanel";
import EmptyStatePanel from "./panels/EmptyStatePanel";
import P5Component from "../stepchild_interface/StepchildSerialInterface/p5Component.js";

export default function Home() {
  const { state } = useFiles();

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex flex-col min-h-0">
      <div className="flex flex-col md:grid md:grid-cols-[2fr,1fr] h-full w-full">
        <FilesPanel files={state.files} />
        <div className="p-5 min-h-0 min-w-0">
          <EmptyStatePanel />
        </div>
        <P5Component/>
      </div>
    </div>
  );
}
