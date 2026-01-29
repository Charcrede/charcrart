import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Terme } from "@/types/terme";


export async function getTermById(termId: string): Promise<Terme> {
  if (!termId) {
    throw new Error("termId manquant");
  }

  const termRef = doc(db, "terms", termId);
  const termSnap = await getDoc(termRef);

  if (!termSnap.exists()) {
    throw new Error("Terme introuvable");
  }

  return {
    id: termSnap.id,
    ...(termSnap.data() as Omit<Terme, "id">),
  };
}
