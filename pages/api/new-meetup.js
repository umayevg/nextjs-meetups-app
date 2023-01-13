import {MongoClient} from 'mongodb'
import bcrypt from "bcrypt";

async function handler(req, res) {
    if (req.method === 'POST') {
        let data = req.body

        data = {...data, password: await bcrypt.hash(data.password, 10)}


        const client = await MongoClient.connect(process.env.MONGO_ATLAS_URL)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')

        await meetupsCollection.insertOne(data)

        client.close()

        res.status(201).json({message: 'meetup created'})

    }
}

export default handler