import 'firebase/firestore';

import { credential } from 'firebase-admin';
// import firebase from 'firebase/app';
import {
  App,
  applicationDefault,
  getApp,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

// initializeApp();

class Firebase {
  app: App;
  db: Firestore;

  constructor() {
    const creds = JSON.parse(process.env.GOOGLE_API_CREDS);

    this.app =
      getApps().length === 0
        ? initializeApp({
            credential: credential.cert(creds),
            databaseURL: 'https://playsession-5e04a.firebaseio.com',
          })
        : getApp();

    this.db = getFirestore();
  }

  async writeToFirebase(tableName, primaryKey, data) {
    try {
      await this.db.collection(tableName).doc(primaryKey).set(data);
      console.log('Document successfully written!');
    } catch (e) {
      console.error('Error writing document: ', e);
    }
  }

  async createIfNotExists(tableName, primaryKey, data) {
    try {
      const docRef = await this.db.collection(tableName).doc(primaryKey).get();
      if (docRef.exists) {
        throw new Error(`Document exists for lookupKey ${primaryKey}`);
      } else {
        return this.writeToFirebase(tableName, primaryKey, data);
      }
    } catch (e) {
      console.warn(tableName);
      throw e;
    }
  }

  async readRecordFromFirebase(tableName, obj) {
    const lookupKey = obj.lookupKey;
    try {
      const docRef = await this.db.collection(tableName).doc(lookupKey).get();
      return docRef.data();
    } catch (e) {
      throw e;
    }
  }
}

export default Firebase;
