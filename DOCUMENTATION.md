# FridgeChef Documentation

- [2026-04-29 09:18]: **Inizio Progetto**
  - *Details*: Creato un sito web moderno per la generazione di ricette basate sugli ingredienti disponibili.
  - *Tech Notes*: 
    - Framework: Vite (Vanilla JS).
    - Design: Glassmorphism, Dark Theme, Custom Background Image.
    - Logic: Algoritmo intelligente con "Smart Filtering" e integrazione Spesa/Frigo:
        1.  **Vista Dettagliata Ricetta**: Modal premium con descrizione, porzioni, ingredienti e step numerati.
        2.  **Filtro Tempo Dinamico**: Slider per filtrare ricette con barra colorata progressiva in tempo reale.
        3.  **Persistenza Dati**: Salvataggio automatico di ingredienti, spesa e preferenze.
        4.  **Match Parziali**: Mostra ricette con >40% di ingredienti comuni.
        5.  **Ingrediente Principale Obbligatorio**: Controllo rigoroso sul "core ingredient".
        6.  **Automazione Spesa**: Integrazione diretta tra ricette mancate e lista spesa.
        7.  **Check-in Veloci**: Possibilità di spostare oggetti dalla spesa al frigo con un click.
        8.  **Gestione Tab**: Navigazione fluida tra Ricette e Lista Spesa.
    - Database: Imponente database di 151 ricette (ora con tempi di preparazione inclusi).
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
