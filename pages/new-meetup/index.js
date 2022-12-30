import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter()

    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {'Content-Type': 'application/json'}
        })

        const data = await response.json()

        console.log(data)

        router.replace('/', null, {shallow: true})
    }

    return (
        <Fragment>
            <Head>
                <title>Add a new meetup </title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    );
};

export default NewMeetupPage;