// PREZZI ORARI PER TIPO DI LAVORO
// Questi sono i costi orari per ciascun tipo di servizio
const PREZZI_ORARI = {
    backend: 20.50,    // Prezzo orario per sviluppo backend
    frontend: 15.30,   // Prezzo orario per sviluppo frontend
    analysis: 33.60    // Prezzo orario per analisi di progetto
};

// CODICI PROMOZIONALI
// Lista dei codici promozionali validi per ottenere uno sconto
const CODICI_PROMO_VALIDI = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];

// Percentuale di sconto applicata con un codice promozionale valido
const PERCENTUALE_SCONTO = 25; // 25% di sconto

// ELEMENTI DEL DOM
// Recuperiamo i riferimenti agli elementi HTML che ci servono
const form = document.getElementById('preventivo-form');
const tipoLavoroSelect = document.getElementById('tipo-lavoro');
// Il campo oreLavoroInput è stato rimosso dall'HTML, quindi definiamo un valore predefinito
// const oreLavoroInput = document.getElementById('ore-lavoro');
const codicePromoInput = document.getElementById('codice-promo');
const promoMessage = document.getElementById('promo-message');
const prezzoFinale = document.getElementById('prezzo-finale');

// FUNZIONI

// Funzione per formattare il prezzo con 2 decimali
function formatoPrezzo(prezzo) {
    return prezzo.toFixed(2);
}

// Funzione per verificare se un codice promozionale è valido
function isCodicPromoValido(codice) {
    // Controlla se il codice è presente nell'array dei codici validi
    return CODICI_PROMO_VALIDI.includes(codice);
}

// Funzione principale per calcolare il prezzo
function calcolaPrezzo() {
    // 1. Recupera il tipo di lavoro selezionato
    const tipoLavoro = tipoLavoroSelect.value;

    // 2. Utilizziamo un valore predefinito per le ore di lavoro (10)
    const oreLavoro = 10; // Valore fisso poiché il campo è stato rimosso

    // 3. Verifica che sia stato selezionato un tipo di lavoro
    if (!tipoLavoro) {
        alert('Seleziona un tipo di lavoro');
        return;
    }

    // 4. Verifica che le ore siano un numero valido
    if (isNaN(oreLavoro) || oreLavoro <= 0) {
        alert('Inserisci un numero valido di ore');
        return;
    }

    // 5. Calcola il prezzo base (prezzo orario × numero di ore)
    let prezzo = PREZZI_ORARI[tipoLavoro] * oreLavoro;

    // 6. Verifica se è stato inserito un codice promozionale
    const codicePromo = codicePromoInput.value.trim();

    if (codicePromo) {
        // 7. Se il codice è valido, applica lo sconto
        if (isCodicPromoValido(codicePromo)) {
            // Calcola lo sconto (prezzo × percentuale / 100)
            const sconto = (prezzo * PERCENTUALE_SCONTO) / 100;
            // Sottrai lo sconto dal prezzo
            prezzo -= sconto;

            // Mostra messaggio di successo
            promoMessage.textContent = `Codice promozionale valido! Sconto del ${PERCENTUALE_SCONTO}% applicato.`;
            promoMessage.className = 'form-text valid-promo';
        } else {
            // Mostra messaggio di errore
            promoMessage.textContent = 'Codice promozionale non valido.';
            promoMessage.className = 'form-text invalid-promo';
        }
    } else {
        // Resetta il messaggio se non c'è codice
        promoMessage.textContent = '';
        promoMessage.className = 'form-text';
    }

    // 8. Aggiorna il prezzo visualizzato
    prezzoFinale.textContent = formatoPrezzo(prezzo);
}

// EVENTI

// Quando il form viene inviato
form.addEventListener('submit', function (event) {
    // Previeni il comportamento predefinito (ricarica della pagina)
    event.preventDefault();

    // Calcola il prezzo
    calcolaPrezzo();
});

// Quando viene digitato qualcosa nel campo del codice promozionale
codicePromoInput.addEventListener('input', function () {
    const codicePromo = codicePromoInput.value.trim();

    // Se il campo è vuoto, resetta il messaggio
    if (!codicePromo) {
        promoMessage.textContent = '';
        promoMessage.className = 'form-text';
        return;
    }

    // Verifica il codice promozionale in tempo reale
    if (isCodicPromoValido(codicePromo)) {
        promoMessage.textContent = 'Codice promozionale valido!';
        promoMessage.className = 'form-text valid-promo';
    } else {
        promoMessage.textContent = 'Codice promozionale non valido.';
        promoMessage.className = 'form-text invalid-promo';
    }
});

// Ricalcola il prezzo quando cambia il tipo di lavoro
tipoLavoroSelect.addEventListener('change', calcolaPrezzo);

// oreLavoroInput.addEventListener('input', calcolaPrezzo);