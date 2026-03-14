import Card from "./Card";
import { Article } from "@/lib/types";

interface MainPageProps {
  articles: Article[];
}

const MainPage = ({ articles }: MainPageProps) => {
  return (
    <div className="w-screen min-h-[90vh] flex flex-col justify-center bg-background pb-12">
      <div className="flex flex-col items-center py-7">
        <h1 className="text-header text-2xl lg:text-3xl py-2 font-semibold">
          Dobro došli!
        </h1>
        <h3 className="text-paragraph px-3 text-base lg:text-lg text-center">
          Pratite najnovije vijesti i događanja povezana s{" "}
          <span className="lg:font-normal font-semibold">
            Hrvatsko-slovenskim društvom prijateljstva
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-10 w-[90%] lg:w-[84%] mx-auto">
        {articles.map((article, i) => (
          <Card key={i} article={article}></Card>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
