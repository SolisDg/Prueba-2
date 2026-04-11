// PRETTY THERMO - JavaScript Frontend

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    //MENÚ HAMBURGUESA (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }


    // BÚSQUEDA DE PRODUCTOS
    const searchInput = document.querySelector('#search-input');
    const productCards = document.querySelectorAll('.product-card');
    
    if (searchInput && productCards.length > 0) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('.product-name').textContent.toLowerCase();
                
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    //FILTRO POR CATEGORÍA
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Remover clase active de todos los botones
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');
                
                // Filtrar productos
                productCards.forEach(card => {
                    const productCategory = card.dataset.category;
                    
                    if (category === 'all' || productCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    //CONFIRMACIÓN DE ELIMINACIÓN
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    if (deleteButtons.length > 0) {
        deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const confirmed = confirm('¿Estás seguro de que deseas eliminar este producto?');
                
                if (!confirmed) {
                    e.preventDefault(); // Cancelar la acción
                }
            });
        });
    }

    //PREVIEW DE IMAGEN AL SUBIR
    const imageInput = document.querySelector('#product-image');
    const imagePreview = document.querySelector('#image-preview');
    
    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                };
                
                reader.readAsDataURL(file);
            }
        });
    }

    //MENSAJES DE ALERTA AUTO-CERRAR
    const alerts = document.querySelectorAll('.alert');
    
    if (alerts.length > 0) {
        alerts.forEach(alert => {
            setTimeout(() => {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 300);
            }, 5000); 
        });
    }

    //SMOOTH SCROLL
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});


// Función para formatear precios en moneda mexicana
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}