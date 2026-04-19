//validaciones del lado del cliente

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
        const nameInput = registerForm.querySelector('[name="name"]');
        const emailInput = registerForm.querySelector('[name="email"]');
        const passwordInput = registerForm.querySelector('[name="password"]');
        const confirmPasswordInput = registerForm.querySelector('[name="confirmPassword"]');
        const avatarInput = registerForm.querySelector('[name="avatar"]');

        nameInput.addEventListener('blur', () => {
            validateName(nameInput);
        });
        emailInput.addEventListener('blur', () => {
            validateEmail(emailInput);
        });
        passwordInput.addEventListener('input', () => {
            validatePassword(passwordInput);
        });

        confirmPasswordInput.addEventListener('blur', () => {
            validateConfirmPassword(passwordInput, confirmPasswordInput);
        });
        avatarInput.addEventListener('change', () => {
            validateImage(avatarInput);
        });

        registerForm.addEventListener('submit', (event) => {
            let isValid = true;
            if (!validateName(nameInput)) isValid = false;
            if (!validateEmail(emailInput)) isValid = false;
            if (!validatePassword(passwordInput)) isValid = false;
            if (!validateConfirmPassword(passwordInput, confirmPasswordInput)) isValid = false;
            if (!validateImage(avatarInput)) isValid = false;
            
            // Si alguno falló, prevenimos el envío
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        const emailInput = loginForm.querySelector('[name="email"]');
        const password = loginForm.querySelector('[name="password"]');

        loginForm.addEventListener('submit', (event) => {
            let isValid = true;
            if(!validateEmail(emailInput)) isValid = false;
            if(!validateRequired(passwordInput, 'La contraseña es obligatoria')) isValid = false;
            if(!isValid) {
                event.preventDefault();
            }
        });
    }

    const productForm = document.querySelector('#productForm');
    if (productForm) {
        const nameInput = productForm.querySelector('[name="name"]');
        const descInput = productForm.querySelector('[name="description"]');
        const priceInput = productForm.querySelector('[name="price"]');
        const categoryInput = productForm.querySelector('[name="categoryId"]');
        const imageInput = productForm.querySelector('[name="image"]');
        
        productForm.addEventListener('submit', (event) => {
            let isValid = true;
            if (!validateLength(nameInput, 5, 'El nombre debe tener al menos 5 caracteres')) isValid = false;
            if (!validateLength(descInput, 20, 'La descripción debe tener al menos 20 caracteres')) isValid = false;
            if (!validatePrice(priceInput)) isValid = false;
            if (!validateRequired(categoryInput, 'Debes seleccionar una categoría')) isValid = false;
            if (imageInput.files.length > 0 && !validateImage(imageInput)) isValid = false;
            
            if (!isValid) {
                event.preventDefault();
            }
        });
    }

});

function validateName(input) {
    const value = input.value.trim();
    if (value.length === 0) {
        showError(input, 'El nombre es obligatorio');
        return false;
    }
    if (value.length < 2) {
        showError(input, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    showSucess(input);
    return true;
}

function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
        showError(input, 'El email es obligatorio');
        return false;       
    }
    if  (!emailRegex.test(value)) {
        showError(input, 'Ingresa un email válido');
        return false;
    }
    showSucess(input);
    return true;
}

function validatePassword(input) {
    const value = input.value;
    if ( value.length === 0){
        showError(input, 'La contraseña es obligatoria');
        return false;
    }
    if (value.length < 8) {
        showError(input, 'La contraseña debe tener al menos 8 caracteres');
        return false;
    }
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[@$!%*?&]/.test(value);
    
    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
        let missing = [];
        if (!hasLower) missing.push('minúscula');
        if (!hasUpper) missing.push('mayúscula');
        if (!hasNumber) missing.push('número');
        if (!hasSpecial) missing.push('carácter especial (@$!%*?&)');
        
        showError(input, `Falta: ${missing.join(', ')}`);
        return false;
    }
    
    showSuccess(input);
    return true;
}

function validateConfirmPassword(passwordInput, confirmInput) {
    if (confirmInput.value !== passwordInput.value) {
        showError(confirmInput, 'Las contraseñas no coinciden');
        return false;
    }    
    if (confirmInput.value.length === 0) {
        showError(confirmInput, 'Debes confirmar la contraseña');
        return false;
    }    
    showSuccess(confirmInput);
    return true;
}

function validateImage(input) {
    if (input.files.length === 0) {
        return true; // La imagen es opcional
    }
    
    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
        showError(input, 'Solo se permiten imágenes (JPG, PNG, GIF, WEBP)');
        return false;
    }
    const maxSize = 1 * 1024 * 1024; // 1MB en bytes
    if (file.size > maxSize) {
        showError(input, 'La imagen no debe superar 1MB');
        return false;
    }
    
    showSuccess(input);
    return true;
}

function validateRequired(input, message) {
    const value = input.value.trim();
    
    if (value.length === 0) {
        showError(input, message);
        return false;
    }
    showSuccess(input);
    return true;
}

function validateLength(input, minLenght, message) {
    const value = input.value.trim();
    if (value.lenght < minLenght) {
        showError(input, message);
        return false;
    }
    showSucess(input);
    return true;
}

function validatePrice(input) {
    const value = parseFloat(input.value);
    
    if (isNaN(value) || value <= 0) {
        showError(input, 'El precio debe ser un número mayor a 0');
        return false;
    }
    
    showSuccess(input);
    return true;
}

//Funciones de Interfaz de Usuario
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.closest('.form-group');

    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}