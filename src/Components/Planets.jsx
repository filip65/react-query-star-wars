import { useQuery } from "react-query";
import Planet from "./Planet";
import { useState } from "react";

const fetchPlanets = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const response = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return await response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(["planets", page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>

      {status === "error" && <h3>Error fetching data</h3>}

      {status === "loading" && <h3>Loading...</h3>}

      {status === "success" && (
        <div>
          <div className="page-buttons">
            {[1, 2, 3, 4, 5, 6].map((index) => {
              return <button onClick={() => setPage(index)}>{index}</button>;
            })}
          </div>

          {data.results.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Planets;
