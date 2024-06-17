import { loadTestData } from "@/stepchild_interface/test_data_functions";
import PixelButton from "../components/button/PixelButton";
import { useFiles } from "../context/FilesContext";
import { loadDataFromStepChild } from "@/stepchild_interface/data_functions";

export default function EmptyStatePanel() {
  const { dispatch } = useFiles();
  const fetchTestData = async () => {
    const files = await loadTestData();
    dispatch({ type: "SET_FILES", payload: files });
  };

  const fetchActualData = async () => {
    const files = await loadDataFromStepChild();
    dispatch({ type: "SET_FILES", payload: files });
  };

  return (
    <div className="flex flex-col gap-2">
      <PixelButton onClick={fetchActualData} mode="fill">
        Load Actual Data
      </PixelButton>
      <PixelButton onClick={fetchTestData} mode="outline">
        Load Test Data
      </PixelButton>
    </div>
  );
}
