import * as path from 'path';
import * as admin from 'firebase-admin';

let store: admin.firestore.Firestore;

class FirebaseService {
    constructor() {
        const serviceAccountKeyPath = path.resolve(__dirname, '../..', 'key.json');
        var serviceAccount = require(serviceAccountKeyPath);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        store = admin.firestore();
    }
}

export { store, FirebaseService }