
const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 mb-4">
      <div className="container mx-3 px-4 py-4 flex justify-between items-center">
         <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-20"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
