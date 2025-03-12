import { useEffect, useState } from "react";
import Country from './interfaces/ICountry';
import { fetchCountries } from "./services/fetchCountries";

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [sortObject, setSortObject] = useState({ key: 'name', order: 'ascending' })

    // grab all countries from the api using the service
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


    // sort just on country name, get key from e.currentTarget.id
    function sorter(e: React.MouseEvent): void {
        console.log(25, e.currentTarget.id)

        const key = e.currentTarget.id;
        const order = sortObject.order === 'ascending' ? 'descending' : 'ascending';

        // check timing of this hook
        setSortObject({ key, order })

        if (sortObject.order === "ascending" && sortObject.key === "name") {
            const sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountries(sortedCountries)
        }
        else if (sortObject.order === "descending" && sortObject.key === "name") {
            const sortedCountries = [...countries].sort((a, b) => b.name.common.localeCompare(a.name.common));
            setCountries(sortedCountries)
        } else if (sortObject.order === "ascending" && sortObject.key === "population") {
            const sortedPopulation = [...countries].sort((a, b) => a.population - b.population);
            setCountries(sortedPopulation)
        } else if (sortObject.order === "descending" && sortObject.key === "population") {
            const sortedPopulation = [...countries].sort((a, b) => b.population - a.population);
            setCountries(sortedPopulation)
        }
    }

    // note the unique id for a country is based on ISO 3166-1 alpha-2 two-letter country codes, in the api its called 'alpha2Code / cca2'

    // name, population, capital, and flag
    return (
        <div>
            <h1>ISG Countries Info Finder</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={sorter} id="name">Name ▲:▼</th>
                        <th onClick={sorter} id="population">Population</th>
                        <th onClick={sorter} id="capital">Capital</th>
                        <th onClick={sorter} id="flag">Flag</th>
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