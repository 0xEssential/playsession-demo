import 'firebase/firestore';

import firebase from 'firebase/app';

class Firebase {
  app: firebase.app.App;
  db: firebase.firestore.Firestore;

  constructor() {
    const config = {
      name: 'playsession',
      apiKey: 'AIzaSyBt_hl5cLSC2t2xAGG2ArjTonRMxAOVKOA',
      authDomain: 'playsession-5e04a.firebaseapp.com',
      projectId: 'playsession-5e04a',
      storageBucket: 'playsession-5e04a.appspot.com',
      messagingSenderId: '650716544338',
      appId: '1:650716544338:web:50f04e25102f95cf070e8b',
    };
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(config);
      this.db = firebase.firestore();
    }
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
