import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import type { RatingUserProps } from "../utils/props";

export const AddRatingDB: (rateObj: RatingUserProps) => Promise<void> = async (
  rateObj: RatingUserProps
) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
      console.error("User not logged in or missing email");
      return;
    }

    const docRef = doc(db, "rating", currentUser.email);

    await setDoc(docRef, rateObj);
    console.log('The Rating Document has been created!');
  } catch (error) {
    console.error("Error to create a Rating Doc: ", error);
  }
};