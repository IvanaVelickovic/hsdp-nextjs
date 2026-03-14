const Footer = () => {
  return (
    <footer className="bg-dark-green text-gray-200 py-3 flex flex-col items-center">
      <div className="w-[86%] lg:w-[84%] lg:flex lg:justify-around">
        <div>
          <h4>Hrvatsko-slovensko društvo prijateljstva</h4>
          <p className="text-xs pl-2 lg:pl-0 py-1">
            Promicanje kulturne razmjene i prijateljstva između Hrvatske i
            Slovenije.
          </p>
        </div>
        <div>
          <h4>Kontakt</h4>
          <p className="text-xs pl-2 lg:pl-0 py-1">Email: email@email.hr</p>
        </div>
      </div>
      <div className="flex justify-center border-t border-gray-200 w-4/5 mt-1 text-[8px] lg:text-[10px] pt-1">
        © {new Date().getFullYear()} Hrvatsko-slovensko društvo prijateljstva.
        Sva prava pridržana.{" "}
      </div>
    </footer>
  );
};

export default Footer;
