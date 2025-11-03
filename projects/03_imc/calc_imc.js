// ============================================
// IDIOMAS
// ============================================

let idiomaActual = 'es';

const traducciones = {
    es: {
        alertValoresInvalidos: "Por favor ingresa valores válidos de peso y altura.",
        metricPlaceholderPeso: "Ej: 78 (kg)",
        metricPlaceholderAltura: "Ej: 1.84 (m)",
        imperialPlaceholderPeso: "Ej: 172 (lb)",
        imperialPlaceholderAltura: "Ej: 72 (in)",
        resultadoTexto: "Tu IMC es",
        clasificaciones: {
            bajoPeso: "Bajo peso",
            pesoNormal: "Peso normal",
            sobrepeso: "Sobrepeso",
            obesidad: "Obesidad"
        },
        consejos: {
            bajoPeso: "Considera consultar con un profesional de la salud para evaluar tu alimentación.",
            pesoNormal: "Excelente. Mantén hábitos saludables y ejercicio regular.",
            sobrepeso: "Revisa tu dieta y aumenta la actividad física. Consulta con un especialista para obtener más información.",
            obesidad: "Es recomendable consultar con un profesional de la salud para recibir orientación personalizada."
        }
    },
    en: {
        alertValoresInvalidos: "Please enter valid weight and height values.",
        metricPlaceholderPeso: "Ex: 78 (kg)",
        metricPlaceholderAltura: "Ex: 1.84 (m)",
        imperialPlaceholderPeso: "Ex: 172 (lb)",
        imperialPlaceholderAltura: "Ex: 72 (in)",
        resultadoTexto: "Your BMI is",
        clasificaciones: {
            bajoPeso: "Underweight",
            pesoNormal: "Normal weight",
            sobrepeso: "Overweight",
            obesidad: "Obesity"
        },
        consejos: {
            bajoPeso: "Consider consulting with a health professional to evaluate your diet.",
            pesoNormal: "Excellent. Maintain healthy habits and regular exercise.",
            sobrepeso: "Review your diet and increase physical activity. Consult with a specialist if you consider it necessary.",
            obesidad: "It is advisable to consult with a health professional for personalized guidance."
        }
    }
};

function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    
    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === idioma) {
            btn.classList.add('active');
        }
    });
    
    // Actualizar todos los textos con atributos data-es y data-en
    document.querySelectorAll('[data-' + idioma + ']').forEach(elemento => {
        const texto = elemento.getAttribute('data-' + idioma);
        
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'BUTTON') {
            elemento.textContent = texto;
        } else if (elemento.tagName === 'OPTION') {
            elemento.textContent = texto;
        } else {
            elemento.textContent = texto;
        }
    });
    
    // Actualizar placeholders según el sistema de unidades
    actualizarPlaceholders();
    // Update language buttons
    const botones = document.querySelectorAll('.lang-btn');
    botones.forEach(btn => {
        if (btn.getAttribute('data-lang') === idioma) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update ALL elements with data-es and data-en
    const elementosTraducibles = document.querySelectorAll('[data-es][data-en]');
    elementosTraducibles.forEach(elemento => {
        const textoEs = elemento.getAttribute('data-es');
        const textoEn = elemento.getAttribute('data-en');
        
        if (idioma === 'es') {
            elemento.textContent = textoEs;
        } else {
            elemento.textContent = textoEn;
        }
    });
    
    // Save preference
    localStorage.setItem('idioma_preferido', idioma);
    // Actualizar el atributo lang del documento
    document.documentElement.lang = idioma;
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function formatNumber(n) {
    return Math.round(n * 100) / 100;
}

function classify(imc) {
    if (imc < 18.5) return 'bajoPeso';
    if (imc >= 18.5 && imc < 24.9) return 'pesoNormal';
    if (imc >= 25 && imc < 29.9) return 'sobrepeso';
    return 'obesidad';
}

function actualizarPlaceholders() {
    const unitSelect = document.getElementById('unit');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    
    if (unitSelect.value === 'metric') {
        pesoInput.placeholder = traducciones[idiomaActual].metricPlaceholderPeso;
        alturaInput.placeholder = traducciones[idiomaActual].metricPlaceholderAltura;
    } else {
        pesoInput.placeholder = traducciones[idiomaActual].imperialPlaceholderPeso;
        alturaInput.placeholder = traducciones[idiomaActual].imperialPlaceholderAltura;
    }
}

// ============================================
// FUNCIÓN DE CÁLCULO
// ============================================

function calcular() {
    const unitSelect = document.getElementById('unit');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const output = document.getElementById('output');
    const advice = document.getElementById('advice');

    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (!peso || peso <= 0 || !altura || altura <= 0) {
        alert(traducciones[idiomaActual].alertValoresInvalidos);
        return;
    }

    let imc;
    if (unitSelect.value === 'metric') {
        imc = peso / (altura * altura);
    } else {
        // imperial: BMI = (weight(lb) / (height(in)^2)) * 703
        imc = (peso / (altura * altura)) * 703;
    }

    const clasificacion = classify(imc);
    const nombreClasificacion = traducciones[idiomaActual].clasificaciones[clasificacion];
    
    output.style.display = 'block';
    output.innerHTML = `${traducciones[idiomaActual].resultadoTexto} <strong>${formatNumber(imc)}</strong> — ${nombreClasificacion}.`;

    const consejo = traducciones[idiomaActual].consejos[clasificacion];
    advice.textContent = consejo;
    
    // Animación de pulso en los inputs
    pesoInput.classList.add('calculated');
    alturaInput.classList.add('calculated');
    setTimeout(() => {
        pesoInput.classList.remove('calculated');
        alturaInput.classList.remove('calculated');
    }, 600);
}

// ============================================
// FUNCIÓN DE LIMPIEZA
// ============================================

function limpiar() {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('output').style.display = 'none';
    document.getElementById('advice').textContent = '';
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma inicial
    cambiarIdioma('es');
    
    // Event listeners
    const unitSelect = document.getElementById('unit');
    const calcularBtn = document.getElementById('calcular');
    const limpiarBtn = document.getElementById('limpiar');
    
    unitSelect.addEventListener('change', () => {
        actualizarPlaceholders();
        document.getElementById('output').style.display = 'none';
        document.getElementById('advice').textContent = '';
        document.getElementById('peso').value = '';
        document.getElementById('altura').value = '';
    });
    
    calcularBtn.addEventListener('click', calcular);
    limpiarBtn.addEventListener('click', limpiar);
    
    // Permitir calcular con Enter
    document.getElementById('peso').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calcular();
    });
    
    document.getElementById('altura').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calcular();
    });
});