import React from 'react'
import { Box, Card, Flex, Avatar, Text } from "@radix-ui/themes";
import Country from './interfaces/ICountry';

interface ICountryCardProps {
    country: Country;
}

export const CountryCard: React.FC<ICountryCardProps> = ({ country }) => {
    const name = country.name.common;
    const population = country.population;
    const capital = country.capital?.[0];
    const flag = country.flags.svg;
    const alt = `Flag of ${country.name.common}`;

    return (
        <Box >
            <Card>
                <Flex gap="3" align="center">
                    <img src={flag} alt={alt} width="50" />
                    {/* <Avatar
                        size="3"
                        src={flag}
                        radius="small"
                        fallback="T"
                    /> */}
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            {name}
                        </Text>

                    </Box>
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            {population}
                        </Text>
                    </Box>
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            {capital}
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </Box>
    )
}
