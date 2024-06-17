import PixelButton from "../button/PixelButton";
import DitherGroup from "./DitherGroup";
import DownloadMenuButton from "./DownloadMenuButton";

type Props = {
  data: ArrayBuffer;
  id: number;
  shown: boolean;
};

export default function ActionCell({ data, shown, id }: Props) {
  return (
    <td
      className="group relative min-w-0 max-w-0 w-0 top-auto bottom-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {shown && (
        <div className="flex absolute min-w-max top-0 right-2 bottom-0 gap-2 items-center justify-end z-20">
          <DownloadMenuButton data={data} id={id} />
          <PixelButton mode="fill">Preview</PixelButton>
          <DitherGroup />
        </div>
      )}
    </td>
  );
}
