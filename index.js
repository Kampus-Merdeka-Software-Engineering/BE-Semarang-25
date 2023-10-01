// import db from './config/database.js';
import express from 'express';
import UserRouter from './routes/UserRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Helloooooooo')
})

app.use(UserRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


