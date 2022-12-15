import React, { useState } from 'react';

import './App.css';

import { setDoc, doc, Timestamp, updateDoc, arrayUnion, arrayRemove, getDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { db } from './utils/firebase.js'

function App() {

  const [countFromDB, setCountFromDB] = useState()
  let [cities, setCities] = useState([])

  const handleDecrement = async () => {
    let cnt = countFromDB - 1;
    const docRef = await setDoc(doc(db, 'test', 'count'), {
      value: cnt
    })
  }
  
  const handleIncrement = async () => {
    let cnt = countFromDB + 1;

    try {
      const docRef = await setDoc(doc(db, "test", 'count'), {value: cnt}, {merge: true});
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }   
  }

  const docData = {
      stringExample: "Hello world!",
      booleanExample: true,
      numberExample: 3.14159265,
      dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
      arrayExample: [5, true, "hello"],
      nullExample: null,
      objectExample: {
          a: 5,
          b: {
              nested: "foo"
          }
      }
  };
  const handleAddData = async () => {
    await setDoc(doc(db, "test", "data"), docData);
  }


  const handleUpdateData = async () => {

    const updateData = {
      dateExample: Timestamp.fromDate(new Date("December 11, 2015"))
    }

    const dataRef = doc(db, 'test', 'data')
    await updateDoc(dataRef, updateData)
  }


  const handleUpdateData2 = async () => {
    // Create an initial document to update.
    const frankDocRef = doc(db, "test", "frank");
    await setDoc(frankDocRef, {
        name: "Frank",
        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        age: 12
    });
  
    // To update age and favorite color:
    await updateDoc(frankDocRef, {
        "age": 13,
        "favorites.color": "Red"
    });
  }

  const handleAddArrayElement = async () => {
    const dataRef = doc(db, 'test', 'data')
    await updateDoc(dataRef, {
      arrayExample: arrayUnion('array union method success')
    })
  }

  const handleRemoveArrayElement = async () => {
    const dataRef = doc(db, 'test', 'data')
    await updateDoc(dataRef, {
      arrayExample: arrayRemove('array union method success')
    })
  }

  const addCitiesData = async () => {
    const citiesRef = collection(db, "test");

    await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    await setDoc(doc(citiesRef, "LA"), {
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    await setDoc(doc(citiesRef, "DC"), {
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    await setDoc(doc(citiesRef, "TOK"), {
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    await setDoc(doc(citiesRef, "BJ"), {
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });
  }
  addCitiesData()

  // const getDoc = async () => {
  //   const docRef = doc(db, 'test', 'SF');
  //   const docSnap = await getDoc(docRef)
    
  //   if (docSnap.exists()) {
  //     console.log(docSnap.data())
  //   } else {
  //     console.log('error')
  //   }
  // }

  const fetchCountData = async () => {
    const docRef = doc(db, 'test', 'count');
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setCountFromDB(docSnap.data().value)
    } else {
      console.log('error')
    }

    // const docRef = doc(db, "cities", "SF");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  fetchCountData()

  const unsub = onSnapshot(doc(db, 'test', 'count'), (doc) => {
    setCountFromDB(doc.data().value)
    // console.log(doc.data())
  })


  const [fetchCitiesSent, setFetchCitiesSent] = useState(false)

  const fetchCities = async () => {
    const q = query(collection(db, "test"), where("capital", "==", true))

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.forEach((doc) => {        
      console.log(doc.data().name)
    })
  }

  return (
    <div className="App">
      <h1>Counter</h1>
      <div className='counter'>
        <button onClick={handleDecrement}>-</button>
        <h2>{countFromDB}</h2>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div className='data-to-database-buttons'>
        <h1>Add Data to database</h1>
        <button onClick={handleAddData}>Add Data</button>
        <button onClick={handleUpdateData}>Update Data</button>
        <button onClick={handleUpdateData2}>update 2</button>
        <button onClick={handleAddArrayElement}>Add Array Element</button>
        <button onClick={handleRemoveArrayElement}>Remove Array Elememt</button>
      </div>
      <div className='get-data-buttons'>
        <h1>Get data</h1>
        <button onClick={() => fetchCountData()}>Get Count</button>
        <p>Count from Database: {countFromDB}</p>
        <button onClick={() => fetchCities()}>Fetch Cities</button>
        <ul>
         

        </ul>
      </div>
    </div>
  );
}

export default App;
