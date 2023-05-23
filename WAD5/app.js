const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://aditya:music%40123@cluster0.s2ogvsz.mongodb.net/music?retryWrites=true&w=majority"

const app = express()
app.use(express.json())


//Configuring routes
const programmerRouter = require('./router/programmer')
app.use('/programmer', programmerRouter)


//Mongoose Configuration
const PORT = 3001;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

// app.listen(3000, ()=> {
//     console.log('listening on port 3001')
// })