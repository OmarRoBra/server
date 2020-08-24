const express= require('express')
const router = express.Router();
const {verificarUsuario,obtenerUsuario} = require('../controllers/authc')

const {check}=require('express-validator')
const auth = require('../Midleware/authLog')

router.post('/',
  verificarUsuario
);
router.get('/',auth,obtenerUsuario)
module.exports=router;