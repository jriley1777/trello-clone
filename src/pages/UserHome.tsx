import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../utils/firebase';

const UserHome = () => {
    const { userId } = useParams();
    const [ user, setUser ] = useState({name: '', photoURL: ''});
    const usersRef = firebase.database().ref('users');

    useEffect(() => {
        if(userId){
           usersRef.child(userId).on('value', snap => {
               setUser(snap.val())
           });
        }
    }, []);

    return (
        <div>
            <h1>User Home for: &nbsp;&nbsp;{user.name}</h1>
            <img src={user.photoURL} />
        </div>
    )
};

export default UserHome;