"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";

export type FilesPanelSettings = {
  defaultDownloadFormat: "none" | ".midi" | ".child";
  displayMode: "rows" | "grid";
};

const initialSettings: FilesPanelSettings = {
  defaultDownloadFormat: "none",
  displayMode: "rows",
};

type Action =
  | {
      type: "SET_DEFAULT_DOWNLOAD_FORMAT";
      payload: "none" | ".midi" | ".child";
    }
  | { type: "SET_DISPLAY_MODE"; payload: "rows" | "grid" };

const settingsReducer = (
  state: FilesPanelSettings,
  action: Action
): FilesPanelSettings => {
  switch (action.type) {
    case "SET_DEFAULT_DOWNLOAD_FORMAT":
      return { ...state, defaultDownloadFormat: action.payload };
    case "SET_DISPLAY_MODE":
      return { ...state, displayMode: action.payload };
    default:
      return state;
  }
};

const FilesPanelSettingsContext = createContext<{
  state: FilesPanelSettings;
  dispatch: Dispatch<Action>;
}>({
  state: initialSettings,
  dispatch: () => null,
});

export const FilesPanelSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(settingsReducer, initialSettings);
  return (
    <FilesPanelSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </FilesPanelSettingsContext.Provider>
  );
};

export const useFilesPanelSettings = () =>
  useContext(FilesPanelSettingsContext);
