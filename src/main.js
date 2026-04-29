import './style.css'
import { recipes } from './recipes.js'

// State
let fridgeIngredients = [];
let pantryIngredients = ["Olio", "Sale", "Aglio"]; // Default basics
let shoppingList = [];
let maxTime = 60; // Default 60 minutes
let activeTab = 'recipes';

// Persistence Functions
function saveState() {
  const state = {
    fridgeIngredients,
    pantryIngredients,
    shoppingList,
    maxTime
  };
  localStorage.setItem('fridgeChefState', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('fridgeChefState');
  if (saved) {
    try {
      const state = JSON.parse(saved);
      fridgeIngredients = state.fridgeIngredients || [];
      pantryIngredients = state.pantryIngredients !== undefined ? state.pantryIngredients : ["Olio", "Sale", "Aglio"];
      shoppingList = state.shoppingList || [];
      maxTime = state.maxTime || 60;
    } catch (e) {
      console.error("Error loading state", e);
    }
  }
}

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

const tabRecipesBtn = document.getElementById('tab-recipes');
const tabShoppingBtn = document.getElementById('tab-shopping');
const viewRecipes = document.getElementById('view-recipes');
const viewShopping = document.getElementById('view-shopping');
const mainTitle = document.getElementById('main-title');
const mainSubtitle = document.getElementById('main-subtitle');

const shoppingForm = document.getElementById('shopping-form');
const shoppingInput = document.getElementById('shopping-input');
const shoppingListContainer = document.getElementById('shopping-list-container');
const timeSlider = document.getElementById('time-slider');
const timeVal = document.getElementById('time-val');

// Init
function init() {
  loadState();
  
  // Sync slider UI
  if (timeSlider) {
    timeSlider.value = maxTime;
    timeVal.innerText = maxTime;
  }

  renderPantry();
  renderFridgeTags();
  renderResults();
  renderShoppingList();
  
  // Tab Switching
  tabRecipesBtn.addEventListener('click', () => switchTab('recipes'));
  tabShoppingBtn.addEventListener('click', () => switchTab('shopping'));

  ingredientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = ingredientInput.value.trim();
    if (val && !fridgeIngredients.includes(val)) {
      addFridgeIngredient(val);
      ingredientInput.value = '';
    }
  });

  shoppingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = shoppingInput.value.trim();
    if (val) {
      addShoppingItem(val, 'Manuale');
      shoppingInput.value = '';
    }
  });

  if (timeSlider) {
    timeSlider.addEventListener('input', (e) => {
      maxTime = parseInt(e.target.value);
      timeVal.innerText = maxTime;
      saveState();
      renderResults();
    });
  }
}

function switchTab(tab) {
  activeTab = tab;
  if (tab === 'recipes') {
    tabRecipesBtn.classList.add('active');
    tabShoppingBtn.classList.remove('active');
    viewRecipes.classList.add('active');
    viewShopping.classList.remove('active');
    mainTitle.innerText = "FridgeChef";
    mainSubtitle.innerText = "Inserisci quello che hai, noi troviamo la ricetta perfetta.";
  } else {
    tabRecipesBtn.classList.remove('active');
    tabShoppingBtn.classList.add('active');
    viewRecipes.classList.remove('active');
    viewShopping.classList.add('active');
    mainTitle.innerText = "Lista della Spesa";
    mainSubtitle.innerText = "Organizza i tuoi acquisti per le ricette che vuoi fare.";
  }
}

function addFridgeIngredient(name) {
  fridgeIngredients.push(name);
  saveState();
  renderFridgeTags();
  renderResults();
}

function removeFridgeIngredient(name) {
  fridgeIngredients = fridgeIngredients.filter(i => i !== name);
  saveState();
  renderFridgeTags();
  renderResults();
}

function togglePantryItem(name) {
  if (pantryIngredients.includes(name)) {
    pantryIngredients = pantryIngredients.filter(i => i !== name);
  } else {
    pantryIngredients.push(name);
  }
  saveState();
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

  // Helper to normalize words (very basic singular/plural)
  const normalize = (word) => word.toLowerCase()
    .replace(/i$/, 'o') // pomodori -> pomodoro
    .replace(/e$/, 'a'); // uova -> uova (special case handled below)

  const checkMatch = (ing, availableList) => {
    const nIng = normalize(ing);
    return availableList.some(avail => {
      const nAvail = normalize(avail);
      return nIng.includes(nAvail) || nAvail.includes(nIng) ||
             (ing.toLowerCase().includes('uov') && avail.toLowerCase().includes('uov')); // Special case for uovo/uova
    });
  };

  recipes.forEach(recipe => {
    // Filter by time first
    if (recipe.time > maxTime) return;

    const missing = recipe.ingredients.filter(ing => !checkMatch(ing, allAvailable));

    if (missing.length === 0) {
      exact.push(recipe);
    } else {
      // Calculate match percentage
      const matchScore = (recipe.ingredients.length - missing.length) / recipe.ingredients.length;
      
      // Suggest if we have at least 50% of ingredients AND we are not missing more than 3
      // AND the FIRST ingredient (usually the main one) is present
      // We ignore common bases like "Pane" or "Pasta" as the "main" ingredient if there are others
      const commonBases = ['pane', 'pasta', 'riso', 'acqua', 'olio', 'sale', 'farina'];
      let mainIng = recipe.ingredients[0];
      if (commonBases.includes(mainIng.toLowerCase()) && recipe.ingredients.length > 1) {
        mainIng = recipe.ingredients[1];
      }
      
      const mainIngredientPresent = checkMatch(mainIng, allAvailable);

      if (matchScore >= 0.4 && missing.length <= 4 && mainIngredientPresent) {
        partial.push({ ...recipe, missing, matchScore });
      }
    }
  });

  // Sort partial matches by matchScore (descending)
  partial.sort((a, b) => b.matchScore - a.matchScore);

  return { exact, partial };
}

function renderResults() {
  const { exact, partial } = findMatchingRecipes();
  
  if (exact.length === 0 && partial.length === 0) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg>
        <p>${fridgeIngredients.length + pantryIngredients.length > 0 ? 'Nessuna ricetta trovata con l\'ingrediente principale. Prova ad aggiungere altro!' : 'Aggiungi ingredienti per scoprire cosa puoi cucinare!'}</p>
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
  return `
    <div class="glass-card recipe-card ${missing.length > 0 ? 'partial' : ''}">
      <div class="recipe-header">
        <div>
          <span class="match-badge">${recipe.category}</span>
          <h3 class="recipe-title">${recipe.title}</h3>
          <div class="recipe-time">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${recipe.time} min
          </div>
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
      ${missing.length > 0 ? `
        <button class="btn-add-shopping" onclick="window.addRecipeToShopping(${recipe.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          Segna da fare (aggiungi ingredienti alla spesa)
        </button>
      ` : ''}
    </div>
  `;
}

// Shopping List Functions
function addShoppingItem(name, source) {
  if (!shoppingList.some(item => item.name.toLowerCase() === name.toLowerCase())) {
    shoppingList.push({ name, source });
    saveState();
    renderShoppingList();
  }
}

function removeShoppingItem(name) {
  shoppingList = shoppingList.filter(item => item.name !== name);
  saveState();
  renderShoppingList();
}

function completeShoppingItem(name) {
  // 1. Add to fridge
  if (!fridgeIngredients.includes(name)) {
    addFridgeIngredient(name);
  }
  // 2. Remove from shopping list
  removeShoppingItem(name);
}

window.addRecipeToShopping = (recipeId) => {
  const recipe = recipes.find(r => r.id === recipeId);
  const { partial } = findMatchingRecipes();
  const match = partial.find(p => p.id === recipeId);
  
  if (match) {
    match.missing.forEach(ing => {
      addShoppingItem(ing, recipe.title);
    });
    // Switch Tab
    switchTab('shopping');
  }
};

window.removeShoppingItem = removeShoppingItem;
window.completeShoppingItem = completeShoppingItem;

function renderShoppingList() {
  if (shoppingList.length === 0) {
    shoppingListContainer.innerHTML = `
      <div class="empty-state" style="padding: 2rem;">
        <p>La tua lista della spesa è vuota.</p>
      </div>
    `;
    return;
  }

  shoppingListContainer.innerHTML = shoppingList.map(item => `
    <div class="shopping-item">
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-from">${item.source}</span>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="complete" onclick="window.completeShoppingItem('${item.name}')" title="Aggiungi al frigo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
        <button class="remove" onclick="window.removeShoppingItem('${item.name}')" title="Rimuovi">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  `).join('');
}

init();
