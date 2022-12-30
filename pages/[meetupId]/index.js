import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

const MeetupDetails = ({meetupData}) => {
    if (!meetupData) {
        return <p>Loading...</p>
    }
    return (
        <Fragment>
            <Head>
                <title>{meetupData.title}</title>
                <meta name={'description'} content={meetupData.title}/>
            </Head>
            <MeetupDetail
                image={meetupData.image}
                title={meetupData.title}
                address={meetupData.address}
                description={meetupData.description}
            />
        </Fragment>
    );
};


export async function getStaticPaths() {

    const client = await MongoClient.connect(process.env.MONGO_ATLAS_URL)

    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, {}).toArray()

    client.close()


    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId

    const client = await MongoClient.connect(process.env.MONGO_ATLAS_URL)

    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})


    client.close()

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                description: meetup.description,
                address: meetup.address,
            }
        }
    }
}

export default MeetupDetails;