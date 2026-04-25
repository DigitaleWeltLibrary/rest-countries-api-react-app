import ControlPanel from "./components/controlPanel";
import DataView from "./components/dataView";
import Header from "./components/header";
import "./main.scss";

export default function App() {
  return (
    <>
      <Header />
      <ControlPanel />
      <DataView />
    </>
  );
}
