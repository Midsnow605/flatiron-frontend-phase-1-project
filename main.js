// Initialize an empty array to store the submitted items
var items = [];

// Function to handle form submission
function addItem(event) {
  event.preventDefault(); // Prevent form submission's default behavior

  // Get the form input values
  var name = document.getElementById('nameInput').value;
  var image = document.getElementById('imageInput').value;
  var description = document.getElementById('descriptionInput').value;
  var value = parseFloat(document.getElementById('valueInput').value);
  var category = document.getElementById('categoryInput').value;

  // Create an object to represent the item
  var item = {
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
  var itemListDiv = document.getElementById('itemList');
  itemListDiv.innerHTML = ''; // Clear the previous content

  // Loop through the items array and create HTML elements for each item
  items.forEach(function(item) {
    var itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    var itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemDiv.appendChild(itemImage);

    var itemName = document.createElement('h3');
    itemName.textContent = item.name;
    itemDiv.appendChild(itemName);

    var itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;
    itemDiv.appendChild(itemDescription);

    itemListDiv.appendChild(itemDiv);
  });
}

// Event listener for form submission
var addItemForm = document.getElementById('addItemForm');
addItemForm.addEventListener('submit', addItem);

// Calculate total value function
function calculateTotalValue() {
  var totalValue = items.reduce(function(acc, item) {
    return acc + item.value;
  }, 0);

  document.getElementById('totalValue').textContent = 'Total Value: $' + totalValue.toFixed(2);
}

// Event listener for the "Calculate Total Value" button
var calculateTotalButton = document.getElementById('calculateTotal');
calculateTotalButton.addEventListener('click', calculateTotalValue);