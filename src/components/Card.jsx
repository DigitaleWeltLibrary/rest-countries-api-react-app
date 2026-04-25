export const Card = ({ png, svg, alt, title, population, region, capital }) => {
  return (
    <section className="card">
      <picture>
        <source srcSet={png} type="image/png" />
        <img src={svg} alt={alt} loading="lazy" />
      </picture>

      <div>
        <h2>{title}</h2>
        <p>
          <span>Population:</span> {population}
        </p>
        <p>
          <span>Region:</span> {region}
        </p>
        <p>
          <span>Capital:</span> {capital}
        </p>
      </div>
    </section>
  );
};
