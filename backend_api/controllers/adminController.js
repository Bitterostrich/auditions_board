
const createError = require("http-errors")
const Users = require("../models/userModel")
// const Jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const {v4: uuidv4} = require("uuid")



exports.getUsers = async function (req, res, next) {

    try 
    {  
        const user = await Users.find()

        if (!user) {
            console.error(error)
            throw createError(404, "User not found.")
        }
    
        // newUser.token = uuidv4() // assigns a token to the user. Token is stored in the variable token.
        // await newUser.save() // saves the user information into the database.

        res.send(user)
    } catch (error) {
        next(error)
    }
}



// exports.findBeer = (req, res, next) => {
    //     const beerId = String(req.params.id);
    //     const beerIndex = beers.findIndex(beer => beer.id === beerId);
    
    //     const beerName = String(req.params.name).toLowerCase();
    //     const beerN = beers.find(beer => beer.name.toLowerCase() === beerName);
    //     if (filteredBeers.length === 0) {
//         return next(createError(404, 'Cannot find the beer.'));
//     }


//     res.send(filteredBeers)
// };
