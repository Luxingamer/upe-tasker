// INCLUSION DES MODULES VIA COMMONJS
const express = require('express');
const path = require('path');


// INITIALISATION DE L'APPLICATION ET CONFIGURATION DES PARAMÈTRES
const app = express();
const PORT_RESEAU = 3000;


// MISE EN PLACE DES MIDDLEWARES : Configuration de la distribution statique
app.use(express.static(path.join(__dirname, 'public')));


// EXTENSION : DÉCLARATION D'UNE ROUTE API TECHNIQUE DE CONTRÔLE DE SANTÉ
app.get('/api/status', (requestClient, responseServeur) => {
    responseServeur.json({
        status: "operational",
        serverTime: new Date().toISOString(),
        author: "Département Génie Logiciel - UPE",
        academicContext: {
            chapter: 2,
            topic: "Dynamisation Client et Logique Serveur Express"
        }
    });
});


// INITIATION ACTIVE DU PROCESSUS D'ÉCOUTE RESEAU
app.listen(PORT_RESEAU, () => {

console.log("====================================================================");
    console.log(" UNIVERSITÉ PRIVÉE DE L'ESTUAIRE - INFRASTRUCTURE APPLICATIVE ALERTE");

console.log("====================================================================");
    console.log(` -> Serveur HTTP démarré avec succès sur l'environnement local.`);
    console.log(` -> URL d'accès direct de l'application : http://localhost:${PORT_RESEAU}`);
    console.log(" -> Surveillance de code active via Nodemon : Rechargement opérationnel.");
    console.log(" -> Pour interrompre le processus serveur, faites l'action : CTRL + C");
console.log("====================================================================");});