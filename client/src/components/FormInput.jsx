const FormInput = ({ label, icon: Icon, type = "text", placeholder, register, error, animationClass = "" }) => {
  return (
    <div className={animationClass}>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300`}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-danger rounded-full" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
