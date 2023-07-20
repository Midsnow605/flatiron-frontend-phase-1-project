// Initialize an empty array to store the submitted items
let items = [];

// Function to fetch data from the server and update the items array
function fetchData() {
  fetch("http://localhost:3000/items", {
    headers: {
      'Accept': 'application/json', // Requesting JSON response
    },
  })
    .then((response) => response.json())
    .then((data) => {
      items = data;
      displayItems();
    })
    .catch((error) => {
      console.log('Error fetching data:', error);
    });
}

// Function to send a new item to the server for storage
function addItemToServer(item) {
  fetch("http://localhost:3000/items", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Sending JSON data
      'Accept': 'application/json', // Expecting JSON response
    },
    body: JSON.stringify(item),
  })
    .then(() => {
      console.log('Item added successfully!');
      fetchData(); // Fetch updated data after adding the item
    })
    .catch((error) => {
      console.log('Error adding item:', error);
    });
}

// Function to delete an item from the server
function deleteItemFromServer(itemId) {
  fetch(`http://localhost:3000/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json', // Expecting JSON response
    },
  })
    .then(() => {
      console.log('Item deleted successfully!');
      fetchData(); // Fetch updated data after deleting the item
    })
    .catch((error) => {
      console.log('Error deleting item:', error);
    });
}

// Function to create the "X" button for an item
function createDeleteButton(itemId) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'X';

  // Attach a click event listener to the delete button
  deleteButton.addEventListener('click', function() {
    deleteItemFromServer(itemId); // Remove item from the server
  });

  return deleteButton;
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

    // Create the "X" button for this item
    const deleteButton = createDeleteButton(item.id);
    itemDiv.appendChild(deleteButton);

    itemListDiv.appendChild(itemDiv);
  });
}

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
  const item = {
    name: name,
    image: image,
    description: description,
    value: value,
    category: category
  };

  // Send the new item to the server for storage
  addItemToServer(item);

  // Clear the form inputs
  document.getElementById('nameInput').value = '';
  document.getElementById('imageInput').value = '';
  document.getElementById('descriptionInput').value = '';
  document.getElementById('valueInput').value = '';
  document.getElementById('categoryInput').value = '';
}

// Calculate total value function
function calculateTotalValue() {
  let totalValue = items.reduce(function(acc, item) {
    return acc + item.value;
  }, 0);

  document.getElementById('totalValue').textContent = 'Total Value: $' + totalValue.toFixed(2);
}

// Event listener for form submission
const addItemForm = document.getElementById('addItemForm');
addItemForm.addEventListener('submit', addItem);

// Event listener for the "Calculate Total Value" button
const calculateTotalButton = document.getElementById('calculateTotal');
calculateTotalButton.addEventListener('click', calculateTotalValue);

// Fetch initial data from the server and display items on the DOM
fetchData();
