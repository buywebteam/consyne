import React from "react";

interface ButtonProps {
  type?: "default" | "outline";
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "default",
  label = "Galaxy Button",
  onClick,
}) => {
  const buttonStyles: Record<
    "default" | "outline",
    {
      bgColor: string;
      textColor: string;
      border: string;
      width: string;
      disabled?: boolean;
    }
  > = {
    default: {
      bgColor: "bg-orange-500",
      textColor: "text-white",
      border: "",
      width: "w-[200px]",
    },
    outline: {
      bgColor: "bg-transparent",
      textColor: "text-black",
      border: "border border-black",
      width: "w-[100px]",
    },
  };

  const { bgColor, textColor, border, width, disabled } = buttonStyles[type];

  return (
    <button
      className={`py-2 px-4 rounded-md flex items-center justify-center cursor-pointer ${width} ${bgColor} ${border}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      <span className={`text-base ${textColor}`}>{label}</span>
    </button>
  );
};

export default Button;
