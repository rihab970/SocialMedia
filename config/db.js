const mongoose = require('mongoose');

const connectDB = async () => {

      mongoose.set('strictQuery', false);
     try{
      const connString ='mongodb://localhost:27017/'
       const conn = await mongoose.connect(connString,{
             dbName: 'SocialMedia',
             useNewUrlParser: true,
             useUnifiedTopology: true,
       });
       console.log(`Connected database: ${conn.connection.host}`);
       
     } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit();
     }
};

module.exports = connectDB;