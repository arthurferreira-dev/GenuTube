import { useNavigate } from "react-router-dom";
import { btnCL } from "../utils/ClassCss";

interface BtnRatingProps {
    width: string;
}

export const BtnRating = ({ width }: BtnRatingProps) => {
  const navigate = useNavigate();
  return (
    <button
      className={`bg-red-500 ${btnCL} w-${width} hover:bg-red-600`}
      onClick={() => navigate("/avaliar")}
    >
      Avaliar
    </button>
  );
};