import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { AddUserDB } from "../firebase/addUserDB";
import type { GoogleUserProps } from "../utils/props";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { DeleteUser } from "../firebase/deleteUser";

export const AccountPage = () => {
  const { user, setUser } = useUserStore();
  const [login, setLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const LoginUserWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        photo: user.photoURL || "",
      };
      setLogin(true);
      setUser(userData);
      await AddUserDB(userData); // Save in the Firestore Database [Firebase]
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: GoogleUserProps = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          photo: firebaseUser.photoURL || "",
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
        setLogin(true);
      } else {
        localStorage.removeItem("userData");
        setUser(null);
        setLogin(false);
      }
    });

    return () => unsubcribe();
  }, [setUser]);

  const Content = () => {
    return (
      <main className="w-screen h-screen flex flex-col flex-wrap justify-center items-center font-[poppins]">
        <div className="flex flex-col flex-wrap gap-7">
          <div className="flex flex-col flex-wrap gap-1 justify-center items-center">
            <h1 className="text-xl">
              Bem vindo(a) <span className="font-semibold">{user?.name}</span>
            </h1>
            <h5 className="text-[0.9rem]">{user?.email}</h5>
          </div>
          <img
            className="rounded-full w-36 mx-auto"
            src={user?.photo}
            alt={`${user?.name} [Avatar]`}
          />
          <div className="flex flex-col flex-wrap justify-center items-center gap-4">
            <button
              className="p-2 font-[rubik] w-[250px] text-white tracking-wide rounded-lg bg-violet-600 duration-300 hover:bg-violet-700 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              Voltar
            </button>
            <button className="p-2 font-[rubik] w-[250px] text-white tracking-wide rounded-lg duration-300 bg-red-600 hover:bg-red-700 hover:cursor-pointer" onClick={DeleteUser}>
              Sair
            </button>
          </div>
        </div>
      </main>
    );
  };

  const ButtonLogin = () => {
    return (
      <div className="w-screen h-screen flex flex-col flex-wrap justify-center items-center">
        <button
          className="w-[250px] tracking-wide p-2 text-white bg-sky-600 duration-300 hover:bg-sky-700 hover:cursor-pointer mx-auto block rounded-lg my-3 font-[rubik]"
          onClick={LoginUserWithGoogle}
        >
          Login
        </button>
      </div>
    );
  };

  return <>{login ? <Content /> : <ButtonLogin />}</>;
};
