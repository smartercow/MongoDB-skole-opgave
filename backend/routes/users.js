const express = require('express')
const User = require('../models/user')
const router = express.Router()

// GET all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// GET one
router.get('/detalje/:id', async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

// Create one
router.post('/addOne', async (req, res) => {

    const addUser = new User({
        userName: req.body.userName,
        userMail: req.body.userMail,
        userAge: req.body.userAge
    })
    try {
        const newUser = await addUser.save()
       res.status(201).send(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message})
        
    }
})

// Update one
router.patch('/:id', getUsers, async (req, res) => {
    if(req.body.newUserName){
        res.oneUser.userName = req.body.newUserName
    }
    if(req.body.newUserMail){
        res.oneUser.userMail = req.body.newUserMail
    }
    if(req.body.newUserAge){
        res.oneUser.userAge = req.body.newUserAge
    }
    try {
        
        const updateUser = await res.oneUser.save()
        res.json(updateUser)

    } catch (error) {
        res.status(400).json({ message: error.message})
    }

})

// Delete one
router.delete('/:id', getUsers, async(req, res) => {
    try {
        await res.oneUser.remove()
        res.json({ message: 'Bruger er slettet'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getUsers(req, res, next)
{
    let oneUser

    try {
        oneUser = await User.findById(req.params.id)
        if(oneUser == null)
        {
        return res.status(404).json({ message: 'brugeren findes ikke'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }

    res.oneUser = oneUser
    next()
}

module.exports = router