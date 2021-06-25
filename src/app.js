const fs = require('fs');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname, './public/css')));
app.use('/js', express.static(path.join(__dirname, './public/js')));

const accountData = fs.readFileSync('src/json/accounts.json', {encoding:'utf8'});
const accounts = JSON.parse(accountData);
console.log('what is in accounts: ', accounts);
const accountKeys = Object.keys(accounts);

const userData = fs.readFileSync('src/json/users.json', {encoding:'utf8'});
const users = JSON.parse(userData);
console.log('these are our users: ', users);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts
  });
} );

accountKeys.forEach(key => {
  app.get(`/${accounts[key]['unique_name']}`, (req, res)=> {
    res.render('account', {
      account: accounts[key]
    })
  });
})

app.get(`/profile`, (req, res)=> {
  res.render('profile', {
    user: users[0]
  })
})

app.listen( port, () => {
  console.log(`PS Project Running on port ${3000}!`);
})