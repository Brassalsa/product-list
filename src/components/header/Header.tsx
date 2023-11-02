import Filter from "../filter/Filter";

const Header = () => {
  return (
    <header className="p-2 flex flex-wrap gap-3 flex-col justify-center items-center mb-2">
      <h1 className="text-2xl font-semibold">Products Details</h1>
      <Filter />
    </header>
  );
};

export default Header;
