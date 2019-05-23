const express = require('express');
const db = require('./data/accounts-model');

const server = express();

server.use(express.json());

// GET all acounts
server.get('/api', async (req, res) => {
    try {
        const findAccount = await db.find();
        res.json({ message: `Successfully found account`, findAccount });
    } catch (error) {
        res.status(500).json({
            error: `There was an error retrieving account from server`,
            error
        });
    }
});

//GET account by id
server.get('/api/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const accoundById = await db.findById(id);
        res.json({
            message: `Successfully returned account with id ${id}`,
            accoundById
        });
    } catch (error) {
        res.status(500).json({
            error: `There was an error retrieving account with id ${id}`,
            error
        });
    }
});

//POST add new account
server.post('/api', async (req, res) => {
    const { body } = req;

    try {
        const newAccount = await db.add(body);
        res.status(201).json({
            message: `Successfully added new account`,
            newAccount
        });
    } catch (error) {
        res.status(500).json({
            error: `There was an error adding new account`,
            error
        });
    }
});
//DELETE remove account
server.delete('/api/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAccount = await db.remove(id);
        res.json({
            message: `Successfully deleted account with id ${id}`,
            deletedAccount
        });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem deleting account with id ${id}`,
            error
        });
    }
});
//PUT update account
server.put('/api/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const updatedAcount = await db.update(id, body);
        res.json({ message: `Successfully updated account`, updatedAcount });
    } catch (error) {
        res.status(500).json({
            error: `There was a problem updating account with id ${id}`,
            error
        });
    }
});

module.exports = server;
