// ============================================
// IDIOMAS
// ============================================

let idiomaActual = 'es';

const mensajes = {
    es: {
        coeficienteAInvalido: "El valor de 'a' no puede ser 0. No es una ecuación cuadrática.",
        ingreseTodosLosValores: "Por favor, ingrese todos los valores (a, b, c).",
        dosReales: "La ecuación tiene dos soluciones reales:",
        unaSolucion: "La ecuación tiene una sola solución real:",
        sinReales: "La ecuación no tiene soluciones reales (las raíces son imaginarias).",
        discriminante: "Discriminante:",
        soluciones: "Soluciones:",
        solucion: "Solución:",
        discriminanteDosReales: "Como el discriminante es positivo, la ecuación tiene dos soluciones reales diferentes.",
        discriminanteUnaSolucion: "Como el discriminante es cero, la ecuación tiene una solución real doble.",
        discriminanteSinReales: "Como el discriminante es negativo, la ecuación no tiene soluciones reales (las raíces son imaginarias)."
    },
    en: {
        coeficienteAInvalido: "The value of 'a' cannot be 0. It is not a quadratic equation.",
        ingreseTodosLosValores: "Please enter all values (a, b, c).",
        dosReales: "The equation has two real solutions:",
        unaSolucion: "The equation has one real solution:",
        sinReales: "The equation has no real solutions (the roots are imaginary).",
        discriminante: "Discriminant:",
        soluciones: "Solutions:",
        solucion: "Solution:",
        discriminanteDosReales: "Since the discriminant is positive, the equation has two different real solutions.",
        discriminanteUnaSolucion: "Since the discriminant is zero, the equation has one double real solution.",
        discriminanteSinReales: "Since the discriminant is negative, the equation has no real solutions (the roots are imaginary)."
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
        const textoEs = elemento.getAttribute('data-es');
        const textoEn = elemento.getAttribute('data-en');
        
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'BUTTON') {
            elemento.textContent = idioma === 'es' ? textoEs : textoEn;
        } else {
            elemento.textContent = idioma === 'es' ? textoEs : textoEn;
        }
    });
    
    // Actualizar placeholders de los inputs
    const inputs = ['coef-a', 'coef-b', 'coef-c'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            const placeholder = input.getAttribute(`data-${idioma}-placeholder`);
            if (placeholder) {
                input.placeholder = placeholder;
            }
        }
    });
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
// FUNCIONES PARA TOMA DE VALORES
// ============================================

// Función para obtener los valores de los coeficientes
function obtenerCoeficientes() {
    const a = document.getElementById("coef-a").value;
    const b = document.getElementById("coef-b").value;
    const c = document.getElementById("coef-c").value;
    
    return {
        a: a !== "" ? Number(a) : null,
        b: b !== "" ? Number(b) : null,
        c: c !== "" ? Number(c) : null
    };
}

// Función para validar que todos los coeficientes estén ingresados
function validarCoeficientes(coeficientes) {
    if (coeficientes.a === null || coeficientes.b === null || coeficientes.c === null) {
        return false;
    }
    return true;
}

// ============================================
// FUNCIÓN PARA CALCULAR EL DISCRIMINANTE
// ============================================

// Función que calcula el discriminante (b² - 4ac)
function calcularDiscriminante(b, a, c) {
    return (b * b) - (4 * a * c);
}

// ============================================
// FUNCIÓN PARA RESOLVER LA ECUACIÓN
// ============================================

// Función principal que resuelve la ecuación cuadrática
function resolverEcuacionCuadratica(a, b, c) {
    // Calcular el discriminante
    const discriminante = calcularDiscriminante(b, a, c);
    
    let resultado = {
        tipo: '',
        discriminante: discriminante,
        soluciones: []
    };
    
    // Si el discriminante es positivo, hay dos soluciones reales
    if (discriminante > 0) {
        const x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        
        resultado.tipo = 'dosReales';
        resultado.soluciones = [x1, x2];
    } 
    // Si el discriminante es cero, hay una sola solución real
    else if (discriminante == 0) {
        const x = -b / (2 * a);
        
        resultado.tipo = 'unaSolucion';
        resultado.soluciones = [x];
    } 
    // Si el discriminante es negativo, no hay soluciones reales
    else {
        resultado.tipo = 'sinReales';
        resultado.soluciones = [];
    }
    
    return resultado;
}

// ============================================
// FUNCIÓN PARA MOSTRAR RESULTADOS
// ============================================

// Función para mostrar los resultados en la página
function mostrarResultado(resultado) {
    const contenedor = document.getElementById("resultado-container");
    const textoResultado = document.getElementById("resultado-texto");
    
    // Limpiar resultado anterior
    textoResultado.innerHTML = '';
    
    // Mostrar el discriminante con su significado
    const discText = document.createElement('div');
    discText.className = 'discriminante-info';
    
    let significado = '';
    if (resultado.tipo === 'dosReales') {
        significado = mensajes[idiomaActual].discriminanteDosReales;
    } else if (resultado.tipo === 'unaSolucion') {
        significado = mensajes[idiomaActual].discriminanteUnaSolucion;
    } else {
        significado = mensajes[idiomaActual].discriminanteSinReales;
    }
    
    discText.innerHTML = `
        <strong>${mensajes[idiomaActual].discriminante}</strong>
        <span class="discriminante-valor">${resultado.discriminante.toFixed(2)}</span>
        <div class="discriminante-significado">${significado}</div>
    `;
    textoResultado.appendChild(discText);
    
    // Mostrar las soluciones según el tipo
    const solucionText = document.createElement('p');
    solucionText.className = 'solucion-info';
    
    if (resultado.tipo === 'dosReales') {
        solucionText.innerHTML = `<strong>${mensajes[idiomaActual].dosReales}</strong><br>`;
        solucionText.innerHTML += `<span class="valor-x1">x₁</span> = ${resultado.soluciones[0].toFixed(4)}<br>`;
        solucionText.innerHTML += `<span class="valor-x2">x₂</span> = ${resultado.soluciones[1].toFixed(4)}`;
        solucionText.classList.add('dos-soluciones');
    } 
    else if (resultado.tipo === 'unaSolucion') {
        solucionText.innerHTML = `<strong>${mensajes[idiomaActual].unaSolucion}</strong><br>`;
        solucionText.innerHTML += `<span class="valor-x">x</span> = ${resultado.soluciones[0].toFixed(4)}`;
        solucionText.classList.add('una-solucion');
    } 
    else {
        solucionText.innerHTML = `<strong>${mensajes[idiomaActual].sinReales}</strong>`;
        solucionText.classList.add('sin-soluciones');
    }
    
    textoResultado.appendChild(solucionText);
    
    // Mostrar el contenedor con animación
    contenedor.classList.add('mostrar');
    
    // Agregar efecto visual a los campos de entrada
    document.querySelectorAll('.coef-input').forEach(input => {
        if (input.value) {
            input.classList.add('calculated');
            setTimeout(() => {
                input.classList.remove('calculated');
            }, 600);
        }
    });
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    const contenedor = document.getElementById("resultado-container");
    const textoResultado = document.getElementById("resultado-texto");
    
    textoResultado.innerHTML = '';
    
    const errorText = document.createElement('p');
    errorText.className = 'error-mensaje';
    errorText.innerHTML = `<strong>⚠️ Error:</strong> ${mensaje}`;
    textoResultado.appendChild(errorText);
    
    contenedor.classList.add('mostrar');
}

// ============================================
// FUNCIÓN DE CÁLCULO PRINCIPAL
// ============================================

// Función principal que se ejecuta al hacer clic en "Calcular"
function calcular() {
    // Obtener los coeficientes
    const coeficientes = obtenerCoeficientes();
    
    // Validar que todos los valores estén ingresados
    if (!validarCoeficientes(coeficientes)) {
        mostrarError(mensajes[idiomaActual].ingreseTodosLosValores);
        return;
    }
    
    // Validar que 'a' no sea cero (siguiendo la lógica original del estudiante)
    if (coeficientes.a == 0) {
        mostrarError(mensajes[idiomaActual].coeficienteAInvalido);
        return;
    }
    
    // Resolver la ecuación
    const resultado = resolverEcuacionCuadratica(coeficientes.a, coeficientes.b, coeficientes.c);
    
    // Mostrar el resultado
    mostrarResultado(resultado);
}

// ============================================
// FUNCIÓN DE LIMPIEZA
// ============================================

// Función para limpiar todos los campos y resultados
function limpiar() {
    document.getElementById("coef-a").value = "";
    document.getElementById("coef-b").value = "";
    document.getElementById("coef-c").value = "";
    
    // Ocultar el contenedor de resultados
    const contenedor = document.getElementById("resultado-container");
    contenedor.classList.remove('mostrar');
    
    // Limpiar el texto del resultado
    const textoResultado = document.getElementById("resultado-texto");
    textoResultado.innerHTML = '';
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Establecer idioma inicial al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cambiarIdioma('es');
    
    // Ocultar el contenedor de resultados inicialmente
    const contenedor = document.getElementById("resultado-container");
    contenedor.classList.remove('mostrar');
    
    // Agregar validación en tiempo real para inputs numéricos
    const inputs = document.querySelectorAll('.coef-input');
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Permitir números, punto decimal, signo negativo y backspace
            const valor = e.target.value;
            // Remover cualquier caracter que no sea número, punto o guion al inicio
            const valorLimpio = valor.replace(/[^\d.-]/g, '');
            
            // Asegurar que solo haya un punto decimal
            const partes = valorLimpio.split('.');
            if (partes.length > 2) {
                e.target.value = partes[0] + '.' + partes.slice(1).join('');
            } else {
                e.target.value = valorLimpio;
            }
            
            // Asegurar que el signo negativo solo esté al principio
            if (e.target.value.includes('-')) {
                const negativo = e.target.value[0] === '-';
                const numeroSinSigno = e.target.value.replace(/-/g, '');
                e.target.value = negativo ? '-' + numeroSinSigno : numeroSinSigno;
            }
        });
        
        // Prevenir pegar contenido no numérico
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const texto = (e.clipboardData || window.clipboardData).getData('text');
            const numeroValido = texto.match(/-?\d*\.?\d*/);
            if (numeroValido) {
                document.execCommand('insertText', false, numeroValido[0]);
            }
        });
    });
});