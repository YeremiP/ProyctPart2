// Variables globales
let foodList = [];
let currentId = 1;

// Cargar los datos del Local Storage al iniciar
function loadFromLocalStorage() {
  const storedFoodList = localStorage.getItem('foodList');
  const storedId = localStorage.getItem('currentId');

  if (storedFoodList) {
    foodList = JSON.parse(storedFoodList);
  }

  if (storedId) {
    currentId = parseInt(storedId, 10);
  }

  renderFoodList();
}

// Guardar los datos en el Local Storage
function saveToLocalStorage() {
  localStorage.setItem('foodList', JSON.stringify(foodList));
  localStorage.setItem('currentId', currentId.toString());
}

// Mostrar la lista de comidas
function renderFoodList() {
  const tableBody = document.getElementById('food-table');
  tableBody.innerHTML = '';
  foodList.forEach((food) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${food.type}</td>
      <td>${food.name}</td>
      <td>${food.ingredients}</td>
      <td>${food.price.toFixed(2)} €</td>
      <td>
        <button class="btn" onclick="editFood(${food.id})">Editar</button>
        <button class="btn" onclick="deleteFood(${food.id})">Borrar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Validar campos
function validateField(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input.value.trim()) {
    error.style.display = 'block';
    error.textContent = 'Este campo es obligatorio.';
    return false;
  } else {
    error.style.display = 'none';
    return true;
  }
}

// Añadir nueva comida
function addFood() {
  const isValidType = validateField('food-type', 'error-food-type');
  const isValidName = validateField('food-name', 'error-food-name');
  const isValidIngredients = validateField('food-ingredients', 'error-food-ingredients');
  const isValidPrice = validateField('food-price', 'error-food-price');

  if (!isValidType || !isValidName || !isValidIngredients || !isValidPrice) return;

  const type = document.getElementById('food-type').value.trim();
  const name = document.getElementById('food-name').value.trim();
  const ingredients = document.getElementById('food-ingredients').value.trim();
  const price = parseFloat(document.getElementById('food-price').value.trim());

  foodList.push({ id: currentId++, type, name, ingredients, price });
  document.getElementById('food-form').reset();

  saveToLocalStorage();
  renderFoodList();
}

// Editar una comida existente
function editFood(id) {
  const food = foodList.find((f) => f.id === id);
  if (food) {
    const newType = prompt('Nuevo tipo de comida:', food.type) || food.type;
    const newName = prompt('Nuevo nombre:', food.name) || food.name;
    const newIngredients = prompt('Nuevos ingredientes:', food.ingredients) || food.ingredients;
    const newPrice = parseFloat(prompt('Nuevo precio:', food.price)) || food.price;

    if (newType && newName && newIngredients && !isNaN(newPrice)) {
      food.type = newType;
      food.name = newName;
      food.ingredients = newIngredients;
      food.price = newPrice;

      saveToLocalStorage();
      renderFoodList();
    }
  }
}

// Borrar una comida
function deleteFood(id) {
  foodList = foodList.filter((f) => f.id !== id);
  saveToLocalStorage();
  renderFoodList();
}

// Inicializar el formulario y tabla al cargar la página
window.onload = loadFromLocalStorage;
