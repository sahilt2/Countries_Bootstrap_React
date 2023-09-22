import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import CountryCard from './CountryCard';
import { initializeCountries } from '../features/countries/countriesSlice';
import Spinner from 'react-bootstrap/Spinner';


const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state)=>state.countries.countries);
  const loading = useSelector((state)=>state.countries.isLoading);
  const [search, setSearch] = useState('')

  console.log("CountriesList: ", countriesList)
  console.log("Search: ", search)

  useEffect(()=>{
    dispatch(initializeCountries())
  },[dispatch])

  console.log('loading:',loading);

 const filterCountries = countriesList.filter((country)=>country.name.common.toLowerCase().includes(search.toLocaleLowerCase()))
  console.log('filterlist: ',filterCountries);

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
       {/* reducer method */}
            {/* {countriesList.reduce((acc, country) => {
            if (country.name.official.toLowerCase().includes(search.toLowerCase())) {
             acc.push(<CountryCard key={country.name} country={country} />);
          }
          return acc;
          }, [])} */}
      {loading?(
        <Spinner animation="grow" />):(
      <Row xs={2} md={3} lg={4} className=" g-3">
     {filterCountries.map((country)=>{
      return (
        <CountryCard country ={country} key = {country.name.common}/>
      )
     })}
     </Row>
     )}
    </Container>
  );
};

export default Countries;
