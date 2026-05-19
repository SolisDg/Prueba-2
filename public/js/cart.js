// cart.js - Lógica del carrito de compras usando localStorage

function getCart() {
    const cart = localStorage.getItem('prettyThermoCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('prettyThermoCart', JSON.stringify(cart));
    updateCartCounter();
}

function addToCart(product) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no está, lo agrega con cantidad 1
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    alert(`¡${product.name} ha sido agregado al carrito!`);
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    if(window.location.pathname === '/cart') {
        renderCart();
    }
}

function updateQuantity(id, change) {
    const cart = getCart();
    const product = cart.find(item => item.id === id);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(id);
            return;
        }
        saveCart(cart);
        if(window.location.pathname === '/cart') {
            renderCart();
        }
    }
}

function updateCartCounter() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const counterElement = document.getElementById('cart-counter');
    if (counterElement) {
        counterElement.textContent = totalItems;
        counterElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary-container');
    
    if (!cartItemsContainer || !cartSummaryContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><h3>Tu carrito está vacío 😔</h3><a href="/products" class="btn btn-primary" style="margin-top: 20px;">Ver Productos</a></div>';
        cartSummaryContainer.style.display = 'none';
        return;
    }

    cartSummaryContainer.style.display = 'block';

    // Generar HTML para los items
    let itemsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = parseFloat(item.price) * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="/images/${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${parseFloat(item.price).toFixed(2)}</p>
                    <div class="item-quantity">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="item-remove" onclick="removeFromCart('${item.id}')"><i data-lucide="trash-2"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHTML;

    // Actualizar iconos de lucide recien inyectados
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Actualizar Resumen
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${subtotal.toFixed(2)}`;
}

// Inicializar el contador cuando cargue la página y renderizar si estamos en la vista de cart
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    if (window.location.pathname === '/cart') {
        renderCart();
    }
});
