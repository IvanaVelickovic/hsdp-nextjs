"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import ArticleBox from "./ArticleBox";

interface ArticlePageProps {
  article: Article;
}

const ArticlePage = ({ article }: ArticlePageProps) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

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
        <ArticleBox
          article={article}
          setPreviewIndex={setPreviewIndex}
        ></ArticleBox>
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
