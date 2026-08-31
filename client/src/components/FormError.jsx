const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl animate-scale-in">
      <p className="text-sm text-danger text-center">
        {error.message}
      </p>
    </div>
  );
};

export default FormError;
