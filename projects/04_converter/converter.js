// ============================================
// IDIOMAS
// ============================================

let idiomaActual = 'es';

const mensajes = {
    es: {
        errorValorInvalido: "⚠️ Por favor ingresa un valor numérico válido mayor que 0.",
        calculando: "Calculando",
        resultadoTitulo: "Resultado de la conversión:",
        valorOriginal: "Valor original:",
        valorConvertido: "Valor convertido:",
        // Unidades en español
        unidades: {
            cm: "centímetros",
            m: "metros",
            kg: "kilogramos",
            g: "gramos",
            km: "kilómetros"
        }
    },
    en: {
        errorValorInvalido: "⚠️ Please enter a valid numeric value greater than 0.",
        calculando: "Calculating",
        resultadoTitulo: "Conversion result:",
        valorOriginal: "Original value:",
        valorConvertido: "Converted value:",
        // Units in English
        unidades: {
            cm: "centimeters",
            m: "meters",
            kg: "kilograms",
            g: "grams",
            km: "kilometers"
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
    document.querySelectorAll('[data-es]').forEach(elemento => {
        const textoEs = elemento.getAttribute('data-es');
        const textoEn = elemento.getAttribute('data-en');
        
        if (elemento.tagName === 'INPUT') {
            // Para inputs, actualizar placeholder
            const placeholderEs = elemento.getAttribute('data-es-placeholder');
            const placeholderEn = elemento.getAttribute('data-en-placeholder');
            if (placeholderEs && placeholderEn) {
                elemento.placeholder = idioma === 'es' ? placeholderEs : placeholderEn;
            }
        } else if (elemento.tagName === 'OPTION') {
            // Para options del select
            elemento.textContent = idioma === 'es' ? textoEs : textoEn;
        } else if (elemento.tagName === 'BUTTON' || elemento.tagName === 'LABEL' || elemento.tagName === 'P' || elemento.tagName === 'STRONG' || elemento.tagName === 'H1' || elemento.tagName === 'TITLE') {
            elemento.textContent = idioma === 'es' ? textoEs : textoEn;
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
// FUNCIONES DE FORMATO
// ============================================

// Función para formatear números: sin separadores de miles, punto en inglés y coma en español para decimales
function formatearNumero(numero) {
    if (Number.isInteger(numero)) {
        // Para enteros, simplemente retornar el número sin separadores
        return numero.toString();
    } else {
        // Para números muy pequeños, usar notación científica
        if (Math.abs(numero) < 0.0001 && numero !== 0) {
            let notacion = numero.toExponential(4);
            // Reemplazar el punto por coma si es español
            if (idiomaActual === 'es') {
                notacion = notacion.replace('.', ',');
            }
            return notacion;
        }
        // Para otros números, mostrar hasta 4 decimales significativos
        let numeroFormateado = parseFloat(numero.toFixed(4)).toString();
        
        // Reemplazar el punto decimal por coma si el idioma es español
        if (idiomaActual === 'es') {
            numeroFormateado = numeroFormateado.replace('.', ',');
        }
        
        return numeroFormateado;
    }
}

// ============================================
// FUNCIÓN PARA OBTENER NOMBRE DE UNIDADES
// ============================================

function obtenerNombreUnidad(codigo) {
    return mensajes[idiomaActual].unidades[codigo] || codigo;
}

// ============================================
// FUNCIÓN PARA OBTENER UNIDADES DE CONVERSIÓN
// ============================================

function obtenerUnidades(tipo) {
    const unidadesMap = {
        "cm_m": { origen: "cm", destino: "m" },
        "m_cm": { origen: "m", destino: "cm" },
        "kg_g": { origen: "kg", destino: "g" },
        "g_kg": { origen: "g", destino: "kg" },
        "km_m": { origen: "km", destino: "m" },
        "m_km": { origen: "m", destino: "km" }
    };
    
    return unidadesMap[tipo];
}

// ============================================
// FUNCIÓN DE CONVERSIÓN
// ============================================

function realizarConversion(valor, tipo) {
    let resultado = 0;
    
    if (tipo === "cm_m") {
        resultado = valor / 100;
    } else if (tipo === "m_cm") {
        resultado = valor * 100;
    } else if (tipo === "kg_g") {
        resultado = valor * 1000;
    } else if (tipo === "g_kg") {
        resultado = valor / 1000;
    } else if (tipo === "km_m") {
        resultado = valor * 1000;
    } else if (tipo === "m_km") {
        resultado = valor / 1000;
    }
    
    return resultado;
}

// ============================================
// FUNCIÓN DE LIMPIEZA
// ============================================

function limpiar() {
    document.getElementById('valor').value = '';
    document.getElementById('tipo').selectedIndex = 0;
    
    const resultado = document.getElementById('resultado');
    resultado.classList.remove('show');
    resultado.innerHTML = '';
    
    // Remover clase calculated de todos los inputs
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.classList.remove('calculated');
    });
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

const formulario = document.getElementById('formularioConversion');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Prevenir que se recargue la página
    
    // Obtener los valores
    const valorInput = document.getElementById('valor').value.trim();
    const valor = parseFloat(valorInput);
    const tipo = document.getElementById('tipo').value;
    
    const divResultado = document.getElementById('resultado');
    
    // Validar que el valor sea un número válido y mayor que 0
    if (isNaN(valor) || valor <= 0) {
        divResultado.innerHTML = `<p style="color: #8D584D; font-weight: 600;">${mensajes[idiomaActual].errorValorInvalido}</p>`;
        divResultado.classList.add('show');
        return;
    }
    
    // Obtener unidades
    const unidades = obtenerUnidades(tipo);
    const nombreUnidadOrigen = obtenerNombreUnidad(unidades.origen);
    const nombreUnidadDestino = obtenerNombreUnidad(unidades.destino);
    
    // Realizar la conversión
    const resultado = realizarConversion(valor, tipo);
    
    // Agregar efecto visual al input
    document.getElementById('valor').classList.add('calculated');
    
    // Mostrar el div de resultado
    divResultado.classList.add('show');
    
    // Uso de bucle para animar (tema: loops)
    let texto = mensajes[idiomaActual].calculando;
    let puntos = "";
    let i = 0;
    
    let intervalo = setInterval(function() {
        puntos += ".";
        divResultado.innerHTML = `<p style="text-align: center; font-size: 18px; color: #538594;">${texto}${puntos}</p>`;
        i++;
        if (i > 3) {
            clearInterval(intervalo);
            divResultado.innerHTML = `
                <h2>${mensajes[idiomaActual].resultadoTitulo}</h2>
                <p>${mensajes[idiomaActual].valorOriginal} <strong class="result-value">${formatearNumero(valor)} ${nombreUnidadOrigen}</strong></p>
                <p>${mensajes[idiomaActual].valorConvertido} <strong class="result-value">${formatearNumero(resultado)} ${nombreUnidadDestino}</strong></p>
            `;
            
            // Remover clase calculated después de la animación
            setTimeout(() => {
                document.getElementById('valor').classList.remove('calculated');
            }, 600);
        }
    }, 400);
});

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Establecer idioma inicial
    cambiarIdioma('es');
    
    // Agregar validación en tiempo real para el input numérico
    const inputValor = document.getElementById('valor');
    
    inputValor.addEventListener('input', function(e) {
        // Permitir números, punto decimal y backspace
        const valor = e.target.value;
        // Remover cualquier caracter que no sea número o punto
        const valorLimpio = valor.replace(/[^\d.]/g, '');
        
        // Asegurar que solo haya un punto decimal
        const partes = valorLimpio.split('.');
        if (partes.length > 2) {
            e.target.value = partes[0] + '.' + partes.slice(1).join('');
        } else {
            e.target.value = valorLimpio;
        }
    });
    
    // Prevenir pegar contenido no numérico
    inputValor.addEventListener('paste', function(e) {
        e.preventDefault();
        const texto = (e.clipboardData || window.clipboardData).getData('text');
        const numeroValido = texto.match(/\d*\.?\d*/);
        if (numeroValido && numeroValido[0]) {
            document.execCommand('insertText', false, numeroValido[0]);
        }
    });
    
    // Permitir enviar el formulario con Enter
    inputValor.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            formulario.dispatchEvent(new Event('submit'));
        }
    });
    
    // Enfocar automáticamente el input al cargar
    inputValor.focus();
});