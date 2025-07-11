import React, { useCallback, useEffect, useState } from 'react'
import { getCountries } from '../../api/api';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';

import './style.css';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Home =  () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    
    const debouncedSearch = useDebounce(search, 500);
    
    const fetchCountries = useCallback(async () => {
        try {
          setLoading(true);
          const flagsData = await getCountries();
          if (flagsData && flagsData.status === 200) {
            setCountries(flagsData.data);
          } else {
            console.error('Error fetching data:', flagsData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
    }, []);

    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    useEffect(() => {
        fetchCountries();        
    }, [fetchCountries]);
  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <main className="mainContainer">
          {
            loading ? (
            <div className="loading">
                <div className="loader"></div>
            </div>
            ) : (
              debouncedSearch === '' ? (
                countries.map((country, index) => {
                  return(
                    <Card key={index} country={country} />
                  )
                })
              ) : filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => {
                  return(
                    <Card key={index} country={country} />
                  )
                })
              ) : (
                <></>
              )
            )
          }
      </main>
    </>
  )
}

export default Home