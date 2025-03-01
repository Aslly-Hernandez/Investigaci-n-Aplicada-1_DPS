'use client';

import React, { useState } from 'react';
import responses from './responses'; // Respuestas predeterminadas

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // Mensaje del usuario
        const userMessage = { text: input, isUser: true };
        setMessages([...messages, userMessage]);

        // Verifica si la pregunta tiene una respuesta predeterminada
        const predefinedResponse = responses[input.toLowerCase()];
        if (predefinedResponse) {
            // Si hay una respuesta predeterminada, úsala
            const botMessage = { text: predefinedResponse, isUser: false };
            setMessages((prev) => [...prev, botMessage]);
        } else {
            // Si no hay una respuesta predeterminada, llama a la API de OpenAI
            try {
                const response = await fetch('http://localhost:5000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: input }),
                });

                const data = await response.json();
                const botMessage = { text: data.response, isUser: false };
                setMessages((prev) => [...prev, botMessage]);
            } catch (error) {
                console.error("Error al llamar al backend:", error);
                const botMessage = { text: "Lo siento, hubo un error al procesar tu pregunta.", isUser: false };
                setMessages((prev) => [...prev, botMessage]);
            }
        }

        // Limpia el input
        setInput('');
    };

    return (
        <div style={{ width: '500px', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
            <div style={{ height: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                            margin: '8px 0',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.isUser ? '#009bff' : '#e9ecef', // Azul para el usuario gris para el bot
                                color: msg.isUser ? 'white' : 'black', // Texto Blanco para el usuario, negro para el bot
                                padding: '10px 15px',
                                borderRadius: msg.isUser ? '15px 15px 0 15px' : '15px 15px 15px 0', // Bordes redondeados
                                maxWidth: '70%',
                                wordWrap: 'break-word',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                style={{ width: '80%', padding: '5px', marginTop: '10px' }}
            />
            <button onClick={handleSend} style={{ padding: '5px 10px', marginTop: '10px' }}>Enviar</button>
        </div>
    );
};

export default Chatbot;