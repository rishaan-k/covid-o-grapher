import React,{useState, useEffect} from 'react';
import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core"
import LineGraph from './LineGraph';

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("all")
  const [url, setURL] = useState("https://disease.sh/v3/covid-19/historical/all?lastdays=90")
  console.log(url)

  useEffect(()=> {
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));

          setCountries(countries)
        });
    };
    getCountriesData();
  },[]);


  const onCountryChange = (event) => {
    const countryCode = event.target.value
    console.log("Country stat changed to", countryCode)
    setCountry(countryCode)

    const tempurl = "https://disease.sh/v3/covid-19/historical/" + countryCode + "?lastdays=90"
    setURL(tempurl)
  };



  return (
    <div className="app">
      <link rel = "icon" href = "https://i.imgur.com/wGp8dSg.png" type = "image/x-icon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,500&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet" />
      <div className="title">
        <Card className="titlecard" variant="outlined">
          <CardContent>
        <h1>COVID-19 TRACKING GRAPH</h1>
        <br />
        <p className="byline" align="center">"the covid-o-grapher"</p>
          </CardContent>
        </Card>
      </div>
      <br/>

      {/*PARAMETERS*/}
      <div className="WholeParameterCard">
      <Card className="paracard" variant="outlined">
        <CardContent>
        <h3 align = "center">REGION SELECT</h3>
          <br />

            <div className="parameters">
             {/*country select*/}
              <div className="countryselect">
                  <FormControl className = "app__regiondropdown">
                    <Select value={country} variant = "outlined" onChange={onCountryChange}>

                      <MenuItem value = "all">All Countries</MenuItem>
                      {countries.map((country)=>(
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
              </div>


          </div>
        </CardContent>
      </Card>
      </div>

      <br/>
      {/*Graph*/}
      <div className="app__graphelement">
        <Card className="app__graphcard" variant="outlined">
          <CardContent>
          <h3 align = "center">GRAPH</h3>
          <h5 align = "center">Click a statistic on the legend to disable/enable it.</h5>
          <br />
          <LineGraph graphurl = {url}/>
          </CardContent>
        </Card>
      </div>  

      <br/>

      {/*Extra Info*/}

      <div className="app__info">
        <Card className="app__infocard" variant="outlined">
          <CardContent>
          <h3 align = "center">INFORMATION</h3><br/>
              <div className="app__infobox">
                <div className="app__infoboxtext">
                <i>"The covid-o-grapher"</i> is a project made by Rishaan.
                <br/><br/>
                I wanted to make a project related to COVID-19 in some way and I wanted to learn React.js as well, so I decided to 'kill Two Birds with One Stone' and make <i>"the covid-o-grapher."</i> I hope this is useful to anyone who uses it.
                <br/><br/>
                I plan to document the making of this website soon and a link will be posted here when it is complete.
                <br/><br/>
                You can check out my github <a href="https://github.com/rishaan-k" target="_blank">here</a> for the repository of <i>"the covid-o-grapher."</i>
                <br/><br/>
                The open source <a href="https://disease.sh" target="_blank" >disease.sh</a> API has been used for the data on <i>"the covid-o-grapher."</i>
        
                </div>
                
                <div className="app__infoboximage">
                  <img className="RishaanImage" src="https://pbs.twimg.com/profile_images/1397551585153097732/Q5lcpUkd_400x400.jpg" alt="Rishaan's profile picture"/>
                </div>

              </div>            
          </CardContent>
        </Card>
      </div>    

    </div>
  );
                      }


export default App;
