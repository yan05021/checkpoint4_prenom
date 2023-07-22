import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* eslint-disable react/jsx-props-no-spreading */

function Quiz() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addResult = (data) => {
    // Récupération de l'user_id depuis le localStorage
    const userId = localStorage.getItem("user_id");
    // Assurez-vous que l'user_id est présent avant d'envoyer la requête
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    // Ajoutez l'ID utilisateur aux données envoyées à votre back-end
    // data.user_id = userId;
    const resultData = {
      ...data,
      user_id: userId,
    };
    // console.log(resultData);

    // console.log(data);
    axios
      .post("http://localhost:5000/api/results", resultData)
      .then(() => {
        navigate("/results");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="quiz_container">
      <div className="quiz_title">
        <h1>Jeu de Devinettes du Bébé!</h1>
        <h2>
          As-tu le sixième sens pour deviner les détails de notre futur bébé?
        </h2>
      </div>

      <form className="quiz_form" onSubmit={handleSubmit(addResult)}>
        <div>
          <label htmlFor="guessed_name">
            Selon toi, quel sera le prénom du bébé?
          </label>
        </div>

        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input
            type="text"
            name="guessed_name"
            {...register("guessed_name", {
              required: "Ce champ est requis",
              maxLength: {
                value: 20,
                message: "Le prénom ne peut pas dépasser 20 caractères",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/i,
                message: "Veuillez entrer un prénom valide",
              },
            })}
          />
          {errors.guessed_name && (
            <span className="quiz_form_error">
              {errors.guessed_name.message}
            </span>
          )}
        </div>

        <div>
          <div className="quiz_radio">
            <label htmlFor="quiz_radio">
              Quel sera le sexe du bébé selon toi?
            </label>
            <div>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <input
                type="radio"
                value="Masculin"
                name="gender"
                id="male"
                {...register("gender", {
                  required: "Ce champ est requis",
                })}
              />
              <label htmlFor="male">Masculin</label>
            </div>

            <div>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <input
                type="radio"
                value="Féminin"
                name="gender"
                id="female"
                {...register("gender", {
                  required: "Ce champ est requis",
                })}
              />
              <label htmlFor="female">Féminin</label>
            </div>
          </div>

          {errors.gender && (
            <span className="quiz_form_error">{errors.gender.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="weight">
            Quel sera le poids du bébé à la naissance selon toi (en kg)?
          </label>
        </div>

        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input
            type="text"
            name="weight"
            {...register("weight", {
              required: "Ce champ est requis",
              maxLength: {
                value: 5, // Poids maximal typique d'un bébé : 5.5kg donc 5 caractères max avec le point décimal
                message: "Le poids ne peut pas dépasser 5 caractères (ex: 4.5)",
              },
              pattern: {
                value: /^\d+(\.\d{1,2})?$/, // Accepte des chiffres avec éventuellement un ou deux décimales
                message: "Veuillez entrer un poids valide (ex: 3.5)",
              },
            })}
          />
          {errors.weight && (
            <span className="quiz_form_error">{errors.weight.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="height">
            Quelle sera la taille du bébé à la naissance selon toi (en cm) ?
          </label>
        </div>

        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input
            type="text"
            name="height"
            {...register("height", {
              required: "Ce champ est requis",
              maxLength: {
                value: 3, // La taille typique d'un bébé à la naissance varie entre 45 et 55 cm.
                message: "La taille ne peut pas dépasser 3 chiffres",
              },
              pattern: {
                value: /^\d{2,3}$/, // Accepte des chiffres de 2 à 3 caractères (pour représenter de 45cm à 999cm - même si ce dernier est improbable)
                message:
                  "Veuillez entrer une taille valide en centimètres (ex: 50)",
              },
            })}
          />
          {errors.height && (
            <span className="quiz_form_error">{errors.height.message}</span>
          )}
        </div>

        <button className="quiz_form_button" type="submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Quiz;
