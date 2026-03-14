"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import formatDate from "@/lib/formatDate";

interface ArticlePageProps {
  article: Article;
}

const ArticlePage = ({ article }: ArticlePageProps) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setPreviewIndex(null);
    document.body.style.overflow = "";
  };

  const prev = () => {
    if (article?.images) {
      setPreviewIndex((i) => (i! > 0 ? i! - 1 : article.images.length - 1));
    }
  };

  const next = () => {
    if (article?.images) {
      setPreviewIndex((i) => (i! < article.images.length - 1 ? i! + 1 : 0));
    }
  };

  return (
    <div className="w-screen flex justify-center bg-background">
      <div className="w-[94%] lg:w-[86%]">
        <Link href="/">
          <button className="flex items-center gap-2 text-header mt-3 lg:mt-4 ml-1 hover:cursor-pointer">
            <img src="/icons/arrow-left-icon.svg" className="h-6"></img>
            <p>Natrag</p>
          </button>
        </Link>

        <div className="rounded-2xl shadow-lg px-3 lg:px-10 py-5 lg:py-10 bg-white my-3 lg:my-5">
          <div className="border-b-2 pb-5 border-gray-300 px-2">
            <h1 className="text-2xl lg:text-3xl text-header font-semibold pb-3">
              {article?.title}
            </h1>
            <div className="flex items-center gap-2 lg:gap-8 text-header/85">
              <div className="flex items-baseline gap-0.5 lg:gap-1.5">
                <img src="/icons/user-icon.svg" className="h-5"></img>
                <p className="text-base">{article?.author}</p>
              </div>
              <div className="flex gap-0.5 lg:gap-1.5">
                <img src="/icons/calendar-icon.svg" className="h-5.5"></img>
                <p className="text-base">{formatDate(article?.date)}</p>
              </div>
            </div>
          </div>

          <div className="py-4 px-2 border-b-2 border-gray-300 text-header text-justify">
            {article?.paragraphs.map((paragraph) => (
              <p className="py-1" key={paragraph.paragraph_id}>
                {paragraph.text}
              </p>
            ))}
          </div>

          <div className="py-5 px-2">
            <div className="lg:flex lg:justify-between lg:items-center text-paragraph pb-3">
              <h2 className="text-xl text-header font-semibold">Galerija</h2>
              {article?.images_author !== "NULL" && (
                <h5>Fotografije: {article?.images_author}</h5>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {article?.images.map((image, index) => (
                <div
                  key={image.image_id}
                  className="overflow-hidden rounded-lg"
                >
                  <img
                    src={image.URL_text}
                    className="cursor-pointer max-h-117.5 rounded-lg transition-transform duration-300 hover:scale-102"
                    onClick={() => openPreview(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <button
            className="absolute left-4 lg:left-12 text-white text-5xl hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>

          <img
            src={article?.images.at(previewIndex)?.URL_text}
            className="max-w-[96%] lg:max-w-[90%] max-h-[90vh] rounded-lg"
          />

          <button
            className="absolute right-4 lg:right-12 text-white text-5xl hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>

          <button
            className="absolute top-8 right-8 text-white text-3xl lg:text-4xl hover:cursor-pointer"
            onClick={() => {
              setPreviewIndex(null);
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
