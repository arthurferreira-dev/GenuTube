import { useNavigate } from "react-router-dom";
import { Frown } from "lucide-react";

export default function PageError() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col flex-wrap justify-center items-center gap-4">
      <h1 className="flex gap-3 justify-center items-center text-2xl font-[poppins]">
        Erro Desconhecido <Frown size={30} />
      </h1>
      <p className="font-mono">
        Porfavor volte para a página principal ou reinicie a página.
      </p>
      <button
        className="p-2 text-center font-[rubik] text-white rounded-md w-[145px] duration-300 bg-violet-600 hover:bg-violet-700 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
    </div>
  );
}
