// src/components/CustomButton.tsx
import React from "react";
import clsx from "clsx";
import styles from "@components/styles/CustomButton.module.css";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline" | "code";
};

const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = "medium",
  variant = "primary",
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(styles.button, styles[variant], styles[size])}
    >
      {label}
    </div>
  );
};

export default CustomButton;
