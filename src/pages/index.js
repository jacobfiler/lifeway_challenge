import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react";
//import {Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

  

const inter = Inter({ subsets: ['latin'] })

export default function Home() {



  //set state for search input and handle change
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);



  
  const handleSearch = async () => {
      setLoading(true);
      console.log('searching...')
      let character = {};
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
        character = response.data.results[0];
      }
      catch (error) {
        console.error(error);
      }

      //get species info from species url

      if (character.species) {

        //check if species array is empty
        if (character.species.length === 0) {
          character.species = 'Human';
        } else {
          const speciesUrl = character.species[0];
          try {
                const response = await axios.get(speciesUrl);
                character.species = response.data.name;
          }
          catch (error) {
            console.error(error);
          }
        }

      //get film info from film urls
      if (character.films) {
        const filmUrls = character.films;
        const filmTitles = [];
        for (let i = 0; i < filmUrls.length; i++) {
          try {
            const response = await axios.get(filmUrls[i]);
            filmTitles.push(response.data.title);
          }
          catch (error) {
            console.error(error);
          }
        }
        character.filmTitles = filmTitles;
      }
      //get starship info from starship urls
      if (character.starships) {
        const starshipUrls = character.starships;
        const starshipNames = [];
  
        for (let i = 0; i < starshipUrls.length; i++) {
          try
          {
            const response = await axios.get(starshipUrls[i]);
            starshipNames.push(response.data.name);
          }
          catch (error) {
            console.error(error);
          }
        }
        character.starshipNames = starshipNames;
      }
      console.log(character);
      setResults(character);
      setLoading(false);
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
          <div className='text-light'>
            
            <h1>{results.name}</h1>
            <h2>Height: {results.height}</h2>
            <h2>Mass: {results.mass}</h2>
            <h2>Hair Color: {results.hair_color}</h2>
            <h3>Species: {results.species}</h3>
            <h3>Appears In:</h3>
            
            <ul>
              {results.filmTitles?.map((film) => (
                <li key={film}>{film}</li>
              ))}
            </ul>
            <h3>Starships:</h3>
            <ul>
              {results.species === 'Droid' ? (
                <p>*No ship records for droids</p>
                ) : (
              results.starshipNames?.map((starship) => (
                <li key={starship}>{starship}</li>
              ))
              )}
            </ul>
          </div>
          )}

        </div>
      </main>
    </>
  )
}
