"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

export type FilesPanelSettings = {
  defaultDownloadFormat: "none" | ".midi" | ".child";
  displayMode: "rows" | "grid";
};

const initialSettings: FilesPanelSettings = {
  defaultDownloadFormat: "none",
  displayMode: "rows",
};

const defaultSettings: FilesPanelSettings = {
  defaultDownloadFormat: "none",
  displayMode: "rows",
};

const SETTINGS_STORAGE_KEY = "filesPanelSettings";

const loadSettingsFromLocalStorage = (): FilesPanelSettings => {
  if (typeof window !== "undefined") {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return storedSettings ? JSON.parse(storedSettings) : initialSettings;
    } catch (error) {
      console.error("Failed to load settings from localStorage:", error);
      return initialSettings;
    }
  }
  return initialSettings;
};

const saveSettingsToLocalStorage = (settings: FilesPanelSettings) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
    }
  }
};

type Action =
  | {
      type: "SET_DEFAULT_DOWNLOAD_FORMAT";
      payload: "none" | ".midi" | ".child";
    }
  | { type: "SET_DISPLAY_MODE"; payload: "rows" | "grid" }
  | { type: "RESET_TO_DEFAULTS" };

const settingsReducer = (
  state: FilesPanelSettings,
  action: Action
): FilesPanelSettings => {
  switch (action.type) {
    case "SET_DEFAULT_DOWNLOAD_FORMAT":
      return { ...state, defaultDownloadFormat: action.payload };
    case "SET_DISPLAY_MODE":
      return { ...state, displayMode: action.payload };
    case "RESET_TO_DEFAULTS":
      return defaultSettings;
    default:
      return state;
  }
};

const FilesPanelSettingsContext = createContext<{
  state: FilesPanelSettings;
  dispatch: Dispatch<Action>;
  areSettingsDefault: boolean;
}>({
  state: initialSettings,
  dispatch: () => null,
  areSettingsDefault: true,
});

export const FilesPanelSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    settingsReducer,
    initialSettings,
    loadSettingsFromLocalStorage
  );

  const areSettingsDefault =
    state.defaultDownloadFormat === defaultSettings.defaultDownloadFormat &&
    state.displayMode === defaultSettings.displayMode;

  useEffect(() => {
    saveSettingsToLocalStorage(state);
  }, [state]);

  return (
    <FilesPanelSettingsContext.Provider
      value={{ state, dispatch, areSettingsDefault }}
    >
      {children}
    </FilesPanelSettingsContext.Provider>
  );
};

export const useFilesPanelSettings = () =>
  useContext(FilesPanelSettingsContext);
