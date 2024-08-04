import { useId } from "react";

import { Input, InputProps } from "./input";
import { Label, TLabelProps } from "./label";

export interface IInputProps extends InputProps {
  label?: string;
  labelClasses?: string;
  labelProps?: TLabelProps;
}

export const InputField = ({
  type = "text",
  label,
  labelClasses,
  labelProps,
  ...inputProps
}: IInputProps) => {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} className={labelClasses} {...labelProps}>
        {label}
      </Label>
      <Input id={id} type={type} {...inputProps} />
    </div>
  );
};
