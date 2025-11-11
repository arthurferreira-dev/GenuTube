import { useEffect, useState } from "react";
import { GetAverageRatingDB } from "../firebase/getAverageRatingDB";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BtnRating } from "../components/Buttons";
import { btnCL } from "../utils/ClassCss";  

export const MediaNotePage = () => {
  const [rating, setRating] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      const userRating = await GetAverageRatingDB();
      setRating(Number(userRating));
    };
    fetchRating();
  }, []);

  return (
    <main className="w-screen h-screen bg-slate-600 text-white flex flex-col flex-wrap justify-center items-center">
      <div className="flex flex-col flex-wrap gap-5">
        <h1 className="font-[poppins] text-xl">Nota Geral do Genutube:</h1>
        <div className="flex gap-2 justify-center items-center bg-slate-700/70 p-3 rounded-lg">
          <p className="font-[rubik] text-lg">{rating}</p>
          <Star className="text-yellow-300" />
        </div>
        <div className="flex flex-col flex-wrap gap-4 justify-center items-center">
          <BtnRating width="[250px]" />
          <button
            className={`w-[250px] bg-violet-600 hover:bg-violet-700 ${btnCL}`}
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
};
