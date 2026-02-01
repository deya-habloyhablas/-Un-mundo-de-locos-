import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- DATOS ---
const lugares = [
  "En España", "En mi universidad", "En Hong Kong", "En Castilla y León",
  "En la Ciudad de México", "En Buenos Aires", "En el colegio",
  "En la biblioteca", "En la oficina", "En un hospital", "En la playa",
  "En el metro de Madrid", "En casa de mis padres", "En una boda", "En el cine"
];

const acciones = [
  "utilizar la calculadora", "usar el diccionario", "quedarse a comer",
  "tener el móvil encendido", "comer chicle", "llevar uniforme",
  "tutear al profesor", "ayudar a los ancianos", "tirar basura al suelo",
  "escuchar música alta", "lavar los platos", "hablar en voz alta",
  "llegar tarde", "fumar en la puerta", "jugar a la pelota",
  "llevar chanclas", "cocinar paella los domingos",
  "mirar a la gente a los ojos",
  "cruzar un paso de peatones con el semáforo en verde",
  "dar las gracias", "dar los buenos días", "dar un beso", "dar un abrazo",
  "dar la mano al saludar", "invitar a una fiesta", "invitar a comer a casa",
  "invitar a un café", "enviar un mensaje", "enviar una invitación",
  "enviar una felicitación", "enviar una nota de agradecimiento",
  "aceptar un regalo", "rechazar una invitación", "hacer un regalo",
  "hacer un cumplido", "hacer un elogio"
];

const normas = [
  { icono: "❌", texto: "poder" },
  { icono: "🙅", texto: "deber" },
  { icono: "🚫", texto: "prohibido" },
  { icono: "✅", texto: "obligatorio" },
  { icono: "❌", texto: "permitido" },
  { icono: "👍", texto: "permitido" }
];

interface GameState {
  lugar: string;
  norma: { icono: string; texto: string };
  accion: string;
}

const App = () => {
  const [started, setStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    lugar: '...',
    norma: { icono: '🚫', texto: '...' },
    accion: '...'
  });

  const obtenerAleatorio = <T,>(lista: T[]): T => {
    return lista[Math.floor(Math.random() * lista.length)];
  };

  const generarPartida = () => {
    setGameState({
      lugar: obtenerAleatorio(lugares),
      norma: obtenerAleatorio(normas),
      accion: obtenerAleatorio(acciones)
    });
  };

  const handleStart = () => {
    setStarted(true);
    generarPartida();
  };

  return (
    <>
      {/* Título (Pancarta) */}
      <div className="titulo-pancarta">¿Un mundo de locos?</div>

      {/* Pantalla de Inicio */}
      {!started && (
        <div className="pantalla-inicio">
          <button className="btn-crear" type="button" onClick={handleStart}>
            crear
          </button>
        </div>
      )}

      {/* Área del Juego */}
      {started && (
        <div className="area-juego">
          <div className="contenedor-columnas">
            
            {/* Columna 1: LUGAR */}
            <div className="columna">
              <div className="icono-grande">🌍</div>
              <div className="post-it">
                <div className="chincheta chincheta-roja"></div>
                <p>{gameState.lugar}</p>
              </div>
            </div>

            {/* Columna 2: NORMA */}
            <div className="columna">
              <div className="icono-grande">{gameState.norma.icono}</div>
              <div className="post-it">
                <div className="chincheta chincheta-verde"></div>
                <p>{gameState.norma.texto}</p>
              </div>
            </div>

            {/* Columna 3: ACCIÓN */}
            <div className="columna">
              <div className="icono-grande">🤔</div>
              <div className="post-it">
                <div className="chincheta chincheta-azul"></div>
                <p>{gameState.accion}</p>
              </div>
            </div>

          </div>

          <button className="btn-mas" type="button" onClick={generarPartida}>
            más
          </button>
        </div>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
