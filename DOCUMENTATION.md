# FridgeChef Documentation

- [2026-04-29 09:18]: **Inizio Progetto**
  - *Details*: Creato un sito web moderno per la generazione di ricette basate sugli ingredienti disponibili.
  - *Tech Notes*: 
    - Framework: Vite (Vanilla JS).
    - Design: Glassmorphism, Dark Theme, Custom Background Image.
    - Logic: Algoritmo migliorato con supporto a "Match Parziali" (mostra ricette a cui mancano 1-2 ingredienti).
    - Database: Espanso a 25+ ricette con piatti più semplici e vari.
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
