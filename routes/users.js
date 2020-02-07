const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

// READ (ONE)
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'No such user.' });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// UPDATE
router.put('/:id', (req, res) => {

  const updatedMessage = {
    name: 'Joey',
    orderId: '1'
  };

  Message.findOneAndUpdate({ _id: req.params.id }, updatedMessage, { context: 'query' })
    .then((oldResult) => {
      Message.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: 'Successfully updated!',
            result: {
              _id: newResult._id,
              name: newResult.name
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'update fail.' });
    });
});

module.exports = router;
