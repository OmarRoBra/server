//proyect
const Proyecto=require('../Models/tareasModel')
const Tarea =require('../Models/proyectModel')
const {validationResult}=require('express-validator')
const { findById } = require('../Models/tareasModel')

exports.crearTarea=async(req,res)=>{
    const errores=validationResult(req)
   if(!validationResult){
       return res.status(404).json({errores:errores.array()})
   }
   

   try{
    const {proyecto}=req.body;
    const proyectos= await Proyecto.findById(proyecto)
    if(!proyectos){
        return res.status(404).json({msg:'Proyecto no encontrado'})
    }
    //Revisar si el proyecto pertenece al usuario
    if(proyectos.creador.toString()!==req.usuario.id){
        return res.status(404).json({msg:'no autorizado'})
    }
    const tarea=  new Tarea(req.body);
    await tarea.save();
    res.status(200).send({tarea})

   }catch(error){
      console.log(error)
      return res.status(400).json({msg:'ups'})
   }
}

exports.obtenerTareas=async(req,res)=>{
    try{
        const {proyecto}=req.query;
        const proyectos= await Proyecto.findById(proyecto)
        if(!proyectos){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }
        //Revisar si el proyecto pertenece al usuario
        if(proyectos.creador.toString()!==req.usuario.id){
            return res.status(404).json({msg:'no autorizado'})
        }
     const tarea=await Tarea.find({proyecto})
     res.json({tarea});
    
       }catch(error){
          console.log(error)
          return res.status(400).json({msg:'ups'})
       }

}

exports.actualizarTarea=async(req,res)=>{
    const {proyecto,nombre,estado}=req.body;
    try{
      //revisar si la tarea existe
        const tareaExiste=await Tarea.findById(req.params.id)
       if(!tareaExiste){
        return res.status(404).json({msg:'Proyecto no encontrado'})
    }
    const proyectos= await Proyecto.findById(proyecto)
        //Revisar si el proyecto pertenece al usuario
        if(proyectos.creador.toString()!==req.usuario.id){
            return res.status(404).json({msg:'no autorizado'})
        }
       
        const nuevaTarea={};

       if(nombre){
           nuevaTarea.nombre=nombre;
       }
       if(estado){
           nuevaTarea.estado=estado;
       }

       const tareaDone= await Tarea.findOneAndUpdate({_id:req.params.id},{$set:nuevaTarea},
        {new:true})

        res.json({tareaDone});
    
       }catch(error){
          console.log(error)
          return res.status(400).json({msg:'ups'})
       }
}

exports.eliminarTarea=async(req,res)=>{
    const {proyecto}=req.query;
    try{
      //revisar si la tarea existe
        const tareaExiste=await Tarea.findById(req.params.id)
       if(!tareaExiste){
        return res.status(404).json({msg:'Proyecto no encontrado'})
    }
    const proyectos= await Proyecto.findById(proyecto)
        //Revisar si el proyecto pertenece al usuario
        if(proyectos.creador.toString()!==req.usuario.id){
            return res.status(404).json({msg:'no autorizado'})
        }
       await Tarea.findByIdAndRemove({_id:req.params.id})
        res.json({msg:'Tarea Eliminada'})
       }catch(error){
          console.log(error)
          return res.status(400).json({msg:'ups'})
       }
}