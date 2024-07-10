// firestoreService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const fetchTimesCollection = async () => {
  const timesCollection = collection(db, "times");
  const timesSnapshot = await getDocs(timesCollection);
  const timesList = timesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return timesList;
};

export { fetchTimesCollection };

