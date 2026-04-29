import './style.css'
import { recipes } from './recipes.js'

// State
let fridgeIngredients = ["Pomodoro", "Pasta"];
let pantryIngredients = ["Olio", "Sale", "Aglio"];

const commonPantry = [
  "Olio", "Sale", "Pepe", "Zucchero", "Farina", "Pasta", "Riso", 
  "Uova", "Burro", "Aglio", "Cipolla", "Latte", "Parmigiano", "Pane"
];

// Elements
const ingredientForm = document.getElementById('ingredient-form');
const ingredientInput = document.getElementById('ingredient-input');
const fridgeTagsContainer = document.getElementById('fridge-tags');
const pantryGrid = document.getElementById('pantry-grid');
const resultsContainer = document.getElementById('results-container');

// Init
function init() {
  renderPantry();
  renderFridgeTags();
  renderResults();
  
  ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = ingredientInput.value.trim();
    if (val && !fridgeIngredients.includes(val)) {
      addFridgeIngredient(val);
      ingredientInput.value = '';
    }
  });
}

function addFridgeIngredient(name) {
  fridgeIngredients.push(name);
  renderFridgeTags();
  renderResults();
}

function removeFridgeIngredient(name) {
  fridgeIngredients = fridgeIngredients.filter(i => i !== name);
  renderFridgeTags();
  renderResults();
}

function togglePantryItem(name) {
  if (pantryIngredients.includes(name)) {
    pantryIngredients = pantryIngredients.filter(i => i !== name);
  } else {
    pantryIngredients.push(name);
  }
  renderPantry();
  renderResults();
}

function renderFridgeTags() {
  fridgeTagsContainer.innerHTML = fridgeIngredients.map(ing => `
    <div class="tag">
      ${ing}
      <button onclick="window.removeIng('${ing}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  `).join('');
}

// Global expose for onclick
window.removeIng = removeFridgeIngredient;
window.togglePantry = togglePantryItem;

function renderPantry() {
  pantryGrid.innerHTML = commonPantry.map(item => `
    <div class="pantry-item ${pantryIngredients.includes(item) ? 'active' : ''}" onclick="window.togglePantry('${item}')">
      ${item}
    </div>
  `).join('');
}

function findMatchingRecipes() {
  const allAvailable = [...fridgeIngredients, ...pantryIngredients].map(i => i.toLowerCase());
  
  if (allAvailable.length === 0) return { exact: [], partial: [] };

  const exact = [];
  const partial = [];

  recipes.forEach(recipe => {
    const missing = recipe.ingredients.filter(ing => 
      !allAvailable.some(available => 
        ing.toLowerCase().includes(available.toLowerCase()) || 
        available.toLowerCase().includes(ing.toLowerCase())
      )
    );

    if (missing.length === 0) {
      exact.push(recipe);
    } else if (missing.length <= 2) {
      partial.push({ ...recipe, missing });
    }
  });

  return { exact, partial };
}

function renderResults() {
  const { exact, partial } = findMatchingRecipes();
  
  if (exact.length === 0 && partial.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
        <p>${fridgeIngredients.length + pantryIngredients.length > 0 ? 'Nessuna ricetta trovata. Prova ad aggiungere altri ingredienti base come Olio, Sale o Pasta!' : 'Aggiungi ingredienti per scoprire cosa puoi cucinare!'}</p>
      </div>
    `;
    return;
  }

  let html = '';

  if (exact.length > 0) {
    html += `<h2 style="margin-top: 1rem;">Ricette pronte ora</h2>`;
    html += exact.map(recipe => renderRecipeCard(recipe, [])).join('');
  }

  if (partial.length > 0) {
    html += `<h2 style="margin-top: 2rem; opacity: 0.7;">Ti manca poco...</h2>`;
    html += partial.map(recipe => renderRecipeCard(recipe, recipe.missing)).join('');
  }

  resultsContainer.innerHTML = html;
}

function renderRecipeCard(recipe, missing) {
  const allAvailable = [...fridgeIngredients, ...pantryIngredients].map(i => i.toLowerCase());

  return `
    <div class="glass-card recipe-card ${missing.length > 0 ? 'partial' : ''}">
      <div class="recipe-header">
        <div>
          <span class="match-badge">${recipe.category}</span>
          <h3 class="recipe-title">${recipe.title}</h3>
        </div>
        ${missing.length > 0 ? `<span class="missing-badge">Mancano ${missing.length} ingredienti</span>` : ''}
      </div>
      <div class="recipe-ingredients">
        ${recipe.ingredients.map(ing => {
          const isMissing = missing.some(m => m.toLowerCase() === ing.toLowerCase());
          return `<span class="ingredient-chip ${isMissing ? 'missing' : ''}">${ing}</span>`;
        }).join('')}
      </div>
      <p class="recipe-instructions">${recipe.instructions}</p>
    </div>
  `;
}

init();
