
  const form = document.getElementById('productForm');
  const productList = document.getElementById('productList');
  const farmerIdInput = document.getElementById('farmer_id');

  let products = [];

  
  const defaultFarmerId = 1;
//   fetchFarmerProducts(defaultFarmerId);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const product = {
      name: document.getElementById('name').value,
      type: document.getElementById('type').value,
      quantity: document.getElementById('quantity').value,
      unit: document.getElementById('unit').value,
      price_per_unit: document.getElementById('price_per_unit').value,
      image_url: document.getElementById('image_url').value,
      farmer_id: farmerIdInput.value,
    };
    console.log(product);
    // Send product to backend (optional placeholder, adjust with your API)
    fetch('http://localhost:3000/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(() => {
      fetchFarmerProducts(product.farmer_id); // Refresh product list
      form.reset();
    })
    .catch(err => console.error('Error adding product:', err));
  });

  function fetchFarmerProducts(farmerId) {
    fetch(`http://localhost:3000/farmer-products/${farmerId}`)
      .then(response => response.json())
      .then(data => {
        products = data;
        console.log(products);
        renderProducts();
      })
      .catch(error => console.error('Error fetching farmer products:', error));
  }

  function renderProducts() {
    productList.innerHTML = '';
    products.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h4>${prod.name}</h4>
        <p>Type: ${prod.type}</p>
        <p>Quantity: ${prod.quantity} ${prod.unit}</p>
        <p>Price: ₹${prod.price_per_unit} / ${prod.unit}</p>
        <p><strong>Farmer ID:</strong> ${prod.farmer_id}</p>
      `;
      productList.appendChild(card);
    });
  }

  fetchFarmerProducts(defaultFarmerId);