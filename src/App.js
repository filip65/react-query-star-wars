import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Planets from "./Components/Planets";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "people" && <People />}
          {page === "planets" && <Planets />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
