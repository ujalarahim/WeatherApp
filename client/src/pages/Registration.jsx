import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validations/registrationSchema.js";
import { UserApi } from "../Api/UserApi.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout.jsx";
import FormInput from "../components/FormInput.jsx";
import FormError from "../components/FormError.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { name: "", email: "", password: "", gender: "" },
  });

  async function onSubmit(data) {
    toast.dismiss();
    try {
      await UserApi.register(data);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          setError(key, { type: "server", message: serverErrors[key] });
        });
        toast.error("Please fix the errors below");
      } else {
        setError("general", { type: "server", message: serverMessage || "Failed to register" });
        toast.error(serverMessage || "Something went wrong");
      }
    }
  }

  const genderOptions = [
    { value: "male", label: "Male", emoji: "👨" },
    { value: "female", label: "Female", emoji: "👩" },
    { value: "others", label: "Others", emoji: "🧑" },
  ];

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us and start your journey"
      icon={FiUserPlus}
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in here"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Full Name"
          icon={HiOutlineUser}
          placeholder="John Doe"
          register={register("name")}
          error={errors.name}
          animationClass="animate-slide-in-right delay-300"
        />
        <FormInput
          label="Email Address"
          icon={HiOutlineMail}
          type="email"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email}
          animationClass="animate-slide-in-right delay-400"
        />
        <FormInput
          label="Password"
          icon={HiOutlineLockClosed}
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password}
          animationClass="animate-slide-in-right delay-500"
        />

        {/* Gender Radio Group */}
        <div className="animate-slide-in-right delay-700">
          <label className="block text-sm font-medium text-gray-300 mb-3">Gender</label>
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input type="radio" value={option.value} {...register("gender")} className="peer sr-only" />
                <div className="flex flex-col items-center gap-1.5 p-3 bg-surface/80 border border-surface-lighter rounded-xl text-gray-400 transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent-light hover:border-surface-lighter/80 hover:bg-surface/60">
                  <span className="text-xl">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
              <span className="inline-block w-1 h-1 bg-danger rounded-full" />
              {errors.gender.message}
            </p>
          )}
        </div>

        <FormError error={errors.general} />
        <SubmitButton isSubmitting={isSubmitting} label="Create Account" loadingLabel="Creating account..." icon={FiUserPlus} />
      </form>
    </AuthLayout>
  );
};

export default Registration;
