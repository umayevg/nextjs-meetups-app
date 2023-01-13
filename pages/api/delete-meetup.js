import {MongoClient, ObjectId} from 'mongodb'
import bcrypt from "bcrypt";

async function handler(req, res) {
    if (req.method === 'DELETE') {
        let data = req.body

        const client = await MongoClient.connect(process.env.MONGO_ATLAS_URL)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')

        const meetup = await meetupsCollection.findOne({_id: ObjectId(data.meetupId)})


        const result = await bcrypt.compare(data.password, meetup.password)

        if (!result) {
            return
        }


        await meetupsCollection.deleteOne({_id: ObjectId(data.meetupId)})

        client.close()

        res.status(200).json({message: 'meetup deleted'})

    }
}

export default handler