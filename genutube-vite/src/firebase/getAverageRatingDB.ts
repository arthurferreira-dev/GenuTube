import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { RatingUserProps } from "../utils/props";

export const GetAverageRatingDB = async () => {
  try {
    const ratingCol = collection(db, "rating"); // referência à coleção
    const snapshot = await getDocs(ratingCol);

    if (snapshot.empty) {
      console.log("No ratings found");
      return null;
    }

    let total = 0;
    let count = 0;

    snapshot.forEach((doc) => {
      const data = doc.data() as RatingUserProps;
      if (typeof Number(data.rating) === "number") {
        total += Number(data.rating);
        count++;
      }
    });

    const average = total / count;
    return average;
  } catch (error) {
    console.error("Error to get the rating: ", error);
  }
};