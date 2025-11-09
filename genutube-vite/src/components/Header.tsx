import { useEffect, useState } from "react";
import GenuTubeIcon from "../assets/GenuTube-icon.png";
import { Search } from "lucide-react";
import { type JSX } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export function HeaderHome() {
  const [wdtImg, setWdtImg] = useState<number>(70);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const ResponsiveImg = () => {
      if (window.innerWidth < 676) {
        setWdtImg(55);
      } else setWdtImg(70);
    };
    window.addEventListener("resize", ResponsiveImg);

    return () => {
      window.removeEventListener("resize", ResponsiveImg);
    };
  }, []);

  const BtnOrUser = () => {
    if (user === null) {
      return <button className="p-2 bg-sky-500 text-white font-[rubik] w-[125px] rounded-lg duration-300 hover:bg-sky-600 hover:cursor-pointer"onClick={() => navigate('/login')}>Login</button>
    } else {
      return <img className="w-15 rounded-full hover:cursor-pointer" src={user.photo} alt={`${user.email} [Avatar]`} />
    }
  }

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

  return (
    <header className="p-3 flex justify-between items-center bg-slate-500">
      <a href="/">
        <img
          src={GenuTubeIcon}
          alt="Genutube-Icon"
          className="rounded-md"
          width={wdtImg}
        />
      </a>
      <InputSearch />
      <BtnOrUser/>
    </header>
  );
}