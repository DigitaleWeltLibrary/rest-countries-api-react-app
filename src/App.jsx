import { useEffect, useState } from "react";
import ControlPanel from "./components/controlPanel";
import DataView from "./components/dataView";
import Header from "./components/header";
import "./main.scss";
import InfoPage from "./components/infoPage";

export default function App() {
  //NOTE states for region and search input values, and last action performed
  const [getRegion, setRegion] = useState("");
  const [getSearch, setSearch] = useState("");
  const [getLastAction, setLastAction] = useState(null);
  const [getLink, setLink] = useState("");

  //NOTE reste filters when one of them is used, to avoid confusion and
  useEffect(() => {
    if (getLastAction === "search") setRegion(null);
    else if (getLastAction === "region") setSearch(null);
  }, [getLastAction]);

  // NOTE reset filters when the link changes
  useEffect(() => {
    setRegion(null);
    setSearch(null);
    setLastAction(null);
  }, [getLink]);

  return (
    <>
      <Header setLink={setLink} />
      {getLink == "" ? (
        <>
          <ControlPanel
            getRegion={getRegion}
            setRegion={setRegion}
            setSearch={setSearch}
            getSearch={getSearch}
            setLastAction={setLastAction}
          />
          <DataView
            getLastAction={getLastAction}
            getRegion={getRegion}
            getSearch={getSearch}
            setPageLink={setLink}
          />
        </>
      ) : (
        <InfoPage getLink={getLink} setLink={setLink} />
      )}
    </>
  );
}
