
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCollectionData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};

const Congrats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionName = "congrats" ;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchCollectionData(collectionName);
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [collectionName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Data from {collectionName}</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {Object.entries(item).map(([key, value]) => (
               <div key={key} style={{ color: 'white' }}>
                <strong>{key}</strong>: {value}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Congrats;
