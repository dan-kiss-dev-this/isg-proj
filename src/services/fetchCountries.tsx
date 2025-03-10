export const fetchCountries = async () => {
    const countries = await fetch('https://restcountries.com/v3.1/all');
    console.log(countries);
    if(!countries) {
        throw new Error('Not able to fetch countries')
    }
    return countries.json();
}