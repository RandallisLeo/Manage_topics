export type ContentPreferencesPageProps = {
  onManageTopics: () => void;
  /** 当前为 Less 或 More 的 topic 数量；>0 时在 Manage topics 行展示 “x activated” */
  manageTopicsActivatedCount: number;
  onBack: () => void;
  showSaveToast: boolean;
};

type Row = {
  title: string;
  /** 图二：STEM / Restricted 为 Off + 右箭头 */
  trailing?: "chevron" | "offChevron";
};

/** 顺序与图二 / 设计稿一致：Filter keywords → … → Mute accounts（不含 Sensitive content） */
const ROWS: Row[] = [
  { title: "Filter keywords", trailing: "chevron" },
  { title: "STEM feed", trailing: "offChevron" },
  { title: "Restricted Mode", trailing: "offChevron" },
  { title: "Manage topics", trailing: "chevron" },
  { title: "Refresh your For You Feed", trailing: "chevron" },
  { title: "Mute accounts", trailing: "chevron" }
];

function ChevronRight() {
  return (
    <span className="prefs-row__chev" aria-hidden="true">
      <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 3L6 8l-3.5 5"
          stroke="rgba(0,0,0,0.34)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ChevronLeft() {
  return (
    <svg
      className="prefs-nav__back-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Figma: Content preferences 8255:236962
 */
export function ContentPreferencesPage({
  onManageTopics,
  manageTopicsActivatedCount,
  onBack,
  showSaveToast
}: ContentPreferencesPageProps) {
  return (
    <div className="phone phone--prefs">
      {showSaveToast && (
        <div className="manage-top-toast prefs-top-toast" role="status" aria-live="polite">
          Preference updated
        </div>
      )}
      <div className="topbar">
        <div className="topbar__status">
          <div className="status__left" />
          <div className="status__right">8:00</div>
        </div>
        <div className="prefs-nav">
          <div className="prefs-nav__leading">
            <button className="prefs-nav__back" type="button" aria-label="Back" onClick={onBack}>
              <ChevronLeft />
            </button>
          </div>
          <h1 className="prefs-nav__title">Content preferences</h1>
          <div className="prefs-nav__trailing" aria-hidden="true" />
        </div>
      </div>

      <div className="content content--prefs">
        <div className="prefs-list">
          {ROWS.map((row) => {
            const isManage = row.title === "Manage topics";
            const onActivate = () => {
              if (isManage) onManageTopics();
            };
            return (
              <button
                key={row.title}
                type="button"
                className={`prefs-row${isManage ? "" : " prefs-row--static"}`}
                onClick={onActivate}
              >
                <span className="prefs-row__label">{row.title}</span>
                <span className="prefs-row__trailing">
                  {row.trailing === "offChevron" && (
                    <>
                      <span className="prefs-row__off">Off</span>
                      <ChevronRight />
                    </>
                  )}
                  {row.trailing === "chevron" && (
                    <>
                      {isManage && manageTopicsActivatedCount > 0 && (
                        <span className="prefs-row__off">
                          {manageTopicsActivatedCount} activated
                        </span>
                      )}
                      <ChevronRight />
                    </>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="prefs-home-indicator-wrap">
        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
