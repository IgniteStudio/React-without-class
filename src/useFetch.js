import { useState, useEffect } from "react";

const useFetch = (url) => {
  // all the useState methods
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((response) => {
          console.log(response);

          if (!response.ok) {
            throw new Error("could not fetch the data for that resource");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null); // clears all prior errors
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false); // clears loading caption because it found an error
            setError(error.message); // sets error to the error message
          }
        });
    }, 500);

    return () => abortCont.abort();
  }, [url]); //used as a dependency/parameter for the function
  return { data, isPending, error };
};

export default useFetch;
