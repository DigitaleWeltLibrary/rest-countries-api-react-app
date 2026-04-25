import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export default function DataView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags",
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <article>
      {data.map((item) => (
        <Card
          png={item.flags.png}
          svg={item.flags.svg}
          alt={item.flags.alt}
          title={item.name.common}
          population={item.population}
          region={item.region}
          capital={item.capital}
        />
      ))}
    </article>
  );
}
