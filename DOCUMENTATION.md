# FridgeChef Documentation

- [2026-04-29 09:18]: **Inizio Progetto**
  - *Details*: Creato un sito web moderno per la generazione di ricette basate sugli ingredienti disponibili.
  - *Tech Notes*: 
    - Framework: Vite (Vanilla JS).
    - Design: Glassmorphism, Dark Theme, Custom Background Image.
    - Logic: Algoritmo intelligente con "Smart Filtering" e integrazione Spesa/Frigo:
        1.  **Match Parziali**: Mostra ricette con >40% di ingredienti comuni.
        2.  **Ingrediente Principale Obbligatorio**: Controllo rigoroso sulla presenza dell'ingrediente core.
        3.  **Automazione Spesa**: Pulsante "Segna da fare" per aggiungere mancanze alla spesa.
        4.  **Check-in Ingredienti**: Pulsante "Tick" nella lista spesa che sposta automaticamente l'ingrediente nel Frigo.
        5.  **Gestione Tab**: Navigazione fluida tra Ricette e Lista Spesa.
    - Database: Imponente database di 150 ricette che copre ogni categoria e cucina.
    - Assets: Immagine di sfondo generata tramite AI (`public/bg.png`).

## Architettura
- `index.html`: Struttura semantica con Google Fonts (Outfit).
- `src/style.css`: Sistema di design basato su variabili CSS, glassmorphism e animazioni fluide.
- `src/main.js`: Gestione dello stato (frigo + dispensa) e algoritmo di matching.
- `src/recipes.js`: Database locale di ricette pre-caricate.

## Prossimi Passi (Suggeriti)
- Aggiunta di persistenza locale (LocalStorage) per salvare il contenuto del frigo.
- Integrazione con un'API esterna per espandere il database delle ricette.
- Funzione di stampa/salvataggio ricetta.
