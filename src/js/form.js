import { showModal } from './ui.js';

function maskCPF(value) {
    value = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
}

function maskCEP(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
}

function maskPhone(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    return value;
}

function isValidCPF(cpfRaw) {
    const cpf = (cpfRaw || '').replace(/\D/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcDigit = (base) => {
        let sum = 0;
        for (let i = 0; i < base.length; i++) {
            sum += parseInt(base[i], 10) * (base.length + 1 - i);
        }
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
    };

    const d1 = calcDigit(cpf.substring(0, 9));
    if (d1 !== parseInt(cpf[9], 10)) return false;
    const d2 = calcDigit(cpf.substring(0, 10));
    if (d2 !== parseInt(cpf[10], 10)) return false;
    return true;
}

function isAdult(isoDate) {
    if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return false;
    const [y, m, d] = isoDate.split('-').map(Number);
    const birth = new Date(y, m - 1, d);
    if (Number.isNaN(birth.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age >= 18;
}

function addInputMasks(form) {
    const cpfInput = form.querySelector('#cpf');
    const cepInput = form.querySelector('#cep');
    const telefoneInput = form.querySelector('#telefone');
    const nascimentoInput = form.querySelector('#nascimento');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            e.target.value = maskCPF(e.target.value);
        });
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            e.target.value = maskCEP(e.target.value);
        });
    }
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            e.target.value = maskPhone(e.target.value);
        });
    }
}

function clearErrorMessages() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

function showError(field, message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    
    field.parentElement.insertBefore(alert, field.nextSibling);
}

function validateForm(form) {
    clearErrorMessages();
                
    let isValid = true;
                
    const cpfInput = form.querySelector('#cpf');
    if (cpfInput && cpfInput.value.trim()) {
        if (!isValidCPF(cpfInput.value)) {
            showError(cpfInput, 'CPF inválido.');
            isValid = false;
        }
    }

    const nascInput = form.querySelector('#nascimento');
    if (nascInput && nascInput.value.trim()) {
        if (!isAdult(nascInput.value.trim())) {
            showError(nascInput, 'É necessário ter 18 anos ou mais.');
            isValid = false;
        }
    }

    return isValid;
}

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    
    if (!form.checkValidity()) {
        form.reportValidity();
        clearErrorMessages();
        return;
    }
    if (validateForm(form)) {
        showModal('#success-modal');
        
        setTimeout(() => {
            form.reset();
        }, 2000);
    } else {
        const firstError = document.querySelector('.alert-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

export function initFormValidation(formSelector) {
    const form = document.querySelector(formSelector);
    
    if (!form) {
        return;
    }
    
    addInputMasks(form);
    
    form.addEventListener('submit', handleSubmit);
}
