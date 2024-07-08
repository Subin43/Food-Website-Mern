const express = require('express');
const Amount = require('../models/amountModels');
const router = express.Router();

// Post Method
router.post('/new', async (req, res) => {
  try {
    if (!req.body.amount) {
      return res.status(400).json({ error: "Send all required fields: amount" });
    }

    const newAmount = {
      amount: req.body.amount,
    };

    const amount = await Amount.create(newAmount);
    return res.status(201).json(amount);
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send({ error: "Internal Server error" });
  }
});

// GET Amount
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getAmount = await Amount.findById(id);
    if (!getAmount) {
      return res.status(404).json({ error: "No amount found" });
    }
    return res.status(200).json(getAmount);
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send({ error: "Internal Server error" });
  }
});

// Update Amount
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateAmount = await Amount.findByIdAndUpdate(id, req.body, { new: true });
    if (!updateAmount) {
      return res.status(404).json({ error: "No amount found" });
    }
    return res.status(200).json( {updateAmount} );
  } catch (error) {
    console.log('error:', error.message);
    res.status(500).send({ error: "Internal Server error" });
  }
});

module.exports = router;
