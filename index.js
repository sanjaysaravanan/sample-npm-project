import express from 'express';
import { MongoClient } from 'mongodb';

import moviesJson from './movies.js';

const app = express();

const MONGO_URI = "mongodb://localhost:27017";

const MONGO_URI_CLOUD = 'mongodb+srv://sanjaysaravanan:t7M9FwoRryTPhNny@cluster0.ef0xa80.mongodb.net/?retryWrites=true&w=majority'
// password: 1TKeZShV5qwfE3dH, userName: sanjaysaravanan1997

const client = new MongoClient(MONGO_URI_CLOUD);

// Top/Global Level await
await client.connect();
console.log("Connected to MongoDB");


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/movie', async function (req, res) {
  const movie = await client.db('test-compass').collection('movies').findOne({ name: 'PS2' });
  movie ? res.send(movie) : res.send({ msg: 'Movie Not Found' })
})

app.get('/movies', async function (req, res) {
  const movies = await client.db('test-compass').collection('movies').find({}).toArray();
  movies ? res.send(movies) : res.send({ msg: 'Movie Not Found' })
})

app.post('/create-movies', async function (req, res) {
  const movies = await client.db('test-compass').collection('movies').insertMany(moviesJson);
  movies ? res.send(movies) : res.send({ msg: 'Movie Not Found' })
})


app.listen(3000, () => {
  console.log('Started Express Server in port: 3000');
})