import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export default function DataView({
  getLastAction,
  getRegion,
  getSearch,
  setPageLink,
}) {
  //NOTE states for data, loading and error handling, and link for the API endpoint
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [link, setLink] = useState("");

  //NOTE useEffect to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let endpoint = "all";
      const queryParams = "?fields=name,capital,region,population,flags";

      if (getLastAction === "search" && getSearch)
        endpoint = `name/${getSearch}`;
      else if (getLastAction === "region" && getRegion)
        endpoint = `region/${getRegion}`;

      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/" + endpoint + queryParams,
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        if (err.response?.status === 404) setData([]);
        else setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timer);
  }, [getSearch, getRegion, getLastAction]);

  if (loading)
    return (
      <h1 className="center">We are currently searching for the data related to this query...</h1>
    );
  if (error)
    return (
      <h1 className="center">
        Oops - a mistake happened
        <br />
        {error}
      </h1>
    );
  if (data.length === 0) return <h1 className="center">No data was found for the filter.</h1>;

  return (
    <article>
      {data.map((item, index) => (
        <Card
          key={item.name.common}
          png={item.flags.png}
          svg={item.flags.svg}
          alt={item.flags.alt}
          title={item.name.common}
          population={item.population}
          region={item.region}
          capital={item.capital}
          setPageLink={setPageLink}
        />
      ))}
    </article>
  );
}
