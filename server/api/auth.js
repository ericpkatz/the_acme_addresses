const express = require('express');
const app = express.Router();
const { User, Address } = require('../db');
const { isLoggedIn } = require('./middleware');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/register', async(req, res, next)=> {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/addresses', isLoggedIn, async(req, res, next)=> {
  try {
    res.send(await Address.create({...req.body, userId: req.user.id }));
  }
  catch(ex){
    next(ex);
  }
});


app.delete('/addresses/:id', isLoggedIn, async(req, res, next)=> {
  try {
    const address = await Address.findByPk(req.params.id);
    await address.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user); 
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', isLoggedIn, async(req, res, next)=> {
  try {
    const user = req.user;
    //define the properties a user can change
    await user.update(req.body);
    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});
