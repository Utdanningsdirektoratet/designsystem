import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import Handlebars from 'handlebars';
import { buildData } from './data.js';

const app = express();
const port = Number(process.env.PORT) || 3000;
const template = Handlebars.compile(
  fs.readFileSync(path.join(import.meta.dirname, 'index.html'), 'utf8'),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  }),
);

app.get('/', (request, response) => {
  response.send(template(buildData(request.query.culture)));
});

app.get('/style.css', (_request, response) => {
  response.sendFile(path.join(import.meta.dirname, 'style.css'));
});
app.get('/script.js', (_request, response) => {
  response.sendFile(path.join(import.meta.dirname, 'script.js'));
});
app.get('/css/theme/dist/index.css', (_request, response) => {
  response.sendFile(
    path.join(import.meta.dirname, '../../@udir-design/theme/dist/index.css'),
  );
});
app.get('/css/digdir/dist/src/index.css', (_request, response) => {
  response.sendFile(
    path.join(
      import.meta.dirname,
      'node_modules/@digdir/designsystemet-css/dist/src/index.css',
    ),
  );
});
app.get('/css/udir/dist/components.css', (_request, response) => {
  response.sendFile(
    path.join(
      import.meta.dirname,
      '../../@udir-design/css/dist/components.css',
    ),
  );
});
app.get('/css/udir/dist/icons.css', (_request, response) => {
  response.sendFile(
    path.join(import.meta.dirname, '../../@udir-design/css/dist/icons.css'),
  );
});

app.listen(port, () => {
  console.log(`Cookie example: http://localhost:${port}`);
});
