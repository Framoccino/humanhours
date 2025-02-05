import { initializeFirestore } from 'firebase/firestore';
import { create } from 'ipfs-http-client';

const db = initializeFirestore(app, {});
const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const DatabaseService = {
  async saveUserProfile(userId: string, profile: any) {
    // Save to Firebase
    await db.collection('users').doc(userId).set(profile);
    
    // Save to IPFS
    const result = await ipfs.add(JSON.stringify(profile));
    return result.path;
  },

  async getTasks(filters: any) {
    const snapshot = await db.collection('tasks')
      .where('status', '==', 'active')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}; 