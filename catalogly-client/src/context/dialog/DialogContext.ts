import type { ReactNode } from "react";
import { createContext } from "react";

export interface DialogAction {
  label: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export interface DialogOptions {
  title: string;
  content: ReactNode;
  actions?: DialogAction[];
  onClose?: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export interface DialogContextValue {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined,
);
