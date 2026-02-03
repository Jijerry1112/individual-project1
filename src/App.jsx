import { useState } from "react";
import "./App.css";

import GameTable from "./components/GameTable";
import DealerArea from "./components/DealerArea";
import PlayerArea from "./components/PlayerArea";
import ActionBar from "./components/ActionBar";
import SettingsModal from "./components/SettingsModal";

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <GameTable>
        <DealerArea />
        <PlayerArea />
        <ActionBar onOpenSettings={() => setShowSettings(true)} />
      </GameTable>

      <SettingsModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}