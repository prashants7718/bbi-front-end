
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-[#004c80] text-center mb-6">
          Welcome to Our BBI
        </h1>
        <p className="text-lg text-[#555] text-center mb-8">
          Experience the best features and seamless performance.
        </p>
        <div className="flex justify-center space-x-6">
          <button className="px-6 py-3 text-white bg-[#f88da7] hover:bg-[#ff647f] font-semibold rounded-full shadow transition duration-300">
            Login
          </button>
          <button className="px-6 py-3 text-white bg-[#ffc3e1] hover:bg-[#ff94c2] font-semibold rounded-full shadow transition duration-300">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
