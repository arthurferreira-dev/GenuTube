import { useState } from "react";
import { SquareArrowOutUpRight, Check } from "lucide-react";

interface TextToCopyBtn {
  TextCopied: string;
  type: string;
}

export const CopyBtn = ({ TextCopied, type }: TextToCopyBtn) => {
  const [copy, setCopy] = useState<boolean>(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(TextCopied);
      setCopy(true);

      setTimeout(() => setCopy(false), 1250);
    } catch (error) {
      console.error("Error to copy the link of the video: ", error);
    }
  };

  switch (type) {
    case "btn-icon":
      return (
        <button className="hover:cursor-pointer" onClick={handleCopyText}>
          {copy ? (
            <Check size={20} className="text-green-500" />
          ) : (
            <SquareArrowOutUpRight size={20} />
          )}
        </button>
      );
  }
};
