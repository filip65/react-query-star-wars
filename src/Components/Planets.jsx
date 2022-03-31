import { useQuery } from "react-query";
import Planet from "./Planet";
import { useState } from "react";

const fetchPlanets = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, page] = queryKey;
  const response = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return await response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    fetchPlanets,
    {
      keepPreviousData: true,
    }
  );

  const nextPage = () => {
    setPage((oldPage) =>
      isPreviousData || !data.next ? oldPage : oldPage + 1
    );
  };

  console.log(isPreviousData);

  return (
    <div>
      <h2>Planets</h2>

      {status === "error" && <h3>Error fetching data</h3>}

      {status === "loading" && <h3>Loading...</h3>}

      {status === "success" && (
        <>
          <div className="page-buttons">
            <button
              onClick={() =>
                setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1))
              }
              disabled={page === 1}
            >
              Previous page
            </button>
            <span>{page}</span>
            <button onClick={nextPage} disabled={isPreviousData || !data.next}>
              Next page
            </button>
          </div>
          <div>
            {data.results.map((planet) => {
              return <Planet key={planet.name} planet={planet} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
