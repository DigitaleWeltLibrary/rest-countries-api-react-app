import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ControlPanel() {
  //NOTE regions for select options
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <section className="control-panel">
      <section>
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search for a country..." />
      </section>

      <select name="" id="">
        <option value="" disabled selected>
          Filter by Region
        </option>
        {regions.map((region) => (
          <option value={region}>{region}</option>
        ))}
      </select>
    </section>
  );
}
