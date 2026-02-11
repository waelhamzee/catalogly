import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import {
  DialogContext,
  type DialogAction,
  type DialogOptions,
} from "./DialogContext";

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const openDialog = useCallback((opts: DialogOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    options?.onClose?.();
    setOptions(null);
  }, [options]);

  const defaultActions: DialogAction[] = [
    { label: "OK", variant: "contained" },
  ];
  const actions = (options?.actions?.length ? options.actions : defaultActions).map(
    (a) => ({
      ...a,
      onClick:
        a.onClick != null
          ? () => {
              a.onClick?.();
              closeDialog();
            }
          : closeDialog,
    }),
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={open}
        onClose={closeDialog}
        maxWidth={options?.maxWidth ?? "sm"}
        fullWidth
      >
        {options && (
          <>
            <DialogTitle>{options.title}</DialogTitle>
            <DialogContent>
              {typeof options.content === "string" ? (
                <DialogContentText>{options.content}</DialogContentText>
              ) : (
                options.content
              )}
            </DialogContent>
            <DialogActions>
              {actions.map((action, i) => (
                <Button
                  key={i}
                  onClick={action.onClick}
                  variant={action.variant ?? "text"}
                  color={action.color}
                >
                  {action.label}
                </Button>
              ))}
            </DialogActions>
          </>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
}
