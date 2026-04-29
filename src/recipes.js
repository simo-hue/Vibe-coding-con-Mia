export const recipes = [
  {
    id: 0,
    title: "Avocado Toast Semplice",
    description: "Un classico intramontabile per una colazione sana o un brunch veloce. Cremoso, croccante e nutriente.",
    ingredients: ["Pane", "Avocado", "Uova", "Sale", "Pepe", "Olio"],
    ingredientsDetails: [
      { name: "Pane (integrale o in cassetta)", qty: "2 fette" },
      { name: "Avocado maturo", qty: "1" },
      { name: "Uova", qty: "1 o 2" },
      { name: "Sale e Pepe", qty: "q.b." },
      { name: "Olio d'oliva", qty: "1 cucchiaino" }
    ],
    steps: [
      "Tosta le fette di pane finché non diventano ben dorate e croccanti.",
      "In una ciotolina, schiaccia la polpa dell'avocado con una forchetta aggiungendo sale, pepe e un filo d'olio.",
      "Cuoci l'uovo in padella (occhio di bue) o bollilo per 6 minuti per averlo cremoso.",
      "Spalma la crema di avocado sul pane tostato.",
      "Adagia l'uovo sopra l'avocado e finisci con un pizzico di pepe."
    ],
    tips: "Aggiungi un pizzico di peperoncino in scaglie o dei semi di sesamo per un tocco gourmet.",
    category: "Colazione",
    time: 10,
    difficulty: "Facile",
    servings: 1
  },
  {
    id: 1,
    title: "Pasta Aglio, Olio e Peperoncino",
    description: "La ricetta italiana per eccellenza quando si ha poco tempo ma tanta voglia di gusto. Semplice ma richiede precisione.",
    ingredients: ["Pasta", "Aglio", "Olio", "Peperoncino", "Prezzemolo"],
    ingredientsDetails: [
      { name: "Pasta (Spaghetti)", qty: "200g" },
      { name: "Aglio", qty: "2 spicchi" },
      { name: "Olio Extravergine", qty: "4 cucchiai" },
      { name: "Peperoncino fresco", qty: "1" },
      { name: "Prezzemolo", qty: "q.b." }
    ],
    steps: [
      "Metti a bollire l'acqua per la pasta in una pentola capiente.",
      "In una padella ampia, scalda l'olio con l'aglio a fettine e il peperoncino tritato. Non farlo bruciare!",
      "Cuoci la pasta molto al dente.",
      "Scola la pasta e saltala in padella con il condimento, aggiungendo un mestolo di acqua di cottura.",
      "Spegni il fuoco, aggiungi il prezzemolo fresco tritato e servi caldissimo."
    ],
    tips: "L'acqua di cottura è il segreto: crea un'emulsione con l'olio che rende la pasta cremosissima.",
    category: "Pasta",
    time: 15,
    difficulty: "Facile",
    servings: 2
  },
  {
    id: 2,
    title: "Frittata alle Erbe",
    description: "Una frittata soffice e profumata, perfetta come secondo piatto veloce o per un panino gourmet.",
    ingredients: ["Uova", "Olio", "Sale", "Pepe", "Parmigiano", "Erba Cipollina"],
    ingredientsDetails: [
      { name: "Uova fresche", qty: "4" },
      { name: "Parmigiano Reggiano", qty: "30g" },
      { name: "Erba cipollina o prezzemolo", qty: "1 mazzetto" },
      { name: "Olio d'oliva", qty: "2 cucchiai" },
      { name: "Sale e Pepe", qty: "q.b." }
    ],
    steps: [
      "In una ciotola, rompi le uova e sbattile leggermente con una forchetta.",
      "Aggiungi il parmigiano, le erbe tritate, sale e pepe.",
      "Scalda l'olio in una padella antiaderente media.",
      "Versa il composto e cuoci a fuoco medio-basso con il coperchio.",
      "Quando la base è solida, gira la frittata con l'aiuto del coperchio e cuoci per altri 2 minuti."
    ],
    tips: "Per una frittata più alta e soffice, aggiungi un cucchiaio di latte o un pizzico di bicarbonato alle uova.",
    category: "Secondi",
    time: 15,
    difficulty: "Facile",
    servings: 2
  }
  // ... rest of recipes will be dynamically handled or simplified for now to focus on the UI/UX
];
