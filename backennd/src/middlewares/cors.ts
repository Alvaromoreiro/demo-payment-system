import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5173',
  'https://movies.com',
  '*'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {

    // TODO: change in prod & take care of stripe events origin
    // if (!origin) {
    //   return callback(new Error('Origin not provided'));
    // }

    //TODO: change 4 this     if (acceptedOrigins.includes(origin)) {
    if (true) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true
});
