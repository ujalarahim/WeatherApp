import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { AuthApi } from "../Api/AuthApi.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout.jsx";
import FormInput from "../components/FormInput.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setAccessToken, setUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    toast.dismiss();
    try {
      const res = await AuthApi.login(data);
      toast.success("Login Successful! Redirecting...");
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your dashboard"
      icon={FiLogIn}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Create one here"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Email Address"
          icon={HiOutlineMail}
          type="email"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email}
          animationClass="animate-slide-in-left delay-300"
        />
        <FormInput
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password}
          animationClass="animate-slide-in-left delay-400"
        />
        <SubmitButton isSubmitting={isSubmitting} label="Sign In" loadingLabel="Signing in..." icon={FiLogIn} />
      </form>
    </AuthLayout>
  );
}

export default Login;
