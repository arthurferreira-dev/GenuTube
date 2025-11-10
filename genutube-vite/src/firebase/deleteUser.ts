import {
  signOut,
  deleteUser,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { removeUserDB } from "./removeUserDB";
import { useUserStore } from "../store/useUserStore";

export const DeleteUser = async () => {
  const userAuth = auth.currentUser;
  if (!userAuth) return;

  const { user, setUser } = useUserStore.getState();
  if (!user) return;

  try {
    const lastSignInStr = userAuth.metadata.lastSignInTime;
    if (!lastSignInStr)
      throw new Error("Não foi possível obter a hora do último login");

    const lastSignInTime = new Date(lastSignInStr).getTime();
    const fiveMinutes = 5 * 60 * 1000;

    if (Date.now() - lastSignInTime > fiveMinutes) {
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(userAuth, provider);
      console.log("Reauthentication finished");
    } else {
      console.log("Recent login. Reauthentication not really necessary!");
    }

    await removeUserDB(user);

    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }

    await signOut(auth);
    localStorage.removeItem("userData");
    setUser(null);

    console.log("Sucess to delete this user!");
  } catch (error) {
    console.error("Error to delete this user: ", error);
  }
};
