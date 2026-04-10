import Link from "next/link";

interface AddArticleHeaderProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const AddArticleHeader = ({ selected, setSelected }: AddArticleHeaderProps) => {
  const selectedStyle = "border-b-2 px-2 cursor-pointer";
  return (
    <div className="bg-white pt-4 px-6">
      <div className="flex items-center justify-between py-2">
        <div className="flex gap-4">
          <Link href="/admin/dashboard" className="">
            <p className="text-3xl hover:bg-green-200 px-2 py-0.5 rounded-lg">
              X
            </p>
          </Link>
          <h1 className="text-header text-3xl font-semibold">Novi članak</h1>
        </div>
        <button className="bg-dark-green text-white text-xl py-2 px-6 rounded-lg cursor-pointer">
          Spremi
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
