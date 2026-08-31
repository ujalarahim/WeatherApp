import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-danger/10 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-primary/15 rounded-full blur-[120px] animate-blob delay-2000" />

      <div className="text-center relative z-10 animate-fade-in-up">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[10rem] sm:text-[14rem] font-extrabold leading-none bg-gradient-to-br from-primary via-accent to-primary-light bg-clip-text text-transparent animate-gradient select-none">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full -z-10 animate-pulse-glow" />
        </div>

        {/* Message */}
        <div className="animate-fade-in-up delay-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm sm:text-base">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up delay-400">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <FiHome className="w-5 h-5" />
            Go to Dashboard
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-surface-light border border-surface-lighter text-gray-300 font-medium rounded-xl hover:border-primary/40 hover:text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Login
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="flex justify-center mt-10 gap-1.5 animate-fade-in delay-700">
          <div className="w-2 h-1 bg-danger/40 rounded-full" />
          <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          <div className="w-2 h-1 bg-primary/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
