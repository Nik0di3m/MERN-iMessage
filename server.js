import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'Pusher';
import { ApiKey } from './apiKey.js';
import mongoData from './mongoData.js';




// app configuration
const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());
// db configuration

const mongoURI = `mongodb+srv://Nikodem:${ApiKey}@cluster0.ogxip.mongodb.net/iMessageDataBase?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('Db Connected')
})

// api routers

app.post('/new/chat', (req, res) => {
    const dbData = req.body

    mongoData.create(dbData, (err, db) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(db)
        }
    })
})

app.get('/get/chats', (req, res) => {
    mongoData.find((err, db) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let chats = []

            db.map((item) => {
                const chatInfo = {
                    id: item._id,
                    name: item.chatname,
                }

                chats.push(chatInfo)
            })
            res.status(200).send(chats)
        }
    })
})

// listeners
app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})