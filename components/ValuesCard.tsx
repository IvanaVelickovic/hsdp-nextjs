interface ValuesCard {
  title: string;
  description: string;
}

const ValuesCard = ({ title, description }: ValuesCard) => {
  return (
    <div className="px-4 py-4 bg-light-green/60 rounded-2xl lg:min-h-32 ">
      <h2 className="text-header font-semibold text-lg py-1 lg:py-2">
        {title}
      </h2>
      <p className="pb-1 lg:pb-2 text-base">{description}</p>
    </div>
  );
};

export default ValuesCard;
