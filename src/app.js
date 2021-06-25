const fs = require('fs');
const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname, './public/css')));
app.use('/js', express.static(path.join(__dirname, './public/js')));
app.use(bodyParser.urlencoded({ extended: false }))
const accountData = fs.readFileSync('src/json/accounts.json', {encoding:'utf8'});
const accounts = JSON.parse(accountData);
console.log('account information: ',accounts);

const userData = fs.readFileSync('src/json/users.json', {encoding:'utf8'});
const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts: accounts
  });
} );

app.get('/savings', (req, res)=> {
  res.render('account', {
    account: accounts.savings
  })
});

app.get('/checking', (req, res)=> {
  res.render('account', {
    account: accounts.checking
  })
});

app.get('/credit', (req, res)=> {
  res.render('account', {
    account: accounts.credit
  })
});

app.get('/transfer', (req, res)=> {
  res.render('transfer')
})
  .post('/transfer', (req, res) => {
    const {from, to, amount } = req.body;
    const fromOriginalBalance = accounts[from].balance
    const newFromBalance = fromOriginalBalance - amount;
    accounts[from].balance = newFromBalance;

    const newToBalance = accounts[to].balance + parseInt(amount);
    accounts[to].balance = newToBalance;

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(
      path.join(__dirname, './json/accounts.json'), 
      accountsJSON, 
      'utf8'
    );
    res.render('transfer', { message: 'Transfer Completed' })
  });

  app.get('/payment', (req, res) => {
    res.render('payment', { account: accounts.credit })
  })
  .post('/payment', (req, res) => {
    const {from, to, amount } = req.body;
    accounts.credit.balance -= amount;
    accounts.credit.available += parseInt(amount);
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(
      path.join(__dirname, './json/accounts.json'), 
      accountsJSON, 
      'utf8'
    );
    res.render('payment', { message: "Payment Successful", account: accounts.credit })
  })


app.get(`/profile`, (req, res)=> {
  res.render('profile', {
    user: users[0]
  })
})

app.listen( port, () => {
  console.log(`PS Project Running on port ${3000}!`);
})