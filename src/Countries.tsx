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

    }, [])

    // sort just on country name
    function sorter(): void {
        // Implement sorting logic here
        const sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));

        // if (a.name.common < b.name.common) {
        //     return -1
        // } else {
        //     return 1
        // }

        setCountries(sortedCountries)
    }

    // note the unique id for a country is based on ISO 3166-1 alpha-2 two-letter country codes, in the api its called 'alpha2Code / cca2'

    // name, population, capital, and flag
    return (
        <div>
            <h1>ISG Countries Info Finder</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={sorter} >Common Name ▲:▼</th>
                        <th>Population</th>
                        <th>Capital</th>
                        <th>Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.cca2}>
                            <td>{country.name.common}</td>
                            <td>{country.population}</td>
                            <td>{country.capital?.[0]}</td>
                            <td>
                                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Countries