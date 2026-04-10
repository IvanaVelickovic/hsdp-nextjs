"use client";

import { supabase } from "@/lib/supabaseClient";
import { Article } from "@/lib/types";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import AddArticleHeader from "./AddArticleHeader";
import Card from "./Card";
import ArticleBox from "./ArticleBox";

const AddArticle = () => {
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

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState<number | null>(null);

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

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("Greška pri uploadu:", error.message);
      setUploading(false);
      return;
    }

    // Dobivanje javnog URL-a za prikaz
    // const { publicUrl } = supabase.storage.from("images").getPublicUrl(data.path);
    //setPublicUrl(publicUrl);
    setUploading(false);
  }; */

  return (
    <>
      <div className=" bg-background">
        <AddArticleHeader
          selected={selected}
          setSelected={setSelected}
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
                          setArticle((prev) => ({
                            ...prev,
                            ["thumbnail"]: src,
                          }));
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
