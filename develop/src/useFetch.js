import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        console.log("fetched")
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetch;