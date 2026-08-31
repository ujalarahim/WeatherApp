import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  function handleClick() {
    window.location.href = "http://localhost:2000/api/v1/auth/google";
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface/80 border border-surface-lighter rounded-xl text-gray-300 font-medium hover:bg-surface-lighter/60 hover:border-surface-lighter hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
    >
      <FcGoogle className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
