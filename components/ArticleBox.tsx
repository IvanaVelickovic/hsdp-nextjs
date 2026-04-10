import { Article } from "@/lib/types";
import formatDate from "@/lib/formatDate";

interface ArticleProps {
  article: Article;
  setPreviewIndex?: React.Dispatch<React.SetStateAction<number | null>>;
}

const ArticleBox = ({ article, setPreviewIndex }: ArticleProps) => {
  const openPreview = (index: number) => {
    if (!setPreviewIndex) return;
    setPreviewIndex(index);
    document.body.style.overflow = "hidden";
  };

  return (
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
            <div key={image.image_id} className="overflow-hidden rounded-lg">
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
  );
};

export default ArticleBox;
