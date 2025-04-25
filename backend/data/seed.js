import dotenv from 'dotenv';
import colors from 'colors';
import {db} from '../config/db.js';
import Services from '../models/Services.js';
import { services } from '../data/beautyServices.js';


// Cargar variables de entorno
dotenv.config();

// Connect to MongoDB
await db();

async function seedDB() {
    try{
        await Services.insertMany(services);
        console.log(colors.green.bold('Database seeded successfully'));
        process.exit(0);
    }
    catch(error){
        console.log(colors.red.bold(`Error seeding database: ${error.message}`));
        process.exit(1);
    }
}

async function clearDB() {
    try{
        await Services.deleteMany();
        console.log(colors.green.bold('Database cleared successfully'));
        process.exit(0);
    }
    catch(error){
        console.log(colors.red.bold(`Error clearing database: ${error.message}`));
        process.exit(1);
    }
}

if (process.argv[2] === '--import') {
    seedDB();
}

if (process.argv[2] === '--destroy') {
    clearDB();
}