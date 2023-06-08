import getRequestInstance from "../API/axios";
const spotPublicRequest = () => getRequestInstance({
    baseURL: 'https://api.binance.com',
    headers: {
      'content-type': 'application/json',
    },
  });
export default spotPublicRequest;