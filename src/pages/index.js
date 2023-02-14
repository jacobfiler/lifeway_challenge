import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';

  

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  //set state for search input and handle change
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);

 
  
  useEffect(() => {
    console.log('state change')
    getStarships();
    getFilms();
    getSpecies();
  }, [results]);
  
  const handleSearch = async () => {
    try {
      setLoading(true);
      console.log('searching...')
      const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
      setResults(response.data.results[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getFilms = async () => {
    if (results.films) {
      const filmUrls = results.films;
      const filmTitles = [];
  
      for (let i = 0; i < filmUrls.length; i++) {
        const response = await axios.get(filmUrls[i]);
        filmTitles.push(response.data.title);
      }
      setFilms(filmTitles);
    }
  };

  const getStarships = async () => {
    if (results.starships) {
      const starshipUrls = results.starships;
      const starshipNames = [];

      for (let i = 0; i < starshipUrls.length; i++) {
        const response = await axios.get(starshipUrls[i]);
        starshipNames.push(response.data.name);
      }
      setStarships(starshipNames);
    }
  };

  const getSpecies = async () => {
    if (results.species) {
      console.log('getting species')    
      //humans do not have species info, so check if undefined
      if (results.species = []) {
        setSpecies('Human');
      }
      else{
        //set species state
        const response = await axios.get(results.species[0]);
        setSpecies(response.data.name);
      }
    }
  };


  return (
    <>
      <Head>
        <title>LifeWay - Star Wars App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.searchbar}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      <button onClick={handleSearch}>Search</button> 
        </div>
        <div className={styles.results}>

          {loading ? (
            <div>Loading...</div>
          ) : (
          <div>
            <h1>{results.name}</h1>
            <h2>Height: {results.height}</h2>
            <h2>Mass: {results.mass}</h2>
            <h2>Hair Color: {results.hair_color}</h2>
            <h3>Species: {species}</h3>
            <h3>Appears In:</h3>
            <ul>
              {films.map((film) => (
                <li key={film}>{film}</li>
              ))}
            </ul>
            <h3>Starships:</h3>
            <ul>
              {starships.map((starship) => (
                <li key={starship}>{starship}</li>
              ))}
            </ul>
          </div>
          )}

        </div>
      </main>
    </>
  )
}
