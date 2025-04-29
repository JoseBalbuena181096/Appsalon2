import express from 'express'; 
import dotenv from 'dotenv';
import colors from 'colors';
import { db } from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

// Configurar la app
const app = express();

// leer datos
app.use(express.json());

// Conectar a la base de datos
db();

// Configurar CORS

const whitelist = [process.env.FRONTEND_URL];

if(process.argv[2] === '--postman') {
    whitelist.push(undefined);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            // Permitir la conexion
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

// Definir una ruta
// usamos un middleware
app.use('/api/services', servicesRoutes);

// Definir puerto
// process.env.PORT es el puerto que se define en el archivo .env
const PORT = process.env.PORT || 4000;

// arrancar la app  
app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold(`Server is running on port ${PORT}`));
});    


