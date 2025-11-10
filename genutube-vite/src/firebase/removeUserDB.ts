import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { GoogleUserProps } from "../utils/props";

export const removeUserDB: (userObj: GoogleUserProps) => Promise<void> = async (
  userObj: GoogleUserProps
) => {
  try {
    await deleteDoc(doc(db, "users", userObj.id.toString()));
    console.log('Sucess to delete this doc!: ', userObj.id)
  } catch (error) {
    console.error("Error to delete this doc: ", error);
  }
};