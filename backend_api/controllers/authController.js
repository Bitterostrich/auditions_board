
const createError = require("http-errors")
const Users = require("../models/userModel")
// const Jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const {v4: uuidv4} = require("uuid")


exports.register = async function (req, res, next) {

    try 
    {
        const { username, password } = req.body // request from frontend 

        const existingUser = await Users.findOne({ username });

        if (existingUser) {
            return res.status(400).json({message: 'Username already exists.'})
        }

        const hashedPassword = await bcrypt.hash(password, 10) // takes password and hashes the password, encryption 
    
        const newUser = new Users({username, password: hashedPassword}) // creates an instance of the userModel with the request from the frontend
    
        newUser.token = uuidv4() // assigns a token to the user. Token is stored in the variable token.
        await newUser.save() // saves the user information into the database.

        res.status(201).json({ token: newUser.token, message: 'Registration Successful'})
    } catch (error) {
        next(error)
    }
}



exports.login = async function (req, res, next) {
    try {
        const {username, password} = req.body // similar to writing username: req.body.username and password: req.body.password

        const user = await Users.findOne({ username }) //findOne is a MongoDB method, returns query that satisfies the query criteria
        console.log(user)
         if(!user) {

            //  const newUser = new Users({username: username, password: password})

            // await newUser.save()
          
             console.error('The username was not found')
            //  res.send({token: newUser.token})
             throw createError(404, 'User not found.')
         }

        // const isMatch = await bcrypt.compare(password, user.password)
        // if(!isMatch) {
        //     throw createError(401, 'Invalid Credentials.')
        // }
        // console.log(isMatch)
        
        user.token = uuidv4();
        await user.save()
        // res.send({token: user.token})
        res.json({ token: user.token, message : 'Login Successful'})


    } catch (error){
        next(error)
    }
}

