const FieldSet = ({ label, children }) => {
  return (
    <fieldset className="w-full px-2">
      <div>
        {label && (
          <legend className="text-lg text-neutral-900 mb-4">{label}</legend>
        )}
        <div className="flex items-center flex-wrap gap-4">{children}</div>
      </div>
    </fieldset>
  );
};

export default FieldSet;
