// Function to fetch data from the server and update the items array
function fetchData() {
    fetch('http://localhost:3000/items')
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
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(() => {
        console.log('Item added successfully!');
        fetchData(); // Fetch updated data after adding the item
      })
      .catch((error) => {
        console.log('Error adding item:', error);
      });
  }
  
  // Function to update an existing item on the server
  function updateItemOnServer(itemId, updatedItem) {
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'PUT', // Use 'PUT' or 'PATCH' depending on your server's API design
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(() => {
        console.log('Item updated successfully!');
        fetchData(); // Fetch updated data after updating the item
      })
      .catch((error) => {
        console.log('Error updating item:', error);
      });
  }
  
  // Function to delete an item from the server
  function deleteItemFromServer(itemId) {
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Item deleted successfully!');
        fetchData(); // Fetch updated data after deleting the item
      })
      .catch((error) => {
        console.log('Error deleting item:', error);
      });
  }  
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

  // Update the DOM to display the items
  displayItems();

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