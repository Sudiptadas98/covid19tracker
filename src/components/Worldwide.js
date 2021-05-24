import { FormControl, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import Graph from "./Graph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import virussvg4 from "./assests/virussvg4.svg";

const Worldwide = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [cinfo, setCinfo] = useState({});
    const [mapCenter, setMapCenter] = useState({ lat: 24.80746, lng: 70.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {

        const fetchApi = async () => {
            try {
                const url = "https://disease.sh/v3/covid-19/countries"
                const res = await fetch(url);
                const data = await res.json();

                // console.log(data);
                setCountries(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchApi();

        const fetchfor1sttimeonly = async () => {
            try {
                const url = "https://disease.sh/v3/covid-19/all"
                const res = await fetch(url);
                const data = await res.json();
                setCinfo(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchfor1sttimeonly();
    }, [])

    const onChangeCountry = async (e) => {
        const countryCode = e.target.value;

        const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            // console.log(data.countryInfo.lat);
            setCountry(countryCode);
            setCinfo(data);

            countryCode === "worldwide" ? setMapCenter({ lat: 24.80746, lng: 70.4796 }) :
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);

            countryCode === "worldwide" ? setMapZoom(3) : setMapZoom(4);


        } catch (err) {
            console.log(err);
        }
    }
    // console.log(cinfo);
    // console.log(country);


    return (
        <>
            <div className="worldwidepage">
                <div className="worldwide_left">
                    <div className="leftcard">
                        <div className="tablediv">
                            <h2>Live Cases by Country</h2>
                            <Table countries={countries} />
                        </div>
                        <div className="graphdiv">
                            <h2>
                                {country === "worldwide" ? "Worldwide" : `${cinfo.country}`}
                                {casesType === "cases" ? " Active Cases" : casesType === "recovered" ? " New Recovered" : " New Deaths"}
                            </h2>
                            <Graph casesType={casesType} country={country} />
                        </div>
                    </div>
                </div>
                <div className="worldwide_right">
                    <div className="worldwideheader">
                        <div className="heading">
                            <img src={virussvg4} />
                            <h1>Covid-19-Tracker</h1>
                        </div>
                        <FormControl className="wdropdown">
                            <Select
                                variant="outlined"
                                value={country}
                                onChange={onChangeCountry}>

                                <MenuItem value="worldwide">Worldwide</MenuItem>
                                {
                                    countries.map((c) => (
                                        <MenuItem value={c.countryInfo.iso2}>{c.country}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>

                    <div className="infoboxes">
                        <Infobox
                            isActiveCases
                            active={casesType === "cases"}
                            onClick={(e) => setCasesType("cases")}
                            title={"Active Cases"}
                            number={numeral(cinfo.active).format("+0,0")}
                            today={numeral(cinfo.todayCases).format("+0,0")} />

                        <Infobox
                            isRecovered
                            active={casesType === "recovered"}
                            onClick={(e) => setCasesType("recovered")}
                            title={"Recovered"}
                            number={numeral(cinfo.recovered).format("+0,0")}
                            today={numeral(cinfo.todayRecovered).format("+0,0")} />

                        <Infobox
                            isDeaths
                            active={casesType === "deaths"}
                            onClick={(e) => setCasesType("deaths")}
                            title={"Deaths"}
                            number={numeral(cinfo.deaths).format("+0,0")}
                            today={numeral(cinfo.todayDeaths).format("+0,0")} />
                    </div>
                    <Map
                        casesType={casesType}
                        countries={countries}
                        center={mapCenter}
                        zoom={mapZoom} />

                </div>
            </div>

        </>
    )
}
export default Worldwide;