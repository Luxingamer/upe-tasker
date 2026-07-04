// PHASE 1 : SÉLECTION DES COMPOSANTS
const formulaireTaches = document.getElementById('task-form');
const champSaisieTache = document.getElementById('task-input');
const conteneurListeTaches = document.getElementById('task-list');


// ===============================
// 1. AFFICHAGE D’UNE TÂCHE DANS LE DOM
// ===============================
function afficherUneTacheDansLeDOM(texte, idTache) {
    const nouvelElementLi = document.createElement('li');
    nouvelElementLi.classList.add('task-item');

    const zoneTexte = document.createElement('span');
    zoneTexte.textContent = texte;
    nouvelElementLi.appendChild(zoneTexte);

    const conteneurActions = document.createElement('div');

    // ----- BOUTON MODIFIER -----
    const boutonModifier = document.createElement('button');
    boutonModifier.textContent = "Mod";
    boutonModifier.classList.add('edit-btn');

    boutonModifier.addEventListener('click', () => {
        if (nouvelElementLi.querySelector('input[type="text"]')) return;

        const champEdition = document.createElement('input');
        champEdition.type = 'text';
        champEdition.value = zoneTexte.textContent;

        nouvelElementLi.replaceChild(champEdition, zoneTexte);
        champEdition.focus();
        boutonModifier.textContent = "Enregistrer";

        const sauvegarder = () => {
            const nouveauTexte = champEdition.value.trim();
            if (nouveauTexte !== "") {
                modifierTexteTacheSurLeServeur(idTache, nouveauTexte, zoneTexte);
            }
            nouvelElementLi.replaceChild(zoneTexte, champEdition);
            boutonModifier.textContent = "Mod";
        };

        champEdition.addEventListener('keypress', e => {
            if (e.key === 'Enter') sauvegarder();
        });

        boutonModifier.addEventListener('click', sauvegarder, { once: true });
    });

    conteneurActions.appendChild(boutonModifier);

    // ----- BOUTON SUPPRIMER -----
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = "Sup";
    boutonSupprimer.classList.add('delete-btn');

    boutonSupprimer.addEventListener('click', () => {
        supprimerTacheSurLeServeur(idTache, nouvelElementLi);
    });

    conteneurActions.appendChild(boutonSupprimer);

    nouvelElementLi.appendChild(conteneurActions);
    conteneurListeTaches.appendChild(nouvelElementLi);
}


// ===============================
// 2. CHARGEMENT DES TÂCHES
// ===============================
function chargerLesTachesDepuisLeServeur() {
    fetch('/api/tasks')
        .then(r => r.json())
        .then(taches => {
            conteneurListeTaches.innerHTML = "";
            taches.forEach(t => afficherUneTacheDansLeDOM(t.label, t._id));
        })
        .catch(err => console.error("Erreur chargement :", err));
}


// ===============================
// 3. ENREGISTREMENT D’UNE TÂCHE
// ===============================
function enregistrerTacheSurLeServeur(texteTache) {
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: texteTache })
    })
        .then(r => r.json())
        .then(t => afficherUneTacheDansLeDOM(t.label, t._id))
        .catch(err => console.error("Erreur création :", err));
}


// ===============================
// 4. MODIFICATION D’UNE TÂCHE
// ===============================
function modifierTexteTacheSurLeServeur(idTache, nouveauTexte, elementTexte) {
    fetch(`/api/tasks/${idTache}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: nouveauTexte })
    })
        .then(r => r.json())
        .then(t => elementTexte.textContent = t.label)
        .catch(err => console.error("Erreur modification :", err));
}


// ===============================
// 5. SUPPRESSION D’UNE TÂCHE
// ===============================
function supprimerTacheSurLeServeur(idTache, elementHtmlAEffacer) {
    fetch(`/api/tasks/${idTache}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(() => elementHtmlAEffacer.remove())
        .catch(err => console.error("Erreur suppression :", err));
}


// ===============================
// 6. ÉCOUTEUR DU FORMULAIRE
// ===============================
formulaireTaches.addEventListener('submit', e => {
    e.preventDefault();

    const texte = champSaisieTache.value.trim();
    if (texte === "") return alert("Veuillez saisir une tâche.");

    enregistrerTacheSurLeServeur(texte);
    champSaisieTache.value = "";
    champSaisieTache.focus();
});


// ===============================
// 7. CHARGEMENT INITIAL
// ===============================
chargerLesTachesDepuisLeServeur();