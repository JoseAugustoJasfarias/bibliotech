import { collection } from "firebase/firestore";
import { db } from "./config";


export const livrosCollection = collection(db, "livros");
export const emprestimosCollection = collection(db, "emprestimos");
export const usersCollection = collection(db, "users");

