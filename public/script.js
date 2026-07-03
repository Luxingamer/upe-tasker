// PHASE 1 : SÉLECTION DES COMPOSANTS DANS L'ARBRE MÉMOIRE
const formulaireTaches = document.getElementById('task-form');
const champSaisieTache = document.getElementById('task-input');
const conteneurListeTaches = document.getElementById('task-list');


// PHASE 2 : BRANCHEMENT DU COMPORTEMENT APPLICATIF VIA L'ÉCOUTEUR
formulaireTaches.addEventListener('submit', function(evenementCapture) {

    // ÉTAPE DE SÉCURITÉ CRUCIALE : Annulation du rechargement automatique de la page
    evenementCapture.preventDefault();

    // Extraction et nettoyage de la chaîne textuelle saisie (.trim())
    const intituleTacheNettoye = champSaisieTache.value.trim();

    // CONTRÔLE DE VALIDITÉ
    if (intituleTacheNettoye === "") {
        alert("Erreur de saisie : L'intitulé de la tâche universitaire ne peut être vide.");
        return; 
    }


    // PHASE 3 : CRÉATION ALGORITHMIQUE DE LA NOUVELLE ENTITÉ
    const nouvelElementLi = document.createElement('li');
    nouvelElementLi.textContent = intituleTacheNettoye; // Évite les failles XSS
    nouvelElementLi.classList.add('task-item');


    // PHASE 4 : INJECTION PHYSIQUE AU SEIN DE L'INTERFACE GRAPHIQUE
    conteneurListeTaches.appendChild(nouvelElementLi);


    // PHASE 5 : OPTIMISATION DE L'UX
    champSaisieTache.value = "";
        champSaisieTache.focus();
});