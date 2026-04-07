import { useEffect, useRef, useState } from "react";
import type { ToggleValue, Topic } from "./topics";
import { TOPICS } from "./topics";

const RESET_TOAST_MS = 3000;

function encodeIconPath(src: string): string {
  return src
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function Toggle3({
  value,
  onChange
}: {
  value: ToggleValue;
  onChange: (value: ToggleValue) => void;
}) {
  const idx = value === "less" ? 0 : value === "default" ? 1 : 2;

  return (
    <div
      className="toggle3"
      role="radiogroup"
      aria-label="Less Default More"
      data-value={value}
      style={{ ["--idx" as string]: String(idx) }}
    >
      <div className="toggle3__bg" aria-hidden="true" />
      <div className="toggle3__thumb" aria-hidden="true" />
      <div className="toggle3__segments">
        {(["less", "default", "more"] as ToggleValue[]).map((item) => {
          const label = item === "less" ? "Less" : item === "default" ? "Default" : "More";
          const isSelected = value === item;
          return (
            <button
              key={item}
              type="button"
              className={`toggle3__seg${isSelected ? " is-selected" : ""}`}
              data-value={item}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(item)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type ManageTopicsScreenProps = {
  topicValues: ToggleValue[];
  onTopicChange: (index: number, value: ToggleValue) => void;
  hasChanges: boolean;
  /** 任一项非 Default 时为 true，用于 Reset all 按钮（与是否已保存无关） */
  hasAnyNonDefault: boolean;
  onSave: () => void;
  onBack: () => void;
  onResetAll: () => void;
};

export function ManageTopicsScreen({
  topicValues,
  onTopicChange,
  hasChanges,
  hasAnyNonDefault,
  onSave,
  onBack,
  onResetAll
}: ManageTopicsScreenProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (!toastOpen) return;
    const id = window.setTimeout(() => setToastOpen(false), RESET_TOAST_MS);
    return () => window.clearTimeout(id);
  }, [toastOpen]);

  /** Reset 后等 React 提交布局再滚到内容区顶部（与刚进页时一致） */
  const scrollContentToTop = () => {
    const apply = () => {
      const content = contentRef.current;
      if (!content) return;
      content.scrollTop = 0;
      content.scrollTo(0, 0);
      titleRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        apply();
        window.setTimeout(apply, 0);
        window.setTimeout(apply, 50);
      });
    });
  };

  const handleResetAll = () => {
    onResetAll();
    setToastOpen(true);
    scrollContentToTop();
  };

  const renderTopic = (topic: Topic, index: number) => (
    <div className="row" key={topic.title}>
      <div className="row__head">
        <div className={`row__icon${topic.iconSrc ? " row__icon--img" : ""}`}>
          {topic.iconSrc ? (
            <img
              src={encodeIconPath(topic.iconSrc)}
              alt={topic.iconAlt ?? topic.title ?? ""}
              decoding="async"
              loading="lazy"
            />
          ) : (
            topic.icon ?? ""
          )}
        </div>

        <div className="row__titleline">
          <span className="row__title">{topic.title}</span>
          <span className="row__chev" aria-hidden="true">
            {">"}
          </span>
        </div>
      </div>

      <div className="row__toggle">
        <Toggle3 value={topicValues[index]} onChange={(v) => onTopicChange(index, v)} />
      </div>
    </div>
  );

  return (
    <div className="phone">
      {toastOpen && (
        <div className="manage-top-toast" role="status" aria-live="polite">
          Topic preference reset
        </div>
      )}
      <div className="topbar">
        <div className="topbar__status">
          <div className="status__left" />
          <div className="status__right">8:00</div>
        </div>
        <div className="topbar__toolbar">
          <button className="topbar__back" type="button" aria-label="Back" onClick={onBack}>
            ‹
          </button>
          <button
            className="toolbar__save"
            type="button"
            disabled={!hasChanges}
            aria-label="Save"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>

      <div ref={contentRef} className="content">
        <h1 ref={titleRef} className="topbar__title">
          Manage topics
        </h1>
        <div className="hint">
          <p className="hint__text">
            Customize your feed to see more or less of the content you like. Adjustments will reset
            <strong> after 7 days</strong>.
          </p>
          <a className="hint__link hint__link--primary" href="#" onClick={(e) => e.preventDefault()}>
            Learn more
          </a>
        </div>

        <div className="list">{TOPICS.map((t, i) => renderTopic(t, i))}</div>

        <div className="phone-footer">
          <button
            type="button"
            className="footer-reset"
            id="footer-reset"
            disabled={!hasAnyNonDefault}
            aria-label="Reset all"
            onClick={handleResetAll}
          >
            <svg
              className="footer-reset__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
              />
            </svg>
            <span>Reset all</span>
          </button>
          <div className="home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
