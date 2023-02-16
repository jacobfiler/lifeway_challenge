import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react";
import {Row, Col} from 'react-bootstrap';
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
        <div>
          <Row>
            <Col className='h2 text-light fw-light'>Star Wars Character Search</Col>
          </Row>
          <Row>
            <Col className='text-light fw-light'>Search below to get info on Star Wars Characters</Col>
          </Row>
        </div>
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
          <div className='text-light fw-light'>
            <Row>
              <Col className='h5'>Name: {results.name}</Col>
              <Row className='px-3'>Character Info:</Row>
              <Row className='fw-lighter'>
                <Col>Height: {results.height}</Col>
                <Col>Birth Year: {results.birth_year} </Col>
                <Col>Hair Color: {results.hair_color}</Col>
                <Col>Mass: {results.mass}</Col>
                <Col>Species: {results.species}</Col>
              </Row>
              <Row>
              </Row>
              <Row className='pt-5'>
                <Col>
                  <Row className='h5'>Films Appeared in:</Row>
                  <Row className='fw-lighter'>
                    {results.filmTitles?.map((film) => (
                      <li key={film}>{film}</li>
                    ))}
                  </Row>
                </Col>
                <Col>
                  <Row className='h5'>Starships flown:</Row>
                  <Row className='fw-lighter'>
                  {results.species === 'Droid' ? (
                  <p>*No ship records for droids</p>
                  ) : (
                results.starshipNames?.map((starship) => (
                  <li key={starship}>{starship}</li>
                  ))
                  )}
                  </Row>
                
                </Col>
              </Row>
            </Row>
          </div>
          )}
          
        </div>
      </main>
    </>
  )
}
