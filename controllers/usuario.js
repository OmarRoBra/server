const Usuario =require('../Models/userModel')
const bcrypt = require('bcryptjs')
const {validationResult}=require('express-validator')
const jsonWbt=require('jsonwebtoken');
exports.crearUsuario=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()})
    }
    const {email,password}=req.body;
    try{
        let usuario;
        const emailExists= await Usuario.findOne({email});
        if(emailExists){
            return res.status(400).json({msg:'ese email ya existe'})
           
        }
        usuario= new Usuario(req.body)  
        const salt= await bcrypt.genSalt(10);
        usuario.password=await bcrypt.hash(password,salt)
        await usuario.save();
         const payload={
               usuario:{
                   id:usuario.id
               }
         }
         jsonWbt.sign(payload,process.env.SECRET,{
             expiresIn:3600000
         },(error,token)=>{
             if(error)throw error;
             res.json({token})
         })
        
    }catch(error){
          console.log(error);
          res.status(400).send('error.msg')
    }
}