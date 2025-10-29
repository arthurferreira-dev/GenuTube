import { useEffect, useState } from "react";
import GenuTubeIcon from "../assets/GenuTube-icon.png";
import { Search } from "lucide-react";
import { type JSX } from "react";

export function HeaderHome() {
  const [wdtImg, setWdtImg] = useState<number>(70);
  const [inputVal, setInputVal] = useState<string>("");

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

  const InputSearch: () => JSX.Element = () => {
    return (
      <div className="flex justify-center items-center gap-2 bg-white font-mono w-[250px] max-[676px]:w-[165px] rounded-full">
        <label
          htmlFor="search-input"
          className="rounded-full p-1 duration-300 hover:bg-slate-200 hover:cursor-pointer"
        >
          <Search size={22} />
        </label>
        <input
          id="search-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="px-3 py-2 focus:outline-none focus:ring-0 border-l-black border-l-2"
        />
      </div>
    );
  };

  return (
    <header className="p-3 flex justify-between items-center bg-slate-500">
      <img
        src={GenuTubeIcon}
        alt="Genutube-Icon"
        className="rounded-md"
        width={wdtImg}
      />
      <InputSearch />
      <p>Account (remeber PLS!)</p>
    </header>
  );
}