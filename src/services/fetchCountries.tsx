export const fetchCountries = async () => {
    // using subregion to only get Northern European countries
    const countries = await fetch('https://restcountries.com/v3.1/subregion/Northern Europe');
    console.log(countries);
    if (!countries) {
        throw new Error('Not able to fetch countries')
    }
    return countries.json();
}