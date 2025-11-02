import { FooterCopyRight } from "./components/Footer";
import { HeaderHome } from "./components/Header";
import { MainHome } from "./components/Main";

export default function Home() {
  return (
    <>
      <HeaderHome />
      <MainHome />
      <FooterCopyRight/>
    </>
  );
}