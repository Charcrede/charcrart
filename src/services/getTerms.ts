import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Terme } from "@/types/terme";


export async function getTerms(): Promise<Terme[]> {
  const q = query(
    collection(db, "terms"),
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Terme, "id">)
  }));
}
