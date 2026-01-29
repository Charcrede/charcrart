// src/services/traitement.ts
import { db } from "../lib/firebase"; // ton fichier firebase.ts
import { collection, addDoc } from "firebase/firestore";

export interface Traitement {
  term: string;
  accroche: string;
  definition: string;
  exemple: string;
  aRetenir: string;
  createdAt?: Date;
}

export const createTraitement = async (data: Traitement) => {
  try {
    const traitementsRef = collection(db, "traitements");

    const docRef = await addDoc(traitementsRef, {
      ...data,
      createdAt: new Date(),
    });

    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Erreur création traitement:", err);
    return { success: false, error: err };
  }
};
