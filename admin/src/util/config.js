const configs = {
  development: {
    SERVER_URI: 'http://localhost:7080',
  },
  production: {
    SERVER_URI: 'https://ioi.server.elisv.com',
  },
};

export default configs[process.env.REACT_APP_ENV];
