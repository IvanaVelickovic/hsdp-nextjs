import Link from "next/link";
import { useRouter } from "next/navigation";

interface AddArticleHeaderProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  submitting: boolean;
  onSubmit: () => void;
  add: boolean;
}

const AddArticleHeader = ({
  selected,
  setSelected,
  submitting,
  onSubmit,
  add,
}: AddArticleHeaderProps) => {
  const selectedStyle = "border-b-2 px-2 cursor-pointer";

  const router = useRouter();

  const handleExit = () => {
    const confirmed = confirm(
      "Imate nespremljene promjene. Želite li napustiti stranicu?",
    );
    if (confirmed) router.push("/admin/dashboard");
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
          <h1 className="text-header text-3xl font-semibold">
            {add ? "Novi članak" : "Doradi članak"}
          </h1>
        </div>
        <button
          className="bg-dark-green text-white text-xl py-2 px-6 rounded-lg cursor-pointer"
          onClick={onSubmit}
          disabled={submitting}
        >
          {add
            ? submitting
              ? "Objavljivanje..."
              : "Objavi"
            : submitting
              ? "Spremanje..."
              : "Spremi"}
        </button>
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
        {/*<li
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
