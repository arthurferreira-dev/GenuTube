import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { GoogleUserProps } from "../utils/props";

export const AddUserDB: (userObj: GoogleUserProps) => Promise<void> = async (userObj: GoogleUserProps) => {
  try {
    await setDoc(doc(db, "users", userObj.id.toString()), userObj, { merge: true });
    console.log('The Document as created!');
  } catch (error) {
    console.error("Error to add this document: ", error);
  }
};