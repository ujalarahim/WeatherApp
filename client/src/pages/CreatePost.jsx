import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../validations/postSchema.js";
import { postApi } from "../Api/PostApi.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlinePencilAlt, HiOutlineDocumentText } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout.jsx";
import FormInput from "../components/FormInput.jsx";
import FormTextarea from "../components/FormTextarea.jsx";
import FormError from "../components/FormError.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

const CreatePost = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(data) {
    toast.dismiss();
    try {
      const res = await postApi.createPost(data);
      if (res.data.success) {
        toast.success("Post created successfully! 🎉");
        reset();
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      if (serverMessage) {
        setError("general", { type: "server", message: serverMessage });
      } else {
        setError("general", {
          type: "server",
          message: "Post creation failed. Please try again.",
        });
      }
      toast.error(serverMessage || "Something went wrong");
    }
  }

  return (
    <AuthLayout
      title="Create Post"
      subtitle="Share your thoughts with the community"
      icon={FiEdit3}
      showGoogleButton={false}
      footerText="Back to"
      footerLink="/dashboard"
      footerLinkText="Dashboard"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Post Title"
          icon={HiOutlinePencilAlt}
          placeholder="Enter an engaging title..."
          register={register("title")}
          error={errors.title}
          animationClass="animate-slide-in-left delay-300"
        />
        <FormTextarea
          label="Content"
          icon={HiOutlineDocumentText}
          placeholder="Write your post content here..."
          register={register("description")}
          error={errors.description}
          rows={6}
          animationClass="animate-slide-in-left delay-400"
        />
        <FormError error={errors.general} />
        <SubmitButton
          isSubmitting={isSubmitting}
          label="Publish Post"
          loadingLabel="Creating post..."
          icon={FiEdit3}
        />
      </form>
    </AuthLayout>
  );
};

export default CreatePost;
