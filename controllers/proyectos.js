const Proyecto=require('../Models/tareasModel')
const {validationResult}=require('express-validator')

exports.agregarTarea=async(req,res)=>{
  
    const errores=validationResult(req)
   if(!validationResult){
       return res.status(404).json({errores:errores.array()})
   }
    try{
        
        const proyecto=new Proyecto(req.body);
        proyecto.creador=req.usuario.id
        proyecto.save();
        res.status(200).send(proyecto)

    }catch(error){
        console.log(error);
        res.status(400).json({msg:error})
    }
}

exports.obtenerTarea=async(req,res)=>{
    try{
        const proyectos= await Proyecto.find({creador:req.usuario.id})
        if(proyectos===[]){
            res.status(400).json({msg:'El usuario aun no tiene proyectos'})
        }
      return  res.status(200).json({proyectos})
    }catch(error){
        console.log(error)
        return res.status(400).json({msg:'ups'})
    }

      
}

exports.actualizarTarea=async(req,res)=>{
    const errores=validationResult(req)
    if(!validationResult){
        return res.status(404).json({errores:errores.array()})
    }
    const {nombre}=req.body;
    const nuevoProyecto={};

    if(nombre){
        nuevoProyecto.nombre=nombre;
    }
    try{
         
    let proyecto=await Proyecto.findById(req.params.id)
    if(!proyecto){
        return res.status(400).send({msg:'Proyecto no encontrado'})
    }
    //verificar el creador
    if(proyecto.creador.toString()!==req.usuario.id){
        return res.status(404).json({msg:'no autorizado'})
    }

    proyecto=await Proyecto.findByIdAndUpdate({_id:req.params.id},{$set:nuevoProyecto}
        ,{new:true})
    res.json({proyecto})
     }catch(error){
         console.log(error);
         res.status(400).json({msg:error})
     }

}

exports.elimnarTarea=async(req,res)=>{
   
    try{
         
    let proyecto=await Proyecto.findById(req.params.id)
    if(!proyecto){
        return res.status(400).send({msg:'Proyecto no encontrado'})
    }
    //verificar el creador
    if(proyecto.creador.toString()!==req.usuario.id){
        return res.status(404).json({msg:'no autorizado'})
    }

    proyecto=await Proyecto.findByIdAndRemove({_id:req.params.id})
    res.json({msg:'Tarea eliminada'})
     }catch(error){
         console.log(error);
         res.status(400).json({msg:error})
     }
}