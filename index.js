const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express()
const port = 3000

app.use(bodyParser.json());

const users = [
{
  "id": uuidv4(),
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice.smith@gmail.com",
  "dateOfBirth": "1997-10-31",
  "emailVerified": true,
  "signUpDate": "2019-08-24"
},
{
  "id": uuidv4(),
  "firstName": "Pekka",
  "lastName": "Karhu",
  "email": "pekka.karhu@gmail.com",
  "dateOfBirth": "1985-11-21",
  "emailVerified": true,
  "signUpDate": "2014-08-14"
}
];

const listings = [
    { 
        "id": uuidv4(),
        "description": "nice les paul",
        "price": 1000,
        "sold": false,
        "date": "2022-03-14",
        "title": "selling guitar",
        "location": "Helsinki"

      },
      { 
        "id": uuidv4(),
        "description": "runs like a new car",
        "price": 7000,
        "sold": true,
        "date": "2022-02-24",
        "title": "selling car",
        "location": "Tampere"
      }
];
app.get('/listings', (req, res) => {
  res.json(listings);
})

app.get('/listings/:listingsid', (req, res) => {
    //console.log(req.params);
    let foundIndex = -1;
    for (let i =0; i <listings.length; i++){
        if(listings[i].id == req.params.listingsid){
            foundIndex =i;
            break;
        }
    }
    
    if(foundIndex == -1){
        res.sendStatus(404); 
        return;
    } else {
        res.json(listings[foundIndex]);
    }
})
app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:userId', (req, res) => {
    let foundIndex = -1;
    for (let i =0; i < users.length; i++){
        if(users[i].id == req.params.userId){
            foundIndex =i;
            break;
        }
    }
    
    if(foundIndex == -1){
        res.sendStatus(404); 
        return;
    } else {
        res.json(users[foundIndex]);
    }
})
app.delete('/listings/:listingsid', (req, res) => {
    let foundIndex = listings.findIndex(t => t.id === req.params.listingsid);

    if(foundIndex == -1){
        res.sendStatus(404);
        return;
    } else {
        listings.splice(foundIndex, 1);
        res.sendStatus(202);
    }
})
app.delete('/users/:userId', (req, res) => {
    let foundIndex = users.findIndex(t => t.id === req.params.userId);

    if(foundIndex == -1){
        res.sendStatus(404);
        return;
    } else {
        listings.splice(foundIndex, 1);
        res.sendStatus(202);
    }
})
app.put('/listings/:listingsid', (req, res) => {
    let foundListings = listings.find(t => t.id === req.params.listingsid);
    if(foundListings) {
        foundListings.description = req.body.description;
        foundListings.date = req.body.date;
        foundListings.price = req.body.price;
        foundListings.sold = req.body.sold;
        foundListings.title = req.body.title;
        foundListings.location = req.body.location;
        res.sendStatus(202);
    }
    else{
        res.sendStatus(404);
    }
})
app.post('/listings',(req, req) =>{
    console.log(req.body);
    listings.push({
        id: uuidv4(),
        description: req.body.description,
        date: req.body.date,
        price: req.body.price,
        sold: req.body.sold,
        title: req.body.title,
        location: req.body.location

    });
    res.sendStatus(201);
});
app.post('/users',(req, req) =>{
    console.log(req.body);
    listings.push({
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        emailVerified: req.body.emailVerified,
        signUpDate: req.body.signUpDate
    });
    res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})