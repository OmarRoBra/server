const Usuario =require('../Models/userModel')
const bcrypt = require('bcryptjs')
const {validationResult}=require('express-validator')
const jsonWbt=require('jsonwebtoken');

exports.verificarUsuario=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()})
    }
    const {email,password}=req.body;
   
    try{
        let usuario= await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'})
           
        }
        const passwordDone= await bcrypt.compare(password,usuario.password);
          if(!passwordDone){
              return res.status(400).json({msg:'La contraseña no es igual'})
          }
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
          res.status(400).send({msg:'El usuario no existe'})
    }
}

exports.obtenerUsuario=async(req,res)=>{
    try{
     const user= await Usuario.findById(req.usuario.id).select('-password')
     res.json({user})
     console.log(user)
    }catch(error){
        console.log(error)
        res.status(500).json({msg:error})
    }
}