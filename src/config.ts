const {
  REACT_API_URL
} = process.env;

type Config = {
  apiUrl: string;
};

const config: Config = {
  apiUrl: REACT_API_URL || 'http://localhost:8082/api',
};

export default config;