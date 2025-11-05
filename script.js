// Caregiver Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all form interactions
    initBarthelCalculator();
    initLawtonCalculator();
    initNPIQConditionals();
    initPreviousDiagnosisConditional();
    initFormSubmission();
});

// Barthel Scale Calculator
function initBarthelCalculator() {
    const barthelInputs = [
        'barthel_comer',
        'barthel_trasladarse',
        'barthel_aseo',
        'barthel_retrete',
        'barthel_banarse',
        'barthel_desplazarse',
        'barthel_escaleras',
        'barthel_vestirse',
        'barthel_heces',
        'barthel_orina'
    ];

    barthelInputs.forEach(name => {
        const inputs = document.querySelectorAll(`input[name="${name}"]`);
        inputs.forEach(input => {
            input.addEventListener('change', calculateBarthelScore);
        });
    });
}

function calculateBarthelScore() {
    const barthelInputs = [
        'barthel_comer',
        'barthel_trasladarse',
        'barthel_aseo',
        'barthel_retrete',
        'barthel_banarse',
        'barthel_desplazarse',
        'barthel_escaleras',
        'barthel_vestirse',
        'barthel_heces',
        'barthel_orina'
    ];

    let totalScore = 0;
    let allAnswered = true;

    barthelInputs.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        } else {
            allAnswered = false;
        }
    });

    const scoreDisplay = document.getElementById('barthelScore');
    const interpretationDisplay = document.getElementById('scoreInterpretation');

    if (allAnswered) {
        scoreDisplay.textContent = `${totalScore} / 100`;

        let interpretation = '';
        if (totalScore >= 90) {
            interpretation = '✅ Independencia completa o casi completa';
        } else if (totalScore >= 60) {
            interpretation = '🟡 Dependencia leve';
        } else if (totalScore >= 40) {
            interpretation = '🟠 Dependencia moderada';
        } else if (totalScore >= 20) {
            interpretation = '🔴 Dependencia severa';
        } else {
            interpretation = '⚫ Dependencia total';
        }

        interpretationDisplay.textContent = interpretation;
    } else {
        scoreDisplay.textContent = '0 / 100';
        interpretationDisplay.textContent = 'Seleccione todas las opciones para calcular el puntaje';
    }
}

// Lawton & Brody Calculator
function initLawtonCalculator() {
    const lawtonInputs = [
        'lawton_telefono',
        'lawton_compras',
        'lawton_comida',
        'lawton_casa',
        'lawton_ropa',
        'lawton_transporte',
        'lawton_medicacion',
        'lawton_economia'
    ];

    lawtonInputs.forEach(name => {
        const inputs = document.querySelectorAll(`input[name="${name}"]`);
        inputs.forEach(input => {
            input.addEventListener('change', calculateLawtonScore);
        });
    });
}

function calculateLawtonScore() {
    const lawtonInputs = [
        'lawton_telefono',
        'lawton_compras',
        'lawton_comida',
        'lawton_casa',
        'lawton_ropa',
        'lawton_transporte',
        'lawton_medicacion',
        'lawton_economia'
    ];

    let totalScore = 0;
    let allAnswered = true;

    lawtonInputs.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        } else {
            allAnswered = false;
        }
    });

    const scoreDisplay = document.getElementById('lawtonScore');
    const interpretationDisplay = document.getElementById('lawtonInterpretation');

    if (allAnswered) {
        scoreDisplay.textContent = `${totalScore} / 8`;

        let interpretation = '';
        if (totalScore === 8) {
            interpretation = '✅ Autonomía completa';
        } else if (totalScore >= 6) {
            interpretation = '🟡 Dependencia leve';
        } else if (totalScore >= 4) {
            interpretation = '🟠 Dependencia moderada';
        } else if (totalScore >= 2) {
            interpretation = '🔴 Dependencia severa';
        } else {
            interpretation = '⚫ Dependencia total';
        }

        interpretationDisplay.textContent = interpretation;
    } else {
        scoreDisplay.textContent = '0 / 8';
        interpretationDisplay.textContent = '0-1: Dependencia total | 2-3: Dependencia severa | 4-5: Dependencia moderada | 6-7: Dependencia leve | 8: Autonomía';
    }
}

// NPI-Q Conditional Display
function initNPIQConditionals() {
    const npiqTriggers = document.querySelectorAll('.npiq-trigger');

    npiqTriggers.forEach(trigger => {
        trigger.addEventListener('change', function() {
            const targetId = this.getAttribute('data-target');
            const targetDiv = document.getElementById(targetId);
            const name = this.name;
            const selectedValue = document.querySelector(`input[name="${name}"]:checked`);

            if (targetDiv && selectedValue) {
                if (selectedValue.value === 'si') {
                    targetDiv.style.display = 'block';
                } else {
                    targetDiv.style.display = 'none';
                    // Clear selections in hidden section
                    const inputs = targetDiv.querySelectorAll('input[type="radio"]');
                    inputs.forEach(input => input.checked = false);
                }
            }
        });
    });
}

// Previous Diagnosis Conditional
function initPreviousDiagnosisConditional() {
    const diagnosisInputs = document.querySelectorAll('input[name="previousDiagnosis"]');

    diagnosisInputs.forEach(input => {
        input.addEventListener('change', function() {
            const detailsDiv = document.getElementById('diagnosisDetails');
            if (this.value === 'si') {
                detailsDiv.style.display = 'block';
            } else {
                detailsDiv.style.display = 'none';
                document.querySelector('input[name="diagnosisType"]').value = '';
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    const form = document.getElementById('caregiverForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
            alert('Por favor, complete todos los campos obligatorios marcados con *');
            return;
        }

        // Get all form data
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Calculate scores
        const barthelScore = calculateFinalBarthelScore();
        const lawtonScore = calculateFinalLawtonScore();

        data.barthelScore = barthelScore;
        data.lawtonScore = lawtonScore;

        // Log to console (in production, send to server)
        console.log('Form Data:', data);
        console.log('Barthel Score:', barthelScore);
        console.log('Lawton Score:', lawtonScore);

        // Show success message
        document.getElementById('finalScore').textContent = barthelScore;
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // In production, you would send the data to your server here
        // Example:
        // fetch('/api/submit-form', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     // Show success message
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        //     alert('Hubo un error al enviar el formulario. Por favor, intente nuevamente.');
        // });
    });

    // Form reset
    form.addEventListener('reset', function() {
        setTimeout(() => {
            calculateBarthelScore();
            calculateLawtonScore();

            // Hide conditional sections
            document.getElementById('diagnosisDetails').style.display = 'none';
            document.querySelectorAll('.npiq-details').forEach(div => {
                div.style.display = 'none';
            });
        }, 10);
    });
}

// Calculate final scores for submission
function calculateFinalBarthelScore() {
    const barthelInputs = [
        'barthel_comer',
        'barthel_trasladarse',
        'barthel_aseo',
        'barthel_retrete',
        'barthel_banarse',
        'barthel_desplazarse',
        'barthel_escaleras',
        'barthel_vestirse',
        'barthel_heces',
        'barthel_orina'
    ];

    let totalScore = 0;

    barthelInputs.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        }
    });

    return totalScore;
}

function calculateFinalLawtonScore() {
    const lawtonInputs = [
        'lawton_telefono',
        'lawton_compras',
        'lawton_comida',
        'lawton_casa',
        'lawton_ropa',
        'lawton_transporte',
        'lawton_medicacion',
        'lawton_economia'
    ];

    let totalScore = 0;

    lawtonInputs.forEach(name => {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
        }
    });

    return totalScore;
}

// Smooth scroll for long form
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
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
}

// Initialize smooth scroll
initSmoothScroll();

// Auto-save to localStorage (optional feature)
function enableAutoSave() {
    const form = document.getElementById('caregiverForm');
    const AUTO_SAVE_KEY = 'caregiver_form_autosave';

    // Load saved data
    const savedData = localStorage.getItem(AUTO_SAVE_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.elements[key];
                if (input) {
                    if (input.type === 'radio' || input.type === 'checkbox') {
                        const radioInput = form.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                        if (radioInput) radioInput.checked = true;
                    } else {
                        input.value = data[key];
                    }
                }
            });
            // Recalculate scores
            calculateBarthelScore();
            calculateLawtonScore();
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }

    // Save on change
    form.addEventListener('change', function() {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
    });

    // Clear on successful submission
    form.addEventListener('submit', function() {
        localStorage.removeItem(AUTO_SAVE_KEY);
    });
}

// Uncomment to enable auto-save feature
// enableAutoSave();

// Print functionality
function printForm() {
    window.print();
}

// Export form data as JSON
function exportFormData() {
    const form = document.getElementById('caregiverForm');
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    data.barthelScore = calculateFinalBarthelScore();
    data.lawtonScore = calculateFinalLawtonScore();
    data.timestamp = new Date().toISOString();

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluacion_cuidador_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

// Validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)\+]+$/;
    return re.test(phone);
}

// Add custom validation messages
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('invalid', function() {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Por favor, complete este campo obligatorio.');
        } else if (this.validity.typeMismatch) {
            if (this.type === 'email') {
                this.setCustomValidity('Por favor, ingrese un correo electrónico válido.');
            } else if (this.type === 'tel') {
                this.setCustomValidity('Por favor, ingrese un número de teléfono válido.');
            }
        }
    });

    input.addEventListener('input', function() {
        this.setCustomValidity('');
    });
});

// Accessibility improvements
document.querySelectorAll('.radio-option, .checkbox-option').forEach(option => {
    option.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input) {
                input.checked = !input.checked;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    });
});

// Progress indicator (optional)
function updateProgressIndicator() {
    const form = document.getElementById('caregiverForm');
    const requiredInputs = form.querySelectorAll('input[required]');
    let completed = 0;

    requiredInputs.forEach(input => {
        if (input.type === 'radio') {
            const name = input.name;
            if (form.querySelector(`input[name="${name}"]:checked`)) {
                completed++;
            }
        } else if (input.value.trim() !== '') {
            completed++;
        }
    });

    const progress = Math.round((completed / requiredInputs.length) * 100);
    console.log(`Form progress: ${progress}%`);
    return progress;
}

// Console message for developers
console.log('%c Formulario de Evaluación del Cuidador ', 'background: #673ab7; color: white; font-size: 16px; padding: 10px;');
console.log('Este formulario utiliza las siguientes escalas clínicas:');
console.log('- Índice de Barthel (Actividades Básicas de la Vida Diaria)');
console.log('- Escala de Lawton y Brody (Actividades Instrumentales de la Vida Diaria)');
console.log('- NPI-Q (Inventario Neuropsiquiátrico)');
console.log('- FBI (Inventario Conductual Frontal)');
console.log('- DEX-R (Cuestionario Disejecutivo)');
console.log('\nPara exportar los datos del formulario, ejecute: exportFormData()');
