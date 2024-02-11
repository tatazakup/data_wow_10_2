import React from "react";

type ICheckbox = {
  checked?: boolean;
  onTicker?: React.ChangeEventHandler<HTMLInputElement>;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export const Checkbox = (props: ICheckbox) => {
  const { checked = false, onTicker, className, ...rest } = props;
  return (
    <label className={`checkbox_container ${className}`} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onTicker?.(e)}
      />
      <span className="checkbox_mark"></span>
    </label>
  );
};
