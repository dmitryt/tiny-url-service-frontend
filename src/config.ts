const {
  REACT_API_URL
} = process.env;

type Config = {
  apiUrl: string;
  storageKey: string;
};

const config: Config = {
  apiUrl: REACT_API_URL || 'http://localhost:8082/api/v1',
  storageKey: 'tiny-url-store',
};

export default config;