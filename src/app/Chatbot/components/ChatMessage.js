import React from 'react';

const ChatMessage = ({ text, isUser }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                margin: '8px 0',
            }}
        >
            <div
                style={{
                    backgroundColor: isUser ? '#007bff' : '#e9ecef', // Azul para el usuario, gris para el bot
                    color: isUser ? 'white' : 'black', // Texto blanco para el usuario, negro para el bot
                    padding: '10px 15px',
                    borderRadius: isUser ? '15px 15px 0 15px' : '15px 15px 15px 0', // Bordes redondeados
                    maxWidth: '70%',
                    wordWrap: 'break-word',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra ligera
                }}
            >
                {text}
            </div>
        </div>
    );
};

export default ChatMessage;