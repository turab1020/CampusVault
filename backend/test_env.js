import dotenv from 'dotenv';
import path from 'path';

console.log('Current working directory:', process.cwd());
const envPath = path.join(process.cwd(), '.env');
console.log('Loading .env from:', envPath);

const result = dotenv.config();

if (result.error) {
    console.error('Error loading .env:', result.error);
} else {
    console.log('.env loaded successfully');
}

console.log('PORT:', process.env.PORT);
