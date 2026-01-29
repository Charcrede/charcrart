import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type LoginStatus =
  | { status: "connected" }
  | { status: "not_connected"; reason: string };

export async function checkAdminLogin(
  adminId: string,
  token: string
): Promise<LoginStatus> {

  if (!adminId || !token) {
    return { status: "not_connected", reason: "missing_credentials" };
  }

  const adminRef = doc(db, "admins", adminId);
  const adminSnap = await getDoc(adminRef);

  if (!adminSnap.exists()) {
    return { status: "not_connected", reason: "admin_not_found" };
  }

  const admin = adminSnap.data();

  // 🔐 Token mismatch
  if (!admin.token || admin.token !== token) {
    return { status: "not_connected", reason: "invalid_token" };
  }

  // ⏰ Expiration check
  if (!admin.expiresAt || admin.expiresAt < Date.now()) {
    return { status: "not_connected", reason: "token_expired" };
  }

  return { status: "connected" };
}
