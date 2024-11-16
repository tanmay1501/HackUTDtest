import axios from 'axios';
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// REST API URL
const REST_API_URL = 'http://localhost:5000/api/weather';

// GraphQL API URL
// const GRAPHQL_API_URL = 'http://localhost:5000/graphql';

// REST API call
export const fetchWeatherREST = async (date, time) => {
  try {
    const response = await axios.get(REST_API_URL, {
      params: { date, time },
    });
    console.log(response.data);

    return response.data.weather || response.data.error;
  } catch (error) {
    return { error: error.message };
  }
};

// GraphQL API call
// export const fetchWeatherGraphQL = async (date, time) => {
//   const client = new ApolloClient({
//     uri: GRAPHQL_API_URL,
//     cache: new InMemoryCache(),
//   });

//   const query = gql`
//     query ($date: String!, $time: String!) {
//       weather(date: $date, time: $time)
//     }
//   `;

//   try {
//     const response = await client.query({
//       query,
//       variables: { date, time },
//     });
//     return response.data.weather;
//   } catch (error) {
//     return { error: error.message };
//   }
// };
