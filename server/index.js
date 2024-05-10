import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';
import sequelize from './db.js';
import router from './routes/index.js';
import errorHandle from './middleware/ErrorHandlingMiddleware.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const staticPath = path.resolve(__dirname, 'static');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(staticPath));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandle);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  try {
    app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
