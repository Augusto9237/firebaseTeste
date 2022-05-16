import React, { useState, useEffect } from "react";
import "./styles.css";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyArlrMtCj8XXKONRtG6_crV5467eumsbNA",
  authDomain: "reactfirebase-4fc5c.firebaseapp.com",
  projectId: "reactfirebase-4fc5c",
  storageBucket: "reactfirebase-4fc5c.appspot.com",
  messagingSenderId: "579919442488",
  appId: "1:579919442488:web:196ca21250d5b1e3ddeccd",
  measurementId: "G-MPDWX9611N"
});

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore();
  const useCollectionRef = collection(db, "users");

  async function createUser() {
    const user = await addDoc(useCollectionRef, {
      name,
      email
    });

    console.log(user);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(useCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div>
      <div>
        <input
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Criar Usuario</button>
      </div>
      <ul>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={() => deleteUser(user.id)}>Excluir</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
