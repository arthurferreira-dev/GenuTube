import React, { useState, useRef } from "react";
import type { Props } from "../utils/props";

// @ts-expect-error: "validator/isEmail"
import isEmail from 'validator/lib/isEmail';

import { btnCL } from "../utils/ClassCss";
import { AddRatingDB } from "../firebase/addRatingDB";

export const RatingPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRating, setUserRating] = useState<string>("0");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const ratingData = {
    email: userEmail,
    rating: userRating
  }

  const FormController = ({ children }: Props) => {
    return (
      <div className="flex flex-col-reverse flex-wrap gap-5">{children}</div>
    );
  };
  const inputRef = useRef<HTMLInputElement>(null);

  console.info("Submitted Form Event: ", submitted);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (!userEmail) {
      alert("Preencha o campo de email!");
      inputRef.current?.focus();
      return;
    }

    if (isEmail(userEmail) === false) {
      alert('Porfavor coloque um email válido!')
      inputRef.current?.focus();
      return;
    }

    if (!userRating || userRating === "0") {
      alert("Porfavor, escolha uma nota!");
      return;
    }

    AddRatingDB(ratingData);

    console.info(
      `Obrigado(a) ${userEmail} por enviar seu feedback de ${Number(
        userRating
      ).toFixed(1)} estrelas!`
    );

    setUserEmail("");
    setUserRating("0");
    setSubmitted(false);
  };

  const percentageInput = (parseFloat(userRating) / 10) * 100;

  return (
    <main className="w-screen h-screen bg-gray-600 flex flex-col flex-wrap justify-center items-center gap-4">
      <div className="bg-gray-500/50 p-4 rounded-md text-white font-[poppins] flex flex-col flex-wrap gap-6">
        <form onSubmit={handleFormSubmit} className="flex flex-col flex-wrap gap-6">
          <FormController>
            <input
              ref={inputRef}
              type="text"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="no-focus input-[text-default] px-2 py-3 bg-slate-700/50"
              placeholder="exemplo@provedor.com"
            />
            <label htmlFor="userEmail">Email</label>
          </FormController>
          <FormController>
            <input
              type="range"
              id="userRating"
              value={userRating}
              onChange={(e) =>
                setUserRating(parseFloat(e.target.value).toString())
              }
              min={0}
              step={0.5}
              max={10}
              className="no-focus input-[range-blue] h-1.5"
              placeholder="0, 1, 0.5, 3,..."
              style={{
                background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${percentageInput}%, #ddd ${percentageInput}%, #ddd 100%)`
              }}
            />
            <label htmlFor="userRating">Nota: {userRating}</label>
          </FormController>
          <input
            type="submit"
            value="Enviar"
            className={`${btnCL} w-full bg-sky-500 hover:bg-sky-600`}
          />
        </form>
      </div>
    </main>
  );
};
