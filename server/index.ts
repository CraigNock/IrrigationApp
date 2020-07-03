import * as path from "path";
import cors from "cors";
import express from 'express';
import setup from './routes/setup'
const PORT = process.env.PORT || 4000;

const app : express.Application = express()

app.use(express.json());

app.use(cors())
  .use(function (req : express.Request , res : express.Response, next : express.NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })

app.use(setup);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + PORT);
});