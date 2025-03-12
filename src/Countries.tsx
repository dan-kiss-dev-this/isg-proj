import { useEffect, useState } from "react";
import Country from './interfaces/ICountry';
import { fetchCountries } from "./services/fetchCountries";
import './Countries.css'

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [sortObject, setSortObject] = useState<{ key: string, order: string }>({ key: 'name', order: 'ascending' })
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])

    // grab all countries from the api using the service
    useEffect(() => {
        const getCountries = async () => {
            try {
                const countriesData = await fetchCountries()
                const sortedCountries = [...countriesData].sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(sortedCountries);
            } catch (error) {
                console.log(error)
            }
        }

        getCountries()
    }, [])

    // this hook was added so that react will run the logic below only after the sortObject state has been updated. This avoids a timing issue where the sortObject state is not updated and the logic below runs which would appear to be a bug to the user.
    useEffect(() => {
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
    }, [sortObject])

    useEffect(() => {
        setFilteredCountries(filterCountries())
    }, [searchQuery])


    // sort just on country name, get key from e.currentTarget.id
    function sorter(e: React.MouseEvent): void {
        console.log(25, e.currentTarget.id)

        const key = e.currentTarget.id;
        // sort logic adjusted to always start in ascending as you move to a new key
        const order = (sortObject.order === 'ascending' && key === sortObject.key) ? 'descending' : 'ascending';

        // check timing of this hook
        setSortObject({ key, order })
    }

    // find a country based on name
    function filterCountries() {
        return countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // note the unique id for a country is based on ISO 3166-1 alpha-2 two-letter country codes, in the api its called 'alpha2Code / cca2'

    // name, population, capital, and flag
    return (
        <div>
            <h1>ISG Countries Info Finder</h1>
            <label htmlFor="text">Search for a country</label>
            <input
                type="text"
                placeholder="Search for a country"
                value={searchQuery}
                onChange={e => setSearchQuery(e.currentTarget.value)}
            />
            <table id="countriesTable">
                <thead>
                    <tr>
                        <th onClick={sorter} id="name">
                            <button>Name ▼▲</button>
                        </th>
                        <th onClick={sorter} id="population">
                            <button>Population ▼▲</button>
                        </th>
                        <th id="capital">Capital</th>
                        <th id="flag">Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCountries.length === 0 ? countries.map((country) => (
                        <tr key={country.cca2}>
                            <td>{country.name.common}</td>
                            <td>{country.population}</td>
                            <td>{country.capital?.[0]}</td>
                            <td>
                                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />
                            </td>
                        </tr>
                    ))
                        :
                        filteredCountries.map((country) => (
                            <tr key={country.cca2}>
                                <td>{country.name.common}</td>
                                <td>{country.population}</td>
                                <td>{country.capital?.[0]}</td>
                                <td>
                                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Countries