export const FooterCopyRight = () => {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const name: string = "arthur ferreira da costa";

  return (
    <footer className="bg-slate-500 p-2 text-white text-center font-[open_sans] font-medium">
      &copy; Direitos Reservados de <span className="capitalize">{name}</span> - ({year})
    </footer>
  );
};