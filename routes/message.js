const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/message');

// READ (ONE)
router.get('/:orderId', (req, res) => {
  Message.find({orderId: req.params.orderId})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'No such message.' });
    });
});

// UPDATE
router.post('/:orderId', (req, res) => {

  const updatedMessage = {
    message: req.body.message
  };

  Message.findOneAndUpdate({ orderId: req.params.orderId }, updatedMessage, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Message.findOne({ orderId: req.params.orderId })
        .then((newResult) => {
          res.json({
            success: true,
            msg: 'Successfully updated!',
            result: {
              _id: newResult._id,
              orderId: newResult.orderId,
              message: newResult.message
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
