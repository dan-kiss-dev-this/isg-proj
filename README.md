# How to run the ISG project
- Git the Clone
- Go to the root directory and run "npm install"
- In the root run "npm run dev"
- Open your browser and visit http://localhost:5173/

# General notes
- How I approached the code challenge. 
- I read the prompt to understand what is needed.
- Setup the base project using Vite.
- Loaded the RestCountries API and made an interface of the country this will help me understand what properties are available on it
- Saw the countries did not have an id and still wanted to get a alternate unique identifier I googled the properties and found 'cca2' is a code that is unique to each country so that would be my identifier.
- I made a service to grab the countries
- Made the Countries component to visually display country using React including the useState and useEffect hooks
- Originally all countries are pulled in, however the prompt is requesting 'Make a call specific to the Northern Europe subregion', went back to the api to pull northern european subregion
- Updated country list to show name, population, capital, and flag
- Saw how to use Northern Europe subregion in documentation
- Worked on the sorting feature of the table, note you will need to track if you are doing ascending or descending and then track the field as there is a different kind of sort used with text and numbers.


# React + TypeScript + Vite

- This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

