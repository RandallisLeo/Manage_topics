import { useEffect } from "react";

export type UnsavedExitDialogProps = {
  open: boolean;
  onSave: () => void;
  onDontSave: () => void;
};

/**
 * Figma: Alert (Dialog) 8277:227582 — 离开前是否保存
 */
export function UnsavedExitDialog({ open, onSave, onDontSave }: UnsavedExitDialogProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="save-dialog-backdrop leave-dialog-backdrop" role="presentation">
      <div
        className="leave-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="leave-dialog-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="leave-dialog__spacer-top" aria-hidden="true" />
        <div className="leave-dialog__body">
          <h2 id="leave-dialog-title" className="leave-dialog__title">
            Save topic preferences before leaving?
          </h2>
        </div>
        <div className="leave-dialog__actions">
          <button type="button" className="leave-dialog__btn leave-dialog__btn--neutral" onClick={onDontSave}>
            Don&apos;t save
          </button>
          <button type="button" className="leave-dialog__btn leave-dialog__btn--danger" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
