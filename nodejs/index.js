const App = require('./app');

const app = new App();

app.addGetHandler('/books', (req, res)=> {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end('get request');
})

app.addPostHandler('/books', (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end('post request')
})


app.addDeleteHandler('/books/:id', (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain");
  res.end('delete request')
})

app.addPutHandler('/books/:id', (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain");
  res.end('put request')
})


app.run()
