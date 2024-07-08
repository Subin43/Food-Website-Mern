const express = require('express');
const User = require('../models/userModel');
const router  = express.Router();

// Post Method
router.post('/new',async(req,res)=>{
   try{
    if(
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.phoneNo ||
        !req.body.password ||
        !req.body.confirmPassword 
    ){
        res.status(400).json({error:" message: 'Send all required fields: name, email, phoneNo,password',"})
    }
    const newUser = {
        firstName:req.body.firstName ,
        lastName:req.body.lastName, 
        email:req.body.email ,
        phoneNo:req.body.phoneNo ,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    }

    const user = await User.create(newUser)
    return res.status(201).json(user);

   }
   catch(error){
    console.log('error:',error.message);
    res.status(500).send({error:"Internal Server error"})
 }
})

// GET USER BY EMAIL OR PHONE NUMBER AND PASSWORD
router.post('/getUser', async (req, res) => {
    try {
        const { contact, password } = req.body;
        let user;
        if (/\S+@\S+\.\S+/.test(contact)) {
            // If contact is an email
            user = await User.findOne({ email: contact, password: password });
        } else {
            // If contact is a phone number
            user = await User.findOne({ phoneNo: contact, password: password });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found or incorrect password" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({ error: "Internal Server error" });
    }
});
// GET USER 

router.get('/:id',async(req,res)=>{
   try{
    const {id} = req.params;
    const getUser = await User.findById(id);
    if(!getUser){
        return res.status(404).json({error:"No User Found"})
    } 
    return res.status(200).json(getUser)
   }
   catch(error){
    console.log('error:',error.message);
    res.status(500).send({error:"Internal Server error"})
 }
})

// GET All

router.get('/',async(req,res)=>{
    try{
     const getUser = await User.find({});
     if(!getUser){
         return res.status(404).json({error:"No User Found"})
     } 
     return res.status(200).json(getUser)
    }
    catch(error){
     console.log('error:',error.message);
     res.status(500).send({error:"Internal Server error"})
  }
 })

 //Delete USER

 router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Received ID for deletion: ${id}`);
      
      // Check if the ID format is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }
  
      const deleteUser = await User.findByIdAndDelete(id);
      if (!deleteUser) {
        return res.status(404).json({ error: "No User Found" });
      }
  
      console.log(`User with ID: ${id} deleted successfully`);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error('Error during user deletion:', error.message);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  
  
module.exports = router;

