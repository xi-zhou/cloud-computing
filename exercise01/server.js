// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      { method: 'GET', path: '/api', description: 'Describes all available endpoints' },
      { method: 'GET', path: '/api/profile', description: 'Data about me' },
      { method: 'GET', path: '/api/books/', description: 'Get All books information' },
      { method: 'POST', path: '/api/books/', description: 'Add a book information into database' },
      { method: 'PUT', path: '/api/books/:id', description: 'Update a book information based upon the specified ID' },
      { method: 'DELETE', path: '/api/books/:id', description: 'Delete a book based upon the specified ID' }
    ]
  })
});

app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Xi Zhou',
    'homeCountry': 'disneyland',
    'degreeProgram': '',//informatics or CSE.. etc
    'email': 'xxi.zhou@tum.de',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'de',
    'hobbies': 'slepping'

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});
/*
 * Add a book information into database
 */
app.post('/api/books/', (req, res) => {

  /*
   * New Book information in req.body
   */
  console.log(req.body);
  /*
     * use the books model and create a new object
     * with the information in req.body
     */
  db.books.create(req.body, (err, newBook) => {
    if (err) throw err;
    /*
     * return the new book information object as json
     */
    res.json(newBook);
  });

});

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);
  db.books.findOneAndUpdate({ _id: bookId }, bookNewData, { new: true }, (err, book) => {
    if (err) throw err;
    res.json(book);
  });

});
/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;
  db.books.findOneAndRemove(bookId, function (err, book) {
    if (err) throw err;
    res.json(book);
  });
});


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log('Express server is up and running on http://localhost:80/');
});
