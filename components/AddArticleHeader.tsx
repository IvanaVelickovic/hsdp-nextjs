import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddArticleHeaderProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  submitting: boolean;
  onSubmit: (publish: boolean) => void;
  add: boolean;
  isPublished: boolean;
}

const AddArticleHeader = ({
  selected,
  setSelected,
  submitting,
  onSubmit,
  add,
  isPublished,
}: AddArticleHeaderProps) => {
  const selectedStyle = "border-b-2 px-2 cursor-pointer";

  const router = useRouter();

  const [publishing, setPublishing] = useState(false);

  const handleExit = () => {
    const confirmed = confirm(
      "Imate nespremljene promjene. Želite li napustiti stranicu?",
    );
    if (confirmed) router.push("/admin/dashboard");
  };

  const handleSubmit = (publish: boolean) => {
    setPublishing(publish);
    onSubmit(publish);
  };

  return (
    <div className="bg-white pt-4 px-6">
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-4">
          <button onClick={handleExit} className="">
            <p className="text-3xl hover:bg-green-200 px-2 py-0.5 rounded-lg">
              X
            </p>
          </button>
          <div className="flex items-center gap-x-4">
            <h1 className="text-header text-3xl font-semibold">
              {add ? "Novi članak" : "Doradi članak"}
            </h1>
            {isPublished && (
              <div className="flex items-center gap-x-0.5 bg-[#A4F4CF] rounded-lg px-2">
                <img src="/icons/globe_icon.png"></img>
                <p className="text-[#006045] text-[1rem]">Objavljeno</p>
              </div>
            )}
            {!isPublished && !add && (
              <div className="flex items-center gap-x-0.5 bg-[#FEF3C6] rounded-lg px-2">
                <img src="/icons/save_icon.png"></img>
                <p className="text-[#973C00] text-[0.95rem]">Skica</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-x-5">
          {!isPublished && (
            <button
              className="border-dark-green border-2 text-dark-green text-xl py-2 px-6 rounded-lg cursor-pointer"
              onClick={() => handleSubmit(false)}
              disabled={submitting}
            >
              {submitting && !publishing ? "Spremanje..." : "Spremi"}
            </button>
          )}

          <button
            className="bg-dark-green text-white text-xl py-2 px-6 rounded-lg cursor-pointer"
            onClick={() => handleSubmit(true)}
            disabled={submitting}
          >
            {submitting && publishing ? "Objavljivanje..." : "Objavi"}
          </button>
        </div>
      </div>
      <ul className="flex gap-18 items-center pt-2 px-4 text-lg">
        <li
          className={
            selected == 0 ? selectedStyle : "cursor-pointer px-2 py-0.5"
          }
          onClick={() => setSelected(0)}
        >
          Uredi
        </li>
        {/* <li
          className={
            selected == 1 ? selectedStyle : "cursor-pointer px-2 py-0.5"
          }
          onClick={() => setSelected(1)}
        >
          Pregled članka
        </li>
        <li
          className={
            selected == 2 ? selectedStyle : "cursor-pointer px-2 py-0.5"
          }
          onClick={() => setSelected(2)}
        >
          Pregled kartice
        </li> */}
      </ul>
    </div>
  );
};

export default AddArticleHeader;
