import { useEffect, useState } from "react";
import Country from './interfaces/ICountry';
import { fetchCountries } from "./services/fetchCountries";
import Loader from "./Loader";
import './Countries.css'

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [sortObject, setSortObject] = useState<{ key: string, order: string }>({ key: 'name', order: 'ascending' })
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getCountries = async () => {
        try {
            const countriesData = await fetchCountries()
            const sortedCountries = [...countriesData].sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountries(sortedCountries);
            setLoading(false)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const sortCountries = () => {
        const sortedCountries: Country[] = [...countries];
        if (sortObject.order === "ascending" && sortObject.key === "name") {
            sortedCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        }
        else if (sortObject.order === "descending" && sortObject.key === "name") {
            sortedCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
        } else if (sortObject.order === "ascending" && sortObject.key === "population") {
            sortedCountries.sort((a, b) => a.population - b.population);
        } else if (sortObject.order === "descending" && sortObject.key === "population") {
            sortedCountries.sort((a, b) => b.population - a.population);
        }
        setCountries(sortedCountries)
    }

    // used with search input
    const filterCountries = () => {
        setFilteredCountries(countries.filter(country =>
            country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    }

    // used with buttons to sort
    const adjustSortObject = (e: React.MouseEvent): void => {
        const key = e.currentTarget.id;
        // sort logic adjusted to always start in ascending as you move to a new key
        const order = (sortObject.order === 'ascending' && key === sortObject.key) ? 'descending' : 'ascending';
        setSortObject({ key, order })
    }

    // grab all countries from the api using the service
    useEffect(() => {
        getCountries()
    }, [])

    // this hook is trigged by clicking the sort arrows
    useEffect(() => {
        sortCountries()
    }, [sortObject])

    // this hook is trigged by typing in the search input
    useEffect(() => {
        filterCountries()
    }, [searchQuery])

    // name, population, capital, and flag
    return (
        loading ? <Loader />
            :
            (<div id="countries">
                <h1>ISG Countries Info Finder</h1>
                <label htmlFor="find">Search for a country</label>
                <input
                    type="text"
                    id="find"
                    placeholder="Search for a country"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.currentTarget.value)}
                />
                <table id="countriesTable">
                    <thead>
                        <tr>
                            <th onClick={adjustSortObject} id="name">
                                <button className={sortObject.key === "name" ? "highlight" : ""}>Name {sortObject.key === "name" ? (sortObject.order === 'ascending' ? '▼' : '▲') : '▼▲'}</button>
                            </th>
                            <th onClick={adjustSortObject} id="population">
                                <button className={sortObject.key === "population" ? "highlight" : ""}>Population{sortObject.key === "population" ? (sortObject.order === 'ascending' ? '▼' : '▲') : '▼▲'}</button>
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
            </div>)
    )
}

export default Countries