// Initialize an empty array to store the submitted items
let items = [];

// Function to handle form submission
function addItem(event) {
  event.preventDefault(); // Prevent form submission's default behavior

  // Get the form input values
  const name = document.getElementById('nameInput').value;
  const image = document.getElementById('imageInput').value;
  const description = document.getElementById('descriptionInput').value;
  const value = parseFloat(document.getElementById('valueInput').value);
  const category = document.getElementById('categoryInput').value;

  // Create an object to represent the item
  let item = {
    name: name,
    image: image,
    description: description,
    value: value,
    category: category
  };

  // Push the item to the array
  items.push(item);

  // Clear the form inputs
  document.getElementById('nameInput').value = '';
  document.getElementById('imageInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('valueInput').value = '';
  document.getElementById('categoryInput').value = '';

  // Update the DOM to display the items
  displayItems();
}

// Function to display the items on the DOM
function displayItems() {
  const itemListDiv = document.getElementById('itemList');
  itemListDiv.innerHTML = ''; // Clear the previous content

  // Loop through the items array and create HTML elements for each item
  items.forEach(function(item) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemDiv.appendChild(itemImage);

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    itemDiv.appendChild(itemName);

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;
    itemDiv.appendChild(itemDescription);

    itemListDiv.appendChild(itemDiv);
  });
}

// Event listener for form submission
const addItemForm = document.getElementById('addItemForm');
addItemForm.addEventListener('submit', addItem);

// Calculate total value function
function calculateTotalValue() {
  let totalValue = items.reduce(function(acc, item) {
    return acc + item.value;
  }, 0);

  document.getElementById('totalValue').textContent = 'Total Value: $' + totalValue.toFixed(2);
}

// Event listener for the "Calculate Total Value" button
const calculateTotalButton = document.getElementById('calculateTotal');
calculateTotalButton.addEventListener('click', calculateTotalValue);