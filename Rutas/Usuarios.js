const express= require('express')
const router = express.Router();
const {crearUsuario} = require('../controllers/usuario')
const {check}=require('express-validator')


router.post('/',
[check('nombre','Ingresa un valor').not().isEmpty(),
  check('email','Ingresa un Email valido').isEmail()],
crearUsuario);

module.exports=router;