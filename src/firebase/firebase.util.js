import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyD6BI2lUEz9UPxtULpQSDBTG1-Qi27HShc",
    authDomain: "e-commerce-656c9.firebaseapp.com",
    databaseURL: "https://e-commerce-656c9.firebaseio.com",
    projectId: "e-commerce-656c9",
    storageBucket: "e-commerce-656c9.appspot.com",
    messagingSenderId: "60777674622",
    appId: "1:60777674622:web:01886a0a8beda0952ce52f",
    measurementId: "G-NPKM33SNE2"
};
  
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
   
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};
/*promise based checking user authentication  */
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscibe = auth.onAuthStateChanged(userAuth => {
            unsubscibe();
            resolve(userAuth);
        }, reject);
    });
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    /*adding shop data to redux*/ 
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};




export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;