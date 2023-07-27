"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); //Enquanto vai carregando a resposta

    try {
      const response = await fetch("/api/generate", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json(); //Resultada
      setResult(data);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false); //Quando ja tem a resposta
  };

  return (
    <>
      <div className="bg-black h-screen flex justify-center items-center">
        <form onSubmit={onSubmit}>
          <h1 className="text-white font-bold text-xl mb-40">
            GERANDO PIADAS SEM SENTIDO
          </h1>
          <input
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
            className="p-2 block bg-neutral-700 text-white w-full rounded-md "
            placeholder="Enter a prompt"
          />
          <button
            className="bg-green-500 p-2 rounded-md block mt-2 disabled:opacity-50"
            disabled={!prompt || loading}
          >
            {loading ? "Pensando..." : "Gerando Piada"}
          </button>
          {result && (
            <p className="text-xl font-bold text-white max-w-xs my-10">
              {result}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
