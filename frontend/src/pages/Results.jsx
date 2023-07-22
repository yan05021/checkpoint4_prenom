import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const currentUserID = localStorage.getItem("user_id");

  // console.log(currentUserID);

  const updateResults = () => {
    axios
      .get(`http://localhost:5000/api/results`)
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  };

  useEffect(() => {
    updateResults();
  }, []);

  const handleModify = () => {
    navigate(`/quiz`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/results/${id}`)
      .then(() => {
        updateResults();
      })
      .catch((error) => {
        console.error("Error deleting result:", error);
      });
  };

  return (
    <div className="results_container">
      <div className="results_title">
        <h1>Résultats des devinettes</h1>
        <h2>Découvre les prédictions de chaque participant :</h2>
      </div>
      <table className="results_table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Prénom deviné</th>
            <th>Sexe</th>
            <th>Poids (kg)</th>
            <th>Taille (cm)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            // console.log("Current User ID:", currentUserID);
            // console.log("Result User ID for result with ID", result.user_id);

            return (
              <tr key={index.id}>
                <td>{result.first_name}</td>
                <td>{result.last_name}</td>
                <td>{result.guessed_name}</td>
                <td>{result.gender}</td>
                <td>{result.weight}</td>
                <td>{result.height}</td>
                <td>
                  {Number(currentUserID) === result.user_id && (
                    <div className="result_buttons">
                      <button
                        type="button"
                        className="result_button"
                        onClick={() => handleModify(result.user_id)}
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        className="result_button"
                        onClick={() => handleDelete(result.user_id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
