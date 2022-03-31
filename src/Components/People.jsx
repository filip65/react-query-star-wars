import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const response = await fetch("http://swapi.dev/api/people");
  return await response.json();
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople);

  return (
    <div>
      <h2>People</h2>

      {status === "loading" && <h3>Error fetching data</h3>}

      {status === "loading" && <h3>Loading...</h3>}

      {status === "success" && (
        <div>
          {data.results.map((person) => {
            return <Person key={person.name} person={person} />;
          })}
        </div>
      )}
    </div>
  );
};

export default People;
