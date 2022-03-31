import { useQuery } from "react-query";
import Person from "./Person";
import { useState } from "react";

const fetchPeople = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, page] = queryKey;
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return await response.json();
};

const People = () => {
  const [page, setPage] = useState(1);

  const { data, status, isPreviousData } = useQuery(
    ["people", page],
    fetchPeople,
    {
      keepPreviousData: true,
    }
  );

  const prevPage = () => {
    setPage((oldPage) => (oldPage > 1 ? oldPage - 1 : 1));
  };

  const nextPage = () => {
    setPage((oldPage) =>
      isPreviousData || !data.next ? oldPage : oldPage + 1
    );
  };

  return (
    <div>
      <h2>People</h2>

      {status === "loading" && <h3>Error fetching data</h3>}

      {status === "loading" && <h3>Loading...</h3>}

      {status === "success" && (
        <>
          <div className="page-buttons">
            <button onClick={prevPage} disabled={page === 1}>
              Previous page
            </button>
            <span>{page}</span>
            <button onClick={nextPage} disabled={isPreviousData || !data.next}>
              Next page
            </button>
          </div>
          <div>
            {data.results.map((person) => {
              return <Person key={person.name} person={person} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
