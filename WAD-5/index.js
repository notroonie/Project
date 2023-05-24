import express from 'express'
import mongoose from 'mongoose'

const songDetails = [{
    SongName: "Guzarish",
    FilmName: "Ghajini",
    MusicDirector: "AR",
    Singer: "Benny",
    Actor: "Amir",
    Actress: "Aseen",
},
{
    SongName: "Guzarish",
    FilmName: "Ghajini",
    MusicDirector: "AR",
    Singer: "Benny",
    Actor: "Amir",
    Actress: "Aseen",
}
]

const url = 'mongodb+srv://kalyaninilpankar:kalyani@cluster0.d0xmhgn.mongodb.net/?retryWrites=true&w=majority'
const port = 3000;

const server = express()
server.use(express.json())

mongoose.connect(url).then( ()=> {
    console.log('Connected to MongoDB')
})

const musicSchema = new mongoose.Schema({
    SongName: String,
    FilmName: String,
    MusicDirector: String,
    Singer: String,
    Actor: String,
    Actress: String,
})

const musicModel = mongoose.model('songdetails', musicSchema)

server.get('/', async (req, res)=> {
    try{
        res.send("Hello World")
    }
    catch(err){
        res.send(err)
    }
})

server.get('/getSongs', async (req, res)=> {
    try{
        const totalSongs = await musicModel.countDocuments()
        const songs = await musicModel.find()
        const tableRows = songs.map( (song)=> {
            return `
            <tr>
                <td>${song.SongName}</td>
                <td>${song.FilmName}</td>
                <td>${song.MusicDirector}</td>
                <td>${song.Singer}</td>
                <td>${song.Actor}</td>
                <td>${song.Actress}</td>
            </tr>
            `
        })

        const table = `
        <center>
            <table style="border: solid 1px;">
                <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Film Name</th>
                        <th>Music Director</th>
                        <th>Singer</th>
                        <th>Actor</th>
                        <th>Actress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>${tableRows.join('')}</tr>
                </tbody>
            </table>
        </center>
        `
        res.send(`<center>Total number of songs: ${totalSongs} <br><br> ${table}</center>`)
    }
    catch(err){
        res.send(err)
    }
})

server.post('/addSongs', async (req, res)=> {
    try {
        musicModel.insertMany(songDetails)
        res.send('Songs added successfully')
    } 
    catch (err) {
        res.send(err)
    }
})

server.get('/getSongs/:director', async (req, res)=> {
    try {
        const Director = req.params.director
        const allSongs = await musicModel.find({MusicDirector: Director})
        const songs = allSongs.map( (song)=> song.SongName)
        res.send(`Songs by ${Director} are: ${songs.join(',')}`)
    } 
    catch (err) {
        res.send(err)
    }
})

server.get('/getSongs/:director/:singer', async (req, res)=> {
    try{
        const Director = req.params.director
        const Singer = req.params.singer
        const allSongs = await musicModel.find({MusicDirector: Director, Singer: Singer})
        const songs = allSongs.map( (song)=> song.SongName)
        res.send(`Songs by ${Director} and ${Singer} are: ${songs}`)
    }
    catch(err){
        res.send(err)
    }
})

server.delete('/deleteStudents/:name', async (req, res)=> {
    try{
        const Name = req.params.name
        const ack = await musicModel.deleteOne({SongName: Name})
        if(ack){
            res.send(`Song ${Name} is deleted`)
        }
        else{
            res.send(`Song ${Name} is not found`)
        }
    }
    catch{
        res.send(err)
    }
})

server.get('/getSongs2/:singer/:movie', async (req, res)=> {
    try{
        const Singer = req.params.singer
        const Movie = req.params.movie
        const allSongs = await musicModel.find({Singer: Singer, Movie: Movie})
        const songs = allSongs.map( (song)=> song.SongName)
        res.send(`Songs sung by ${Singer} in the movie ${Movie} are: ${songs.join(',')}`)
    }
    catch(err){
        res.send(err)
    }
})

server.put('/update/:song/:actor/:actress', async (req, res)=> {
    try{
        const Song = req.params.song
        const Actor = req.params.actor
        const Actress = req.params.actress

        const ack = await musicModel.updateOne({SongName: Song}, {$set: {Actor: Actor, Actress: Actress}})
        if(ack){
            res.send(`Song ${Song} is updated`)
        }
        else{
            res.send(`Song ${Song} is not found`)
        }
    }
    catch(err){
        res.send(err)
    }
})

server.listen(port, ()=> {
    console.log('Server is running')
})