import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp(functions.config().firebase);

export const testFunc = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    admin.firestore().collection('users').get().then(snap => {
        const data: any[] = [];
        snap.forEach(i => {
            data.push(i.data());
        })
        return response.json({ data: data })
    })
        .catch(err => {
            response.status(500).json(err)
        })
});
