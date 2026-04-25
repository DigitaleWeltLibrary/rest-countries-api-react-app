import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ControlPanel({
  getRegion,
  setRegion,
  setSearch,
  getSearch,
  setLastAction,
}) {
  //NOTE regions for select options
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const searchInputHandler = (value) => {
    setSearch(value.replace(/\s/g, ""));
    if (getRegion !== "") {
      setRegion("");
      setLastAction("search");
    }
  };

  return (
    <section className="control-panel">
      <section>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={(e) => searchInputHandler(e.target.value)}
          value={getSearch || ""}
        />
      </section>

      <select
        value={getRegion || ""}
        onChange={(e) => {
          setRegion(e.target.value);
          setLastAction("region");
        }}
      >
        <option value="" disabled>
          Filter by Region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </section>
  );
}
