import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import Divider from "./Divider";

const AuthLayout = ({
  title,
  subtitle,
  icon: Icon,
  children,
  footerText,
  footerLink,
  footerLinkText,
  showGoogleButton = true,
}) => {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-blob delay-2000" />
      <div className="absolute top-[50%] right-[40%] w-[250px] h-[250px] bg-success/10 rounded-full blur-[100px] animate-blob delay-4000" />

      <ToastContainer
        position="top-right"
        theme="dark"
        toastClassName="!bg-surface-light !text-white !border !border-surface-lighter !rounded-xl"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/30 animate-pulse-glow">
            {Icon && <Icon className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-8 shadow-2xl shadow-black/40 animate-fade-in-up delay-200">
          {children}

          {showGoogleButton && (
            <>
              <Divider />
              <GoogleButton />
            </>
          )}

          {/* Footer Link */}
          {footerText && (
            <p className="text-center text-sm text-gray-400 mt-5 animate-fade-in delay-700">
              {footerText}{" "}
              <Link
                to={footerLink}
                className="text-accent-light hover:text-primary-light font-medium transition-colors duration-200"
              >
                {footerLinkText}
              </Link>
            </p>
          )}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 gap-1.5 animate-fade-in delay-1000">
          <div className="w-2 h-1 bg-accent/30 rounded-full" />
          <div className="w-2 h-1 bg-primary-light/50 rounded-full" />
          <div className="w-8 h-1 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
