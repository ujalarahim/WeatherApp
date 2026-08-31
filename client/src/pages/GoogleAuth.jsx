import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAccessToken, setUser } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const error = searchParams.get("error");

    if (error) {
      navigate(`/login?error=${decodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (accessToken) {
      setAccessToken(accessToken);
      navigate("/dashboard", { replace: true });
    } else {
      setAccessToken(null);
      navigate("/login", { replace: true });
    }
  }, [navigate, setAccessToken, setUser, searchParams]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin w-10 h-10 text-accent" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-gray-400 text-sm">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleAuth;
