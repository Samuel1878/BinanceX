import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '2ebad97563msh9ab84284298e633p12a16cjsnd20f2d3f24a4',
    'X-RapidAPI-Host':'coinranking1.p.rapidapi.com',
    "Content-Type": "application/vnd.api+json"
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoAPI = createApi({
    reducerPath:"cryptoAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://coinranking1.p.rapidapi.com"}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query: (count) => (createRequest(`/coins?limit=${count}`))   
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
          }),
        
    }),
})
export const {useGetCryptosQuery} = cryptoAPI;
