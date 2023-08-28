export function Footer() {
  return (
    <footer className="flex xxs:flex-row flex-col items-center justify-center w-full gap-4 md:pb-16 xs:pb-12 pb-8 xs:text-base text-sm">
      <p>Desenvolvido por</p>
      <a
        className="text-yellow-400 uppercase hover:scale-110 hover:opacity-80 duration-300 font-bold"
        href="https://github.com/glsvitoria"
        target="_blank"
      >
        Glsvitoria
      </a>
    </footer>
  );
}
