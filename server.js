import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Для __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Отдаём статику
app.use(express.static(path.join(__dirname, 'dist')));

// fallback для Vue Router History mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
