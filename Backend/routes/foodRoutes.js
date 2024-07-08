const express = require('express');
const Food = require('../models/foodModels');
const router  = express.Router();

// Post Method
router.post('/new', async (req, res) => {
    try {
        const { s_No, name, category, restaurant, offer, img, price } = req.body;

        if (!s_No || !name || !category || !restaurant || !offer || !img || !price) {
            return res.status(400).json({ error: "Send all required fields: s_No, name, category, restaurant, offer, img, price" });
        }

        const newFood = {
            s_No,
            name,
            category,
            offer,
            restaurant,
            price,
            image: img,
           
        };

        const food = await Food.create(newFood);
        return res.status(201).json(food);

    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ error: "Internal Server error" });
    }
});

// GET Food by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getFood = await Food.findById(id);
        if (!getFood) {
            return res.status(404).json({ error: "No Food Found" });
        }
        return res.status(200).json(getFood);
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ error: "Internal Server error" });
    }
});

// GET All Food
router.get('/', async (req, res) => {
    try {
        const getFood = await Food.find({});
        if (!getFood) {
            return res.status(404).json({ error: "No Food Found" });
        }
        return res.status(200).json(getFood);
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ error: "Internal Server error" });
    }
});

// Delete Food by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteFood = await Food.findByIdAndDelete(id);
        if (!deleteFood) {
            return res.status(404).json({ error: "No Food Found" });
        }
        return res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ error: "Internal Server error" });
    }
});

module.exports = router;
