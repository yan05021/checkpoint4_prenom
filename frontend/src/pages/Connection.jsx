import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/jsx-props-no-spreading */

function Connection() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(errors);

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Stocker user_id dans le localStorage
          localStorage.setItem("user_id", result.user.id); // suppose que ton API retourne un objet "user" avec un champ "id".
          if (result.hasResult) {
            navigate("/results");
          } else {
            navigate("/quiz");
          }
        } else {
          setServerError(result.message || "Erreur lors de la connexion");
        }
      } else {
        const result = await response.json();
        setServerError(result.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion", error);
      setServerError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="connection_container">
      <div className="connection_title">
        <h1>Bienvenue sur PRENOM!</h1>
        <h2>Prêt à deviner le prénom du bébé ?</h2>
        <p id="explication">
          Connecte-toi pour faire votre devinette ou voir les propositions des
          autres.
        </p>
      </div>

      {serverError && <p className="error">{serverError}</p>}
      <form className="connection_form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}

          <input
            type="text"
            name="first_name"
            {...register("first_name", {
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
            placeholder="Ton prénom *"
          />
          {errors.first_name && (
            <span className="connection_form_error">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}

          <input
            type="text"
            name="last_name"
            {...register("last_name", {
              required: "Ce champ est requis",
              maxLength: {
                value: 20,
                message: "Le nom ne peut pas dépasser 20 caractères",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/i,
                message: "Veuillez entrer un nom valide",
              },
            })}
            placeholder="Ton nom *"
          />
          {errors.last_name && (
            <span className="connection_form_error">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}

          <input
            type="text"
            name="phone_number"
            {...register("phone_number", {
              required: "Ce champ est requis",

              pattern: {
                value: /^\d{1,15}$/,
                message: "Numéro de téléphone invalide",
              },
            })}
            placeholder="Ton numéro de téléphone *"
          />
          {errors.phone_number && (
            <span className="connection_form_error">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        <button className="connection_form_button" type="submit">
          Connextion
        </button>
      </form>
    </div>
  );
}

export default Connection;
