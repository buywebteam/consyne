const Spinner = () => {
  return (
    <div className="h-10 w-10 rounded-full border-4 border-orange-700 flex items-center justify-center">
      <div className="h-6 w-6 border-2 border-orange-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
