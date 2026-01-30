import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

export async function loginAdmin(numero: string, password: string) {
  if (!numero || !password) {
    throw new Error("Champs manquants");
  }

  const adminsRef = collection(db, "admins");
  console.log(adminsRef)
  const q = query(
    adminsRef,
    where("numero", "==", numero)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Admin introuvable");
  }

  // 🔥 normalement UN SEUL document
  const adminDoc = snapshot.docs[0];
  const admin = adminDoc.data();

  if (admin.password !== password) {
    throw new Error("Mot de passe incorrect");
  }

  const token = uuidv4();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 240; // 24h

  await updateDoc(adminDoc.ref, {
    token,
    expiresAt,
  });

  return {
    password: admin.password,
    expiresAt,
    adminId: adminDoc.id,
  };
}
