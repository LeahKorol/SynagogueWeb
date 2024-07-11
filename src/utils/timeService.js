import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

// Function to fetch schedule items from Firestore
export const fetchScheduleItems = async () => {
  try {
    const timesCollection = collection(db, 'times');
    const timesSnapshot = await getDocs(timesCollection);
    const itemsToShow = timesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return itemsToShow;
  } catch (error) {
    console.error('Error fetching schedule items: ', error);
    return [];
  }
};

// Function to listen for real-time updates in the Firestore collection
export const listenToScheduleItems = (callback) => {
  const timesCollection = collection(db, 'times');

  const unsubscribe = onSnapshot(timesCollection, (snapshot) => {
    const itemsToShow = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(itemsToShow);
  });

  return unsubscribe;
};
