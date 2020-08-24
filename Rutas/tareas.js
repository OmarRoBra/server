const express= require('express')
const router = express.Router();
const {crearTarea,obtenerTareas,actualizarTarea,eliminarTarea} = require('../controllers/tareas')
const auth = require('../Midleware/authLog')

const {check}=require('express-validator')


router.post('/',
[check('nombre','El nombre es necesario').not().isEmpty(),
check('proyecto','El nombre es necesario').not().isEmpty(),]
,auth,crearTarea);
router.get('/',auth,obtenerTareas)

router.put('/:id',auth,actualizarTarea)

router.delete('/:id',auth,eliminarTarea) 

module.exports=router;