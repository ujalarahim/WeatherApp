const Divider = ({ text = "or" }) => {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-surface-lighter" />
      <span className="text-xs text-gray-500 uppercase tracking-wider">
        {text}
      </span>
      <div className="flex-1 h-px bg-surface-lighter" />
    </div>
  );
};

export default Divider;
