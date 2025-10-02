// Current step tracker
let currentStep = 1;

// Input validation
function validateStep(step) {
    const inputs = {
        1: ['wheelDiameter', 'totalWidth'],
        2: ['innerBarrel', 'outerBarrel'],
        3: ['facePosition']
    };

    const fields = inputs[step];
    let isValid = true;
    let errorMessage = '';

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const value = parseFloat(input.value);

        if (!input.value || isNaN(value) || value <= 0) {
            isValid = false;
            input.classList.add('border-red-500');
            errorMessage = 'Please fill in all fields with valid positive numbers';
        } else {
            input.classList.remove('border-red-500');
        }
    });

    // Additional validation for step 2
    if (step === 2) {
        const totalWidth = parseFloat(document.getElementById('totalWidth').value);
        const innerBarrel = parseFloat(document.getElementById('innerBarrel').value);
        const outerBarrel = parseFloat(document.getElementById('outerBarrel').value);

        if (isValid && (innerBarrel + outerBarrel) > totalWidth) {
            isValid = false;
            errorMessage = 'Inner + Outer barrel widths cannot exceed total wheel width';
            document.getElementById('innerBarrel').classList.add('border-red-500');
            document.getElementById('outerBarrel').classList.add('border-red-500');
        }
    }

    if (!isValid && errorMessage) {
        showNotification(errorMessage, 'error');
    }

    return isValid;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white font-semibold animate-slide-in`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update step indicator
function updateStepIndicator(step) {
    for (let i = 1; i <= 4; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if (i < step) {
            indicator.classList.remove('bg-gray-700', 'bg-blue-500');
            indicator.classList.add('bg-green-500');
            indicator.innerHTML = '✓';
        } else if (i === step) {
            indicator.classList.remove('bg-gray-700', 'bg-green-500');
            indicator.classList.add('bg-blue-500');
            indicator.textContent = i;
        } else {
            indicator.classList.remove('bg-blue-500', 'bg-green-500');
            indicator.classList.add('bg-gray-700');
            indicator.textContent = i;
        }
    }
}

// Navigate to next step
function nextStep(step) {
    if (step > 1 && !validateStep(step - 1)) {
        return;
    }

    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${step}`).classList.remove('hidden');
    currentStep = step;
    updateStepIndicator(step);

    // Scroll to top of calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to previous step
function previousStep(step) {
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${step}`).classList.remove('hidden');
    currentStep = step;
    updateStepIndicator(step);

    // Scroll to top of calculator
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calculate wheel offset
function calculateOffset() {
    if (!validateStep(3)) {
        return;
    }

    // Get all input values
    const totalWidth = parseFloat(document.getElementById('totalWidth').value);
    const innerBarrel = parseFloat(document.getElementById('innerBarrel').value);
    const outerBarrel = parseFloat(document.getElementById('outerBarrel').value);
    const facePosition = parseFloat(document.getElementById('facePosition').value);

    // Calculate centerline (half of total wheel width)
    const centerline = totalWidth / 2;

    // Calculate offset in inches
    // Offset = Face Position - Centerline
    const offsetInches = facePosition - centerline;

    // Convert to millimeters (1 inch = 25.4mm)
    const offsetMM = Math.round(offsetInches * 25.4);

    // Calculate backspacing (distance from mounting face to back of wheel)
    const backspacing = facePosition;

    // Determine offset type
    let offsetType;
    if (offsetMM > 0) {
        offsetType = 'Positive (+)';
    } else if (offsetMM < 0) {
        offsetType = 'Negative (-)';
    } else {
        offsetType = 'Zero (0)';
    }

    // Display results
    document.getElementById('offsetResult').textContent = offsetMM > 0 ? `+${offsetMM}` : offsetMM;
    document.getElementById('offsetInches').textContent = offsetInches.toFixed(3) + '"';
    document.getElementById('centerline').textContent = centerline.toFixed(3) + '"';
    document.getElementById('backspacing').textContent = backspacing.toFixed(3) + '"';
    document.getElementById('offsetType').textContent = offsetType;

    // Show calculation steps
    const stepsContainer = document.getElementById('calculationSteps');
    stepsContainer.innerHTML = `
        <p><strong>1. Centerline:</strong> ${totalWidth}" ÷ 2 = ${centerline.toFixed(3)}"</p>
        <p><strong>2. Offset:</strong> ${facePosition}" (face position) - ${centerline.toFixed(3)}" (centerline) = ${offsetInches.toFixed(3)}"</p>
        <p><strong>3. Convert to mm:</strong> ${offsetInches.toFixed(3)}" × 25.4 = ${offsetMM}mm</p>
        <p><strong>4. Backspacing:</strong> ${backspacing.toFixed(3)}" (face to back edge)</p>
        <hr class="my-3 border-gray-600">
        <p class="text-xs text-gray-400">
            <strong>Note:</strong> Positive offset means the mounting face is toward the street side (front) of the wheel.
            Negative offset means the mounting face is toward the vehicle side (back) of the wheel.
        </p>
    `;

    // Move to results step
    nextStep(4);
    showNotification('Calculation complete! ✓', 'info');
}

// Reset calculator
function resetCalculator() {
    // Clear all inputs
    document.getElementById('wheelDiameter').value = '';
    document.getElementById('totalWidth').value = '';
    document.getElementById('innerBarrel').value = '';
    document.getElementById('outerBarrel').value = '';
    document.getElementById('facePosition').value = '';

    // Remove error states
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('border-red-500');
    });

    // Go back to step 1
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    currentStep = 1;
    updateStepIndicator(1);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showNotification('Calculator reset', 'info');
}

// Add enter key support for inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (currentStep === 1 && index < 2) {
                    if (index === 1) {
                        nextStep(2);
                    } else {
                        inputs[index + 1].focus();
                    }
                } else if (currentStep === 2 && index < 4) {
                    if (index === 3) {
                        nextStep(3);
                    } else {
                        inputs[index + 1].focus();
                    }
                } else if (currentStep === 3) {
                    calculateOffset();
                }
            }
        });
    });

    // Add smooth animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .animate-slide-in {
            animation: slide-in 0.3s ease-out;
        }

        input:focus {
            transform: scale(1.02);
        }

        button {
            position: relative;
            overflow: hidden;
        }

        button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        button:hover::before {
            width: 300px;
            height: 300px;
        }

        @media print {
            body {
                background: white;
            }
            .glass {
                background: white;
                border: 2px solid #ddd;
            }
            button {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add example values button (helpful for testing)
function loadExample() {
    document.getElementById('wheelDiameter').value = '18';
    document.getElementById('totalWidth').value = '9.5';
    document.getElementById('innerBarrel').value = '5.5';
    document.getElementById('outerBarrel').value = '4.0';
    document.getElementById('facePosition').value = '6.0';
    showNotification('Example values loaded!', 'info');
}

// Expose loadExample function globally for debugging
window.loadExample = loadExample;
