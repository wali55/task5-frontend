import React from "react";

const Field = ({ label, children, htmlFor, count }) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className="flex-1 flex flex-col min-w-[300px]">
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-neutral-700 font-semibold mb-2"
        >
          {label} {count && `(${count})`}
        </label>
      )}
      {children}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child?.props?.id;
  }
};

export default Field;
