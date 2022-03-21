const express =  require('express');
const app =  express();

const mongoose =  require('mongoose');
const dotenv =  require('dotenv');
const helmet =  require('helmet');
const morgan =  require('morgan');

// defines routes 
const userRoutes =  require('./routes/users');
const auhthRoutes= require('./routes/users');
dotenv.config();

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser :  true , 
    useUnifieldTopology : true}, 
     ()=>{
         console.log('Connected to MongoDb')
     });
//Middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

app.use('/api/user',  userRoutes);
app.use('/api/auth' , auhthRoutes )


app.listen(8080 ,()=>{
    console.log('web api satrted .....');
})
//chercher dans le dossier un fichier nommé 