// src/components/CustomButton.tsx
import React from "react";
import clsx from "clsx";
import styles from "@components/styles/CustomButton.module.css";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline" | "code";
  disabled?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  size = "medium",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(styles.button, styles[variant], styles[size], {
        [styles.disabled]: disabled,
      })}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
