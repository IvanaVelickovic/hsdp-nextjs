import Link from "next/link";
import { Article } from "@/lib/types";
import formatDate from "@/lib/formatDate";

interface CardProps {
  article: Article;
}

const Card = ({ article }: CardProps) => {
  const link = "/articles/" + article.article_id;

  return (
    <Link href={link}>
      <div className="flex flex-col h-full shadow-md rounded-2xl bg-white hover:cursor-pointer transition-transform duration-300 hover:scale-101">
        <div className="h-60 bg-white rounded-t-2xl shadow-sm">
          <img
            src={article.thumbnail}
            className="w-full h-full object-cover rounded-t-2xl"
          ></img>
        </div>
        <div className="flex flex-col lg:h-full lg:justify-between px-4 py-2 bg-white rounded-b-2xl">
          <h3 className="text-header text-lg lg:text-[1.35rem] text-justify lg:text-start">
            {article.title}
          </h3>
          <p className="text-paragraph text-[0.84rem] lg:text-sm py-2 text-justify">
            {article.description_paragraph}
          </p>
          <div className="flex items-center gap-2 text-header/85">
            <div className="flex items-baseline gap-1">
              <img src="/icons/user-icon.svg" className="h-4"></img>
              <p className="text-sm">{article.author}</p>
            </div>
            <div className="flex gap-1">
              <img src="/icons/calendar-icon.svg" className="h-4.5"></img>
              <p className="text-sm">{formatDate(article.date)}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 py-3 px-0.5 hover:cursor-pointer">
            <p className="text-[#647c0b]">Pročitaj više</p>
            <img src="/icons/arrow-right-icon.svg" className="h-5"></img>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
