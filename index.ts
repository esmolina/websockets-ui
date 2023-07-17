import { httpServer } from './src/http_server/http_server';

const HTTP_PORT = 3000;
const HOST = 'localhost';

console.log(
  `Start static http server on the ${HTTP_PORT} port! http://${HOST}:${HTTP_PORT} `,
);
httpServer.listen(HTTP_PORT);
