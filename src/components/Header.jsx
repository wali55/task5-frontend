import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="h-[80px] bg-neutral-800 mb-4 flex items-center">
      <div className="w-full mx-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <img src={Logo} alt="logo" className="size-8" />
          </div>
          <h1 className="text-white font-semibold text-lg">Task5 App</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
