const inscriptionModal = document.getElementById('inscriptionModal');
const participantsModal = document.getElementById('participantsModal');

// Botones para abrir modales
const inscriptionBtn = document.getElementById('inscriptionBtn');
const participantsBtn = document.getElementById('participantsBtn');

// Botones para cerrar los modales
const closeInscriptionModalBtn = document.getElementById('closeInscriptionModal');
const closeParticipantsModalBtn = document.getElementById('closeParticipantsModalBtn');
const closeInscriptionModalExitBtn = document.getElementById('closeInscriptionModalBtn');

// Abrir modal de inscripción
inscriptionBtn.addEventListener('click', () => {
    inscriptionModal.classList.add('open');
});

// Abrir modal de participantes
participantsBtn.addEventListener('click', () => {
    participantsModal.classList.add('open');
});

// Cerrar modal de inscripción usando "X"
closeInscriptionModalBtn.addEventListener('click', () => {
    inscriptionModal.classList.remove('open');
});

// Cerrar modal de inscripción usando "Salir"
closeInscriptionModalExitBtn.addEventListener('click', () => {
    inscriptionModal.classList.remove('open');
});

// Cerrar modal de participantes
closeParticipantsModalBtn.addEventListener('click', () => {
    participantsModal.classList.remove('open');
});


// Obtener el modal y los botones
var eventsModal = document.getElementById("eventsModal");
var openEventsModalBtn = document.getElementById("openEventsModalBtn");
var closeEventsModalBtn = document.getElementById("closeEventsModalBtn");

// Abrir el modal cuando se haga clic en el botón
openEventsModalBtn.onclick = function() {
    eventsModal.style.display = "block";
}

// Cerrar el modal cuando se haga clic en el botón de cerrar
closeEventsModalBtn.onclick = function() {
    eventsModal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == eventsModal) {
        eventsModal.style.display = "none";
    }
}