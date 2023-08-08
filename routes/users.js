const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Decsription: Get all users
 * Access: Public
 * Paramaters: None
 */
router.get('/',(req, res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})



/**
 * Route: /users/:id
 * Method: GET
 * Decsription: Get user by their ID
 * Access: Public
 * Paramaters: ID
 */
router.get('/:id',(req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Does Not Exist"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
})


/**
 * Route: /users
 * Method: POST
 * Decsription: Create/Add a new user
 * Access: Public
 * Paramaters: None
 */
router.post('/', (req, res)=>{
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    const user = users.find((each)=> each.id === id);

    if(user){
        return res.status(404).json({
            success: false,
            message: "User With the Id already exists"
        })
    }
    users.push({
        id,
        name, 
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        success: true,
        data: users
    })
})



/**
 * Route: /users/:id
 * Method: PUT
 * Decsription: Updating a user by their id
 * Access: Public
 * Paramaters: ID
 */
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);

    if(!user)
    return res.status(404).json({success: false, message: "User Does Not Exist"});



    const updatedUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updatedUser
    })
})


/**
 * Route: /users/:id
 * Method: DELETE
 * Decsription: Delete a user by ID
 * Access: Public
 * Paramaters: ID
 */
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id===id);

    if(!user)
    return res.status(404).json({success: false, message: "User Not Found"});

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({success: true, data: users});
})

module.exports = router;