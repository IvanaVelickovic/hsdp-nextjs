import Link from "next/link";
import Card from "./Card";
import { Article } from "@/lib/types";

interface MainPageProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;
}

const MainPage = ({ articles, currentPage, totalPages }: MainPageProps) => {
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

      {/* Pagination Controls */}
      {totalPages >= 1 && (
        <div className="flex justify-center items-center lg:gap-4 gap-2.5 mt-12">
          {currentPage > 1 ? (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="lg:text-[0.925rem] text-[0.75rem] lg:px-4 px-2 py-2 border border-header/80 text-header rounded-lg hover:bg-gray-100 transition"
            >
              {"<"} Prethodna
            </Link>
          ) : (
            <span className="lg:text-[0.925rem] text-[0.75rem] lg:px-4 px-2 py-2 border border-header/45 rounded-lg text-header/45 cursor-not-allowed">
              {"<"} Prethodna
            </span>
          )}

          <span className="lg:text-[0.925rem] text-[0.75rem] text-paragraph">
            Stranica <span className="text-header">{currentPage}</span> od{" "}
            <span className="text-header">{totalPages}</span>
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="lg:text-[0.925rem] text-[0.75rem] lg:px-4.5 px-2.5 py-2 border border-header/80 text-header rounded-lg hover:bg-gray-100 transition"
            >
              Sljedeća {">"}
            </Link>
          ) : (
            <span className="lg:text-[0.925rem] text-[0.75rem] lg:px-4.5 px-2.5 py-2 border border-header/45 rounded-lg text-header/45 cursor-not-allowed">
              Sljedeća {">"}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
