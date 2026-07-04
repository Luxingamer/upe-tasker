const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/upe-tasker')
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error("Erreur MongoDB :", err));

// Schéma
const SchemaTache = new mongoose.Schema({
    label: { type: String, required: true }
});

const Tache = mongoose.model('Tache', SchemaTache);

// Routes API
app.get('/api/tasks', async (req, res) => {
    const taches = await Tache.find();
    res.json(taches);
});

app.post('/api/tasks', async (req, res) => {
    const label = req.body.label?.trim();
    if (!label) return res.status(400).json({ error: "Label vide" });

    const tache = new Tache({ label });
    await tache.save();
    res.status(201).json(tache);
});

app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const label = req.body.label?.trim();

    if (!label) return res.status(400).json({ error: "Label vide" });

    const tache = await Tache.findByIdAndUpdate(id, { label }, { new: true });
    res.json(tache);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Tache.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
});

// Serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé : http://localhost:${PORT}`);
});
