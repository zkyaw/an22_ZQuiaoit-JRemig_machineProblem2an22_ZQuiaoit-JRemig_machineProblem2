// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../auth');

// Route for user registration
router.post('/register', (req, res) => {
  userControllers.registerUser(req.body)
  .then(resultFromController => res.send(resultFromController))
});

// Route for user authentication
router.post('/login', (req, res) => {
  userControllers.loginUser(req.body)
  .then(resultFromController => res.send(resultFromController))
});

router.get('/userDetails/:id', auth.verify, (req, res) => {
  const userData = auth.decode(req.headers.authorization);
  userControllers.getProfile({ userId: userData.id })
    .then((resultFromController) => {
      res.send(resultFromController);
    })
    .catch((error) => {
      res.status(500).send('Error retrieving user profile');
    });
});

router.post('/checkout', auth.verify, (req, res) => {
  userControllers.createOrder(req.headers.authorization, req.body).then((resultFromController) => {
    if (resultFromController) {
      res.send(resultFromController);
    } else {
      res.status(401).send('Unauthorized');
    }
  });
});

router.put('/setAsAdmin/:id', auth.verify, auth.isAdmin, (req, res) => {
  userControllers.setUserAsAdmin(req.params.userId).then((resultFromController) => {
    if (resultFromController) {
      res.send(resultFromController);
    } else {
      res.status(404).send('User not found');
    }
  });
});

module.exports = router;