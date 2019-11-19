import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const testFunc = functions.https.onRequest((request, response) => {
 admin.firestore().collection('users')
    .get()
    .then(snapshot => {
        response.status(200).json(snapshot)
    })
    .catch(err => {
        response.status(500).json(err)
    })
});
