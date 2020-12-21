import express from 'express';
import passport from 'passport';
import { config } from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import passportConfig from './config/passport.config';

config();

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));
