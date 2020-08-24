const express= require('express')
const conectarDB =require('./config/db')
const cors=require('cors')


const app=express();

conectarDB();
app.use(cors())

app.use(express.json({extend:true}))

const port=process.env.port||4000

app.use('/api/v1/users',require('./Rutas/Usuarios'));
app.use('/api/v1/auth',require('./Rutas/auth'));
app.use('/api/v1/proyectos',require('./Rutas/proyecto'))
app.use('/api/v1/tareas',require('./Rutas/tareas'))

app.listen(port,'0.0.0.0',()=>{
    console.log('xd')
})


