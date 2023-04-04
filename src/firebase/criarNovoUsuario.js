import {  query, where, getDocs, addDoc } from "firebase/firestore";
import { usersCollection } from "./collections";



export async function criarNovoUsuario(user) {
  const userExists = await verificarUsuarioExistente(user);
  if (!userExists) {
    await addDoc(usersCollection, {
      uid: user.uid,
      email: user.email,
      nome: "",
      telefone: "",
    });
  }
}

async function verificarUsuarioExistente(user) {
  const q = query(usersCollection, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}