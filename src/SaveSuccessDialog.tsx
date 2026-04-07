import { useEffect } from "react";

export type SaveSuccessDialogProps = {
  open: boolean;
  onClose: () => void;
  /** 跳转至 For You / Feed，演示环境可用占位链接 */
  feedUrl?: string;
};

export function SaveSuccessDialog({
  open,
  onClose,
  feedUrl = "https://www.tiktok.com/"
}: SaveSuccessDialogProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const goToFeed = () => {
    window.location.assign(feedUrl);
  };

  return (
    <div
      className="save-dialog-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="save-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-dialog-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="save-dialog__top">
          <div className="save-dialog__icon-wrap" aria-hidden="true">
            <svg className="save-dialog__icon-tick" viewBox="0 0 48 48" width="48" height="48">
              <circle cx="24" cy="24" r="24" fill="#0BE09B" />
              <path
                fill="none"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 24.5l7 7 13-14"
              />
            </svg>
          </div>
          <button
            type="button"
            className="save-dialog__close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.25 4.81L10.06 10l5.19 5.19-1.06 1.06L9 11.06 3.81 16.25 2.75 15.19 7.94 10 2.75 4.81 3.81 3.75 9 8.94l5.19-5.19 1.06 1.06z"
              />
            </svg>
          </button>
        </div>

        <div className="save-dialog__gap" aria-hidden="true" />

        <div className="save-dialog__body">
          <h2 id="save-dialog-title" className="save-dialog__title">
            Preference updated
          </h2>
          <p className="save-dialog__desc">
            Your feed has been updated based on your topic preferences. Enjoy your refreshed content.
          </p>
        </div>

        <div className="save-dialog__actions">
          <button type="button" className="save-dialog__cta" onClick={goToFeed}>
            Go to For You feed
          </button>
        </div>
      </div>
    </div>
  );
}
