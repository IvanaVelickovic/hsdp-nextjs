"use client";

import { supabase } from "@/lib/supabaseClient";
import { Article } from "@/lib/types";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddArticleHeader from "./AddArticleHeader";
import Card from "./Card";
import ArticleBox from "./ArticleBox";
import { useRouter } from "next/navigation";

interface AddArticleProps {
  articleId?: number;
}

const AddArticle = ({ articleId }: AddArticleProps) => {
  const router = useRouter();

  const [selected, setSelected] = useState(0);

  const [article, setArticle] = useState<Article>({
    article_id: 1,
    title: "",
    author: "",
    date: "",
    thumbnail: "",
    paragraphs: [],
    images: [],
    images_author: "",
    description_paragraph: "",
  });

  const [text, setText] = useState("");

  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, paragraphs(*), images(*)")
        .eq("article_id", articleId)
        .single();

      if (error) return;

      setArticle(data);
      setText(data.paragraphs.map((p: any) => p.text).join("\n\n"));
      const images = data.images.map((img: any) => img.URL_text);
      setExistingImages(images);

      const thumbIndex = images.findIndex(
        (url: string) => url === data.thumbnail,
      );
      if (thumbIndex !== -1) {
        setFeaturedIndex(-(thumbIndex + 1)); // negativni index = postojeća slika
      }
    };

    fetchArticle();
  }, [articleId]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  const insertArticle = async () => {
    const { data: insertedArticle, error: articleError } = await supabase
      .from("articles")
      .insert({
        title: article.title,
        author: article.author,
        date: article.date,
        thumbnail: null,
        images_author:
          article.images_author == "" ? null : article.images_author,
        description_paragraph: article.description_paragraph,
      })
      .select("article_id")
      .single();

    if (articleError) throw new Error(articleError.message);
    return insertedArticle.article_id;
  };

  const uploadImages = async (articleId: number) => {
    const uploadedUrls: string[] = [];
    let thumbnailUrl = "";

    for (const [index, file] of files.entries()) {
      const fileName = `${articleId}/${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("hsdp_images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (error) throw new Error(`Upload greška: ${error.message}`);

      const { data: urlData } = supabase.storage
        .from("hsdp_images")
        .getPublicUrl(data.path);

      uploadedUrls.push(urlData.publicUrl);

      if (index == featuredIndex) {
        thumbnailUrl = urlData.publicUrl;
      }
    }

    return { uploadedUrls, thumbnailUrl };
  };

  const insertImages = async (uploadedUrls: string[], articleId: number) => {
    for (const [index, url] of uploadedUrls.entries()) {
      const { error } = await supabase.from("images").insert({
        URL_text: url,
        order: index + 1,
        article_id: articleId,
      });
      if (error) throw new Error(error.message);
    }
  };

  const insertParagraphs = async (paragraphs: string[], articleId: number) => {
    for (const [index, paragraph] of paragraphs.entries()) {
      const { error } = await supabase.from("paragraphs").insert({
        article_id: articleId,
        text: paragraph,
        order: index + 1,
      });
      if (error) throw new Error(error.message);
    }
  };

  const updateThumbnail = async (articleId: number, thumbnailUrl: string) => {
    const { error } = await supabase
      .from("articles")
      .update({ thumbnail: thumbnailUrl })
      .eq("article_id", articleId);

    if (error) throw new Error(error.message);
  };

  const createArticle = async () => {
    const articleId = await insertArticle();
    console.log(articleId);

    const { uploadedUrls, thumbnailUrl } = await uploadImages(articleId);
    console.log(uploadedUrls);

    await insertImages(uploadedUrls, articleId);

    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    await insertParagraphs(paragraphs, articleId);

    await updateThumbnail(articleId, thumbnailUrl);

    alert("Članak uspješno objavljen!");
    router.push("/admin/dashboard");
  };

  const updateArticle = async (articleId: number) => {
    // 1. update articles
    await supabase
      .from("articles")
      .update({
        title: article.title,
        author: article.author,
        date: article.date,
        thumbnail: null,
        images_author:
          article.images_author == "" ? null : article.images_author,
        description_paragraph: article.description_paragraph,
      })
      .eq("article_id", articleId);

    // 2. uploadaj nove slike → dobiješ nove URL-ove
    const { uploadedUrls, thumbnailUrl } = await uploadImages(articleId);

    // 3. kombiniraj postojeće + nove URL-ove
    const allUrls = [...existingImages, ...uploadedUrls];

    // 4. obrisi stare zapise u images tablici i inseraj sve iznova
    await supabase.from("images").delete().eq("article_id", articleId);
    await insertImages(allUrls, articleId);

    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    // 5. isti za paragraphe
    await supabase.from("paragraphs").delete().eq("article_id", articleId);
    await insertParagraphs(paragraphs, articleId);

    // 6. update thumbnail
    const thumbnail =
      featuredIndex === null
        ? null
        : featuredIndex < 0
          ? existingImages[-(featuredIndex + 1)] // postojeća
          : uploadedUrls[featuredIndex]; // nova
    await updateThumbnail(articleId, thumbnail ?? "");

    alert("Članak uspješno promijenjen!");
    router.push("/admin/dashboard");
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      if (articleId) {
        await updateArticle(articleId);
      } else {
        await createArticle();
      }
    } catch (err: any) {
      alert(`Greška: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" bg-background">
        <AddArticleHeader
          selected={selected}
          setSelected={setSelected}
          submitting={submitting}
          onSubmit={handleSubmit}
          add={articleId ? false : true}
        ></AddArticleHeader>
        {selected == 0 && (
          <form className="flex flex-col py-6 px-20">
            <label
              htmlFor="title"
              className="text-header text-xl font-semibold mb-0.5"
            >
              Naslov
            </label>
            <input
              type="text"
              name="title"
              value={article.title}
              placeholder="Unesite naslov članka"
              onChange={(e) => handleChange(e)}
              className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90"
            ></input>

            <label
              htmlFor="description"
              className="text-header text-xl font-semibold mb-0.5 mt-7"
            >
              Sažetak
            </label>
            <textarea
              name="description_paragraph"
              value={article.description_paragraph}
              placeholder="Unesite kratki sažetak"
              onChange={(e) => handleChange(e)}
              className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90 overflow-y-visible h-35"
            ></textarea>

            <label
              htmlFor="article"
              className="text-header text-xl font-semibold mb-0.5 mt-7"
            >
              Sadržaj
            </label>
            <textarea
              name="article"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Unesite cijeli sadržaj članka, paragrafe odvojite s dvostrukim enterom"
              className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90 overflow-y-visible h-100"
            ></textarea>

            <div className="flex justify-between items-center mt-7 gap-50">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="author"
                  className="text-header text-xl font-semibold mb-0.5"
                >
                  Autor
                </label>
                <input
                  type="text"
                  name="author"
                  value={article.author}
                  onChange={(e) => handleChange(e)}
                  placeholder="Unesite autora članka"
                  className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90"
                ></input>
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="date"
                  className="text-header text-xl font-semibold mb-0.5"
                >
                  Datum
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="Unesite datum"
                  value={article.date}
                  onChange={(e) => handleChange(e)}
                  className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90"
                ></input>
              </div>
            </div>

            <div className="mt-7">
              <p className="text-header text-xl font-semibold mb-0.5">
                Galerija slika
              </p>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
                  isDragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Otpusti za upload</p>
                ) : (
                  <p>Povuci slike ovdje ili klikni za odabir</p>
                )}
              </div>

              {/* Postojeće slike (edit mode) */}
              {existingImages.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {existingImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-150 border rounded overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Existing ${i}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setExistingImages((prev) =>
                            prev.filter((_, j) => j !== i),
                          )
                        }
                        className="cursor-pointer absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                      >
                        X
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeaturedIndex(-(i + 1))} // negativni index = postojeća slika
                        className={`absolute bottom-1 left-1 px-2 text-base rounded ${
                          featuredIndex === -(i + 1)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {featuredIndex === -(i + 1)
                          ? "Naslovna"
                          : "Postavi naslovnu"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {previews.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-150 border rounded overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`Preview ${i}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="cursor-pointer absolute top-1 right-1 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                      >
                        X
                      </button>
                      {/* Gumb za označiti naslovnu */}
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedIndex(i);
                        }}
                        className={`absolute bottom-1 left-1 px-2 text-base rounded ${
                          featuredIndex === i
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {featuredIndex === i ? "Naslovna" : "Postavi naslovnu"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col mt-3">
                <label
                  htmlFor="images_author"
                  className="text-header text-xl font-semibold mb-0.5"
                >
                  Autor slika
                </label>
                <input
                  type="text"
                  name="images_author"
                  value={article.images_author}
                  onChange={(e) => handleChange(e)}
                  placeholder="Unesite autora slika ili ostavite prazno"
                  className="bg-white border border-gray-500 rounded-lg text-[1.19rem] py-1.5 px-3.5 text-header/90"
                ></input>
              </div>
            </div>
          </form>
        )}
        {selected == 1 && (
          <div className="w-full flex justify-center items-center px-10">
            <div className="w-[90%] py-5">
              <ArticleBox article={article}></ArticleBox>
            </div>
          </div>
        )}

        {selected == 2 && (
          <div className="w-full flex justify-center items-center px-10">
            <div className="w-[44%] py-10">
              <Card article={article} disableLink={true}></Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddArticle;
