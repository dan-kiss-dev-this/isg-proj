import { useEffect, useState } from "react";
import Country from './interfaces/ICountry';
import { fetchCountries } from "./services/fetchCountries";

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    // grab all countires from the api using the service
    useEffect(() => {
        const getCountries = async () => {
            try {
                const countriesData = await fetchCountries()
                setCountries(countriesData);
            } catch (error) {
                console.log(error)
            }
        }
        getCountries()

    }, [countries])
    // note the unique id for a country is based on ISO 3166-1 alpha-2 two-letter country codes, in the api its called 'alpha2Code / cca2'
    return (
        <div>
            <h1>Countries</h1>
            <ul>
                {countries.map((country) => <li key={country.cca2}>{country?.name?.common}</li>)}

            </ul>
        </div>
    )
}

export default Countries