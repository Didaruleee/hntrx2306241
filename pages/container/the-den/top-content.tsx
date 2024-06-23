const TopContent = ({name, value}: {name: string; value: number | string}) => {
  return (
    <div className="text-center py-5 w-full">
      <h3 className="sm:text-lg font-medium leading-6">{name}</h3>
      <h3 className="sm:text-2xl font-bold leading-7">{value}</h3>
    </div>
  );
};

export default TopContent;
