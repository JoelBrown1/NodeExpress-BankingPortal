const fs = require('fs');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname, './public/css')));
app.use('/js', express.static(path.join(__dirname, './public/js')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index'
  })
} )

app.listen( port, () => {
  console.log(`PS Project Running on port ${3000}!`);
})