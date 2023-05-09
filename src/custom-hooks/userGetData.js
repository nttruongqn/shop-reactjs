import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase.config";

const UserGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, [collectionRef]);

  return { data };
};

export default UserGetData;
