import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";
import {Fragment} from "react";


/*
const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address in Munchen',
        description: 'the first meetup'
    },
    {
        id: 'm2',
        title: 'Meetup PHP8',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Rue en Bois 1, Bruxelles',
        description: 'Meetup talk about new PHP 8 features'
    },
]

 */


const HomePage = ({meetups}) => {

    return (
        <Fragment>
            <Head>
               <title>NextJS Meetups App</title>
                <meta name={'description'} content={'Browse a list of Meetups'}/>
            </Head>
            <MeetupList meetups={meetups}/>
        </Fragment>
    );
};


export async function getStaticProps() {

    const client = await MongoClient.connect(process.env.MONGO_ATLAS_URL)

    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    }
}


// export async function getServerSideProps(context) {
//     const {req, res} = context
//     console.log(req.headers, res)
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }


export default HomePage;
