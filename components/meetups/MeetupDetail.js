import React, {useRef} from 'react';
import classes from './MeetupDetail.module.css'
import {useRouter} from "next/router";

const MeetupDetail = (props) => {
    const passwordRef = useRef()
    const router = useRouter()


    const removeMeetupFromDatabaseHandler = async () => {
        const enteredPassword = passwordRef.current.value.trim()

        if (enteredPassword.length < 5) return

        const meetupData = {
            meetupId: props.id,
            password: enteredPassword
        }


        const response = await fetch('/api/delete-meetup', {
            method: 'DELETE',
            body: JSON.stringify(meetupData),
            headers: {'Content-Type': 'application/json'}
        })

        await response.json()


        router.replace('/', null, {shallow: true})
    }


    return (
        <section className={classes.detail}>
            <img
                src={props.image}
                alt={props.title}/>
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
            <div className={classes.delete}>
                <button
                    onClick={removeMeetupFromDatabaseHandler}>delete
                </button>
                <input ref={passwordRef} type="password" placeholder={'Enter password to delete'}/><br/>
                <small>min 5 chars.</small>
            </div>
        </section>
    );
};

export default MeetupDetail;