import { useEffect, useMemo, useState } from "react";
import { ContentPreferencesPage } from "./ContentPreferencesPage";
import { ManageTopicsScreen } from "./ManageTopicsScreen";
import { UnsavedExitDialog } from "./UnsavedExitDialog";
import type { ToggleValue } from "./topics";
import { TOPICS } from "./topics";

function valuesEqual(a: ToggleValue[], b: ToggleValue[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

type Screen = "preferences" | "manage";

export default function App() {
  const [screen, setScreen] = useState<Screen>("preferences");
  const [topicValues, setTopicValues] = useState<ToggleValue[]>(() => TOPICS.map(() => "default"));
  const [lastSavedValues, setLastSavedValues] = useState<ToggleValue[]>(() =>
    TOPICS.map(() => "default")
  );
  const [prefsSaveToastOpen, setPrefsSaveToastOpen] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  const hasChanges = useMemo(
    () => !valuesEqual(topicValues, lastSavedValues),
    [topicValues, lastSavedValues]
  );

  /** 任一 topic 非 Default 时 Reset all 可点（与是否已保存无关） */
  const hasAnyNonDefault = useMemo(
    () => topicValues.some((v) => v !== "default"),
    [topicValues]
  );

  /** Less/More 视为已激活，用于 Content preferences 中 Manage topics 行展示 “x activated” */
  const activatedTopicCount = useMemo(
    () => topicValues.filter((v) => v !== "default").length,
    [topicValues]
  );

  const setTopicValue = (index: number, nextValue: ToggleValue) => {
    setTopicValues((prev) => {
      const next = [...prev];
      next[index] = nextValue;
      return next;
    });
  };

  const resetAll = () => {
    setTopicValues(TOPICS.map(() => "default"));
  };

  const handleSave = () => {
    if (!hasChanges) return;
    setLastSavedValues([...topicValues]);
    setScreen("preferences");
    setPrefsSaveToastOpen(true);
  };


  useEffect(() => {
    if (!prefsSaveToastOpen) return;
    const id = window.setTimeout(() => setPrefsSaveToastOpen(false), 3000);
    return () => window.clearTimeout(id);
  }, [prefsSaveToastOpen]);
  const handleBackFromManage = () => {
    if (hasChanges) setExitDialogOpen(true);
    else setScreen("preferences");
  };

  const handleExitSave = () => {
    setLastSavedValues([...topicValues]);
    setExitDialogOpen(false);
    setScreen("preferences");
    setPrefsSaveToastOpen(true);
  };

  const handleExitDontSave = () => {
    setTopicValues([...lastSavedValues]);
    setExitDialogOpen(false);
    setScreen("preferences");
  };

  return (
    <div className="stage">
      {screen === "preferences" ? (
        <ContentPreferencesPage
          onManageTopics={() => setScreen("manage")}
          manageTopicsActivatedCount={activatedTopicCount}
          showSaveToast={prefsSaveToastOpen}
          onBack={() => {
            /* 上一层设置页，演示环境无导航 */
          }}
        />
      ) : (
        <ManageTopicsScreen
          topicValues={topicValues}
          onTopicChange={setTopicValue}
          hasChanges={hasChanges}
          hasAnyNonDefault={hasAnyNonDefault}
          onSave={handleSave}
          onBack={handleBackFromManage}
          onResetAll={resetAll}
        />
      )}

      <UnsavedExitDialog
        open={exitDialogOpen}
        onSave={handleExitSave}
        onDontSave={handleExitDontSave}
      />
    </div>
  );
}
