const express = require('express');

const router = require('express').Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// const db = require('../data/db-config');

// GET ALL RECORDS
router.get('/', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve cars' });
    }
});

//GET BY ID
router.get('/:id', async(req,res)=>{
    try{
        const {id} =req.params;
        const cars = await db('cars').where({id});

        res.json(cars);
    }catch(err){
        res.status(500).json({message: 'Failed to retrieve car.'})
    }
})

// POST
router.post('/', async (req, res) => {
    try {
        const dataBody = req.body;
        const newCar = await db('cars').insert(dataBody);
        res.status(201).json(newCar);
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with your POST request`});
    }
})

// UPDATE BY ID
router.put('/:id' , async (req,res) => {
    try {
        const updateCar = req.body;
        const id = req.params.id;

        // db
        const updatedCar = await db('cars')
            .update(updateCar)
            .where('id' , '=' , id);
        res.status(203).json(updatedCar);
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem with your PUT request'});
    }
})

// DELETE BY ID
router.delete('/:id' , async (req,res) => {
    try {
        const id = req.params.id;
        const carDeleted = await db('cars')
            .del()
            .where('id' , '=' , id);
        res.status(200).json(carDeleted);
    }
    catch (err) {
        res.status(500).json({message:'There was a problem with your DELETE request'})
    }
})

module.exports = router; 