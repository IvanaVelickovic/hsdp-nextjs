import ValuesCard from "./ValuesCard";

const AboutPage = () => {
  return (
    <div className="flex justify-center w-screen bg-background py-6">
      <div className="flex flex-col bg-white shadow-lg rounded-2xl w-[90%] lg:w-[70%] px-4.5 lg:px-10 py-5 lg:py-10">
        <h1 className="text-3xl text-header py-3 self-center font-semibold">
          O nama
        </h1>
        <div className="pt-4">
          <h2 className="text-xl font-semibold text-header">Naša misija</h2>
          <p className="text-paragraph py-1.5">
            Hrvatsko-slovensko društvo prijateljstva osnovano je s ciljem
            jačanja veza između dva susjedna naroda kroz kulturu, obrazovanje i
            međusobnu suradnju. Naša misija je promicati razumijevanje,
            toleranciju i prijateljstvo između hrvatskog i slovenskog naroda.
          </p>
        </div>

        <div className="text-paragraph pt-4">
          <h2 className="text-xl font-semibold text-header">Što radimo</h2>
          <p className="pt-1">
            Naše društvo organizira brojne aktivnosti i programe koji
            obuhvaćaju:
          </p>
          <ul className="pl-4 py-1.5">
            <li>Obrazovne radionice</li>
            <li>Predavanja</li>
            <li>Druženja</li>
          </ul>
        </div>

        <div className="pt-4">
          <h2 className="text-xl font-semibold text-header">Naša povijest</h2>
          <p className="text-paragraph py-1.5">
            Društvo je osnovano na temeljima dugogodišnjeg prijateljstva i
            suradnje između Hrvatske i Slovenije. Od samih početaka okupljamo
            ljude kojima je stalo do međukulturnog dijaloga i zajedničkog
            napretka dvaju susjednih naroda.
          </p>
        </div>

        <div className="text-paragraph pt-4">
          <h2 className="text-xl font-semibold text-header">
            Naše vrijednosti
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-3">
            <ValuesCard
              title="Suradnja"
              description="Vjerujemo u snagu zajedničkog djelovanja i međusobne podrške"
            />
            <ValuesCard
              title="Poštovanje"
              description="Poštujemo različitosti i tradicije obje kulture"
            />
            <ValuesCard
              title="Inovativnost"
              description="Tražimo nove načine povezivanja i suradnje"
            />
            <ValuesCard
              title="Transparentnost"
              description="Djelujemo otvoreno i odgovorno"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
