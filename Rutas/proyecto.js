const express= require('express')
const router = express.Router();
const {agregarTarea, obtenerTarea,actualizarTarea,elimnarTarea} = require('../controllers/proyectos')
const auth = require('../Midleware/authLog')

const {check}=require('express-validator')


router.post('/',
[check('nombre','El nombre es necesario').not().isEmpty()]
,auth,agregarTarea);

router.get('/',auth,obtenerTarea)

router.put('/:id',auth,[
    check('nombre','El nombre es obligatorio')
],actualizarTarea)

router.delete('/:id',auth,elimnarTarea)

module.exports=router;