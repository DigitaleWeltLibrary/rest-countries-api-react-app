import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InfoPage({ getLink, setLink }) {
  // NOTE states for data, loading and error handling, and border country names
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getBorderNames, setBorderNames] = useState([]);


  // NOTE useEffect to fetch data from the API when the component mounts or when getLink changes
  useEffect(() => {
    const fetchData = async () => {
      if (!getLink) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${getLink}?fullText=true`,
        );
        const country = response.data[0];
        setData(country);

        if (country.borders && country.borders.length > 0) {
          const codes = country.borders.join(",");
          const borderResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name`,
          );

          setBorderNames(borderResponse.data.map((b) => b.name.common));
        } else {
          setBorderNames([]);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getLink]);

  if (loading) return <h1 className="center">Loading country details...</h1>;
  if (error || !data) return <h1 className="center">{error || "No data found"}</h1>;

  // NOTE extracting native name, currencies, and languages with fallbacks
  const nativeName = data.name.nativeName
    ? Object.values(data.name.nativeName)[0].official
    : data.name.common;

  const currencies = data.currencies
    ? Object.values(data.currencies)
        .map((c) => c.name)
        .join(", ")
    : "None";

  const languages = data.languages
    ? Object.values(data.languages).join(", ")
    : "None";

  return (
    <article className="info-page">
      <section className="back" onClick={() => setLink("")}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
        <p>Back</p>
      </section>

      <article className="info-container">
        <picture>
          <source srcSet={data.flags?.png} type="image/png" />
          <img src={data.flags?.svg} alt={data.flags?.alt} />
        </picture>
        <article className="info-details">
          <section>
            <h2>{data.name?.common}</h2>

            <section className="info-text-container">
              <div>
                <p>
                  <span>Native Name:</span> {nativeName}
                </p>
                <p>
                  <span>Population:</span> {data.population?.toLocaleString()}
                </p>
                <p>
                  <span>Region:</span> {data.region}
                </p>
                <p>
                  <span>Sub Region:</span> {data.subregion}
                </p>
                <p>
                  <span>Capital:</span> {data.capital?.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain:</span> {data.tld?.join(", ")}
                </p>
                <p>
                  <span>Currencies:</span> {currencies}
                </p>
                <p>
                  <span>Languages:</span> {languages}
                </p>
              </div>
            </section>
          </section>

          {getBorderNames.length > 0 && (
            <div className="borders">
              <h3>Border Countries:</h3>
              <div>
                {getBorderNames.map((name) => (
                  <span
                    key={name}
                    className="border-item"
                    onClick={() => setLink(name)}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </article>
    </article>
  );
}
