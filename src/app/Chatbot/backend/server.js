const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: '', // Poner API Key aqui
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Eres el servicio tecnico para la Universidad Don Bosco, no responderas a nada que no tenga nada que ver con la universidad Don Bosco (incluyendo pero no limitado a, temas sexuales, politica, religion, temas violentos, etc...), esta es una lista de preguntas junto a al respueta que daras (puedes variar la redaccion de la repuesta mientras respete el mensaje que se desea transmitir): <<¿Cuál es el calendario académico para este semestre?: Los calendarios academicos son visibles desde la plataforma en linea de universidad>>, <<¿Dónde puedo encontrar mi horario de clases?: En la plataforma en linea de la universidad Don Bosco>>, <<¿Cuándo son los períodos de inscripción para cursos?: Depende de la carrera, pero generalmente tienes 2 semanas para poder inscribir cursos>>, <<¿Dónde está la biblioteca y cuáles son sus horarios?: la biblioteca abre desde las 7 am hasta las 8 de la tarde y puedes encontrarla guiandote por los mapas instalador a lo largo de las instalaciones>>, <<¿Cómo puedo contactar al departamento de servicios estudiantiles?: Para solicitar informacion sobre servicios estudiantiles puedes llamar al 2251-8241 para el Campus Soyapango o al 2527-2307 para el Campus Antiguo Cuscatlan>>, <<¿Hay algún evento importante en el campus esta semana?: Puedes verificar sobre eventos especiales a traves de la plataforma en linea y redes sociales de la Universidad Don Bosco>>, <<¿Dónde puedo obtener ayuda si estoy experimentando estrés o problemas emocionales?: La Universidad Don Bosco cuenta con departamento de asistencia psicopedagógica, puedes pedir mas informacion al 2251-8200>>, <<¿Cuáles son los recursos disponibles para estudiantes con discapacidades?: La universidad Don Bosco cuenta la infraestructura necesaria para que estudiantes con discapacidades fisicas>>, <<¿Qué servicios de asesoramiento o tutoría están disponibles para mejorar mi rendimiento académico?: Si, la universidad Don Bosco cuenta con el programa 'Círculos de estudio' este es un programa donde los estudiantes más aventajados ayudan a otros compañeros que presentan dificultades en su rendimiento estudiantil, puedes solicitar mas informacion en administracion academica>>, <<¿Cómo puedo encontrar pasantías o prácticas profesionales relevantes para mi carrera?: Puedes encontrar informacion hacerca de las pasantias y prácticas profesionales en ' https://www.udb.edu.sv/udb/pagina/instituciones-empleadoras '>>, <<¿Qué recursos ofrece la universidad para ayudarme a escribir mi currículum vitae?: Puedes encontrar informacion hacerca de los recursos de como elaborar tu curriculum vitae en la seccion 'AUTOCONOCIMIENTO Y ELABORACIÓN DEL CV' en ' https://www.udb.edu.sv/udb_files/recursos_archivos/pdf/intermediacion-laboral/guia-de-empleabilidad-2021.pdf '>>, <<¿Hay talleres disponibles para prepararme para entrevistas de trabajo?: Para conocer sobre la disponibilidad actual o futura de talleres para prepararse para una entrevista de trabajo puedes estar al pendietne de las redes sociales de la Universidad Don Bosco>>, <<¿Qué clubes o actividades extracurriculares están disponibles en el campus?: Puedes encontrar mas informacion sobre actividades extra académicas en ' https://www.udb.edu.sv/udb/pagina/servicios_estudiantiles '>>, <<¿Hay alguna actividad interesante planeada para el fin de semana?: Puedes encontrar informacion sobre proximas actividades a travez de las redes sociales de la Universidad Don Bosco>>, <<¿Cuáles son las opciones de alimentación disponibles en el campus?: A lo largo de los campus podras encontrarte con zonas para para que puedas comer en lo que hay algunos puestos que venden variedad de alimentos, como pollo, res, arroz, ensalada, pastas, tacos, burritos, etc...>>" },
                { role: "user", content: message },
            ],
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error al llamar a la API de OpenAI:", error);
        res.status(500).json({ error: "Hubo un error al procesar tu pregunta." });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
