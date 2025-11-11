import { useEffect, useState } from "react";
import GenuTubeIcon from "../assets/GenuTube-icon.png";
import { Search } from "lucide-react";
import { type JSX } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { btnCL } from "../utils/ClassCss";
import { BtnRating } from "./Buttons";
import { Menu, X } from "lucide-react";

export function HeaderHome() {
  const [wdtImg, setWdtImg] = useState<number>(70);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { user } = useUserStore();
  const [iconMenu, setIconMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const [menu, setMenu] = useState<boolean>(window.innerWidth > 600 ? true : false);

  useEffect(() => {
    const ResponsiveImg = () => {
      setWdtImg(window.innerWidth < 676 ? 55 : 70);
    };
    window.addEventListener("resize", ResponsiveImg);

    return () => {
      window.removeEventListener("resize", ResponsiveImg);
      setMenu(window.innerWidth > 600);
    };
  }, []);

  const InputSearch: () => JSX.Element = () => {
    return (
      <div className="flex justify-center items-center gap-2 bg-white font-mono w-[250px] max-[676px]:w-[165px] rounded-full">
        <label
          htmlFor="search-input"
          className="rounded-full p-2 duration-300 hover:bg-slate-200 hover:cursor-pointer"
        >
          <Search size={22} />
        </label>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 focus:outline-none focus:ring-0 border-l-black border-l-2"
        />
      </div>
    );
  };

  const BtnOrUser = () => {
    if (!user) {
      return (
        <button
          className={`bg-sky-500 ${btnCL} w-[125px] hover:bg-sky-600`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      );
    } else {
      return (
        <img
          className="w-15 rounded-full hover:cursor-pointer"
          src={user.photo}
          alt={`${user.email} [Avatar]`}
          onClick={() => navigate("/login")}
        />
      );
    }
  };

  return (
    <header className="flex flex-col flex-wrap">
      <div className="p-3 flex justify-between items-center bg-slate-500">
        <a href="/">
          <img
            src={GenuTubeIcon}
            alt="Genutube-Icon"
            className="rounded-md"
            width={wdtImg}
          />
        </a>
        <InputSearch />
        <div className="flex flex-col flex-wrap justify-center items-center gap-3">
          {/* Botão menu hamburguer */}
          <div
            className={`text-white hover:cursor-pointer ${
              window.innerWidth > 600 ? "hidden" : ""
            }`}
            onClick={() => {
              setIconMenu(!iconMenu);
              setMenu(!menu);
            }}
          >
            {iconMenu ? <X /> : <Menu />}
          </div>

          {/* Botões desktop */}
          <div
            className={`gap-6 ${window.innerWidth < 600 ? "hidden" : "flex"}`}
          >
            <BtnOrUser />
            <BtnRating width="[125px]" />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {window.innerWidth < 600 && menu && (
        <div className="bg-slate-600/95 text-white font-[poppins] flex flex-col items-center gap-4 p-4 animate-fadeIn">
          <BtnOrUser />
          <BtnRating width="[125px]" />
        </div>
      )}
    </header>
  );
}
