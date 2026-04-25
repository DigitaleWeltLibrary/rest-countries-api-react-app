import { useEffect, useState } from "react";
import ControlPanel from "./components/controlPanel";
import DataView from "./components/dataView";
import Header from "./components/header";
import "./main.scss";

export default function App() {
  //NOTE states for region and search input values, and last action performed
  const [getRegion, setRegion] = useState("");
  const [getSearch, setSearch] = useState("");
  const [getLastAction, setLastAction] = useState(null);

  //NOTE reste filters when one of them is used, to avoid confusion and
  useEffect(() => {
    if (getLastAction === "search") setRegion(null);
    else if (getLastAction === "region") setSearch(null);
  }, [getLastAction]);

  return (
    <>
      <Header />
      <ControlPanel
        getRegion={getRegion}
        setRegion={setRegion}
        setSearch={setSearch}
        getSearch={getSearch}
        setLastAction={setLastAction}
      />
      <DataView />
    </>
  );
}
