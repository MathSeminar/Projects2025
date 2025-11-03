// ============================================
// IDIOMAS Y TRADUCCIONES
// ============================================

let idiomaActual = 'es';

const traducciones = {
    es: {
        // Mensajes de validación
        alertUnValor: "⚠️ Por favor, ingrese al menos 2 valores conocidos. Solo ha ingresado 1 valor.",
        alertDosValores: "⚠️ Por favor, ingrese exactamente 2 valores conocidos.",
        alertMasDeDos: "⚠️ Ha ingresado más de 2 valores. Por favor, ingrese solo 2 valores y deje los demás vacíos.",
        alertAngulosIncompatibles: "⚠️ No puede ingresar ambos ángulos simultáneamente. Uno se calcula automáticamente.",
        
        // Mensajes de error
        errorCatetoMayorHipotenusa: "El cateto no puede ser mayor que la hipotenusa",
        errorCombinacionInvalida: "Combinación de valores no válida para resolver el triángulo",
        errorAnguloInvalido: "El ángulo debe estar entre 0° y 90°",
        errorPrefix: "❌ Error: ",
        
        // Mensaje de éxito
        exitoCalculo: "✅ ¡Triángulo resuelto exitosamente!"
    },
    en: {
        // Validation messages
        alertUnValor: "⚠️ Please enter at least 2 known values. You have only entered 1 value.",
        alertDosValores: "⚠️ Please enter exactly 2 known values.",
        alertMasDeDos: "⚠️ You have entered more than 2 values. Please enter only 2 values and leave the rest empty.",
        alertAngulosIncompatibles: "⚠️ You cannot enter both angles simultaneously. One is calculated automatically.",
        
        // Error messages
        errorCatetoMayorHipotenusa: "The leg cannot be greater than the hypotenuse",
        errorCombinacionInvalida: "Invalid combination of values to solve the triangle",
        errorAnguloInvalido: "The angle must be between 0° and 90°",
        errorPrefix: "❌ Error: ",
        
        // Success message
        exitoCalculo: "✅ Triangle solved successfully!"
    }
};

// ============================================
// FUNCIÓN PARA CAMBIAR IDIOMA
// ============================================

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
        const textoTraducido = elemento.getAttribute('data-' + idioma);
        
        if (textoTraducido) {
            if (elemento.tagName === 'INPUT') {
                // Para inputs, no cambiamos el textContent
                // Los placeholders se manejan por separado
            } else if (elemento.tagName === 'BUTTON' || elemento.tagName === 'A') {
                elemento.textContent = textoTraducido;
            } else {
                elemento.textContent = textoTraducido;
            }
        }
    });
    
    // Actualizar placeholders de inputs
    document.querySelectorAll('input[data-es-placeholder]').forEach(input => {
        const placeholderKey = idioma === 'es' ? 'data-es-placeholder' : 'data-en-placeholder';
        const placeholder = input.getAttribute(placeholderKey);
        if (placeholder) {
            input.placeholder = placeholder;
        }
    });
    
    // Actualizar el título de la página
    const title = document.querySelector('title');
    if (title) {
        const tituloTraducido = title.getAttribute('data-' + idioma);
        if (tituloTraducido) {
            title.textContent = tituloTraducido;
        }
    }

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
// FUNCIONES DE CONVERSIÓN
// ============================================

// Función para convertir grados a radianes
function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

// Función para convertir radianes a grados
function radianesAGrados(radianes) {
    return radianes * (180 / Math.PI);
}

// ============================================
// FUNCIONES PARA TOMA DE VALORES
// ============================================

// Función para tomar los valores de los campos
function obtenerValores() {
    const angulo = document.getElementById("angulo").value;
    const opuesto = document.getElementById("opuesto").value;
    const adyacente = document.getElementById("adyacente").value;
    const hipotenusa = document.getElementById("hipotenusa").value;
    
    return {
        angulo: angulo !== "" ? Number(angulo) : null,
        opuesto: opuesto !== "" ? Number(opuesto) : null,
        adyacente: adyacente !== "" ? Number(adyacente) : null,
        hipotenusa: hipotenusa !== "" ? Number(hipotenusa) : null
    };
}

// Función para contar cuántos valores están ingresados
function contarValoresIngresados(valores) {
    let contador = 0;
    if (valores.angulo !== null) contador++;
    if (valores.opuesto !== null) contador++;
    if (valores.adyacente !== null) contador++;
    if (valores.hipotenusa !== null) contador++;
    return contador;
}

// Función para redondear valores calculados en los campos
function establecerValor(campo, valor) {
    const inputElement = document.getElementById(campo);
    inputElement.value = valor.toFixed(2);
    
    // Animación de pulso al campo calculado
    inputElement.classList.add('calculated');
    setTimeout(() => {
        inputElement.classList.remove('calculated');
    }, 600);
}

// ============================================
// FUNCIÓN DE CÁLCULO PRINCIPAL
// ============================================

// Aquí se verifica que el usuario ingrese bien los valores
function calcular() {
    const valores = obtenerValores();
    const cantidadValores = contarValoresIngresados(valores);
    
    // VALIDACIÓN: Verificar que haya exactamente 2 valores
    
    // Caso 1: Menos de 2 valores (0 o 1)
    if (cantidadValores === 0) {
        alert(traducciones[idiomaActual].alertDosValores);
        return;
    }
    
    // Caso 2: Solo 1 valor ingresado
    if (cantidadValores === 1) {
        alert(traducciones[idiomaActual].alertUnValor);
        return;
    }
    
    // Caso 3: Más de 2 valores ingresados
    if (cantidadValores > 2) {
        alert(traducciones[idiomaActual].alertMasDeDos);
        return;
    }
    
    // Si llegamos aquí, cantidadValores === 2 ✅
    
    // Ejecutar la solución
    try {
        resolverTriangulo(valores);
        // Mostrar mensaje de éxito (opcional, comentado para no molestar al usuario)
        // alert(traducciones[idiomaActual].exitoCalculo);
    } catch (error) {
        alert(traducciones[idiomaActual].errorPrefix + error.message);
    }
}

// ============================================
// FUNCIÓN DE RESOLUCIÓN DEL TRIÁNGULO
// ============================================

// Si los campos pasan la validación, esta función resuelve el triángulo según los valores disponibles
function resolverTriangulo(v) {
    // Validar que el ángulo esté en rango válido
    if (v.angulo !== null && (v.angulo <= 0 || v.angulo >= 90)) {
        throw new Error(traducciones[idiomaActual].errorAnguloInvalido);
    }
    
    // Caso 1: Ángulo + Hipotenusa
    if (v.angulo !== null && v.hipotenusa !== null && v.opuesto === null && v.adyacente === null) {
        const anguloRad = gradosARadianes(v.angulo);
        establecerValor("opuesto", Math.sin(anguloRad) * v.hipotenusa);
        establecerValor("adyacente", Math.cos(anguloRad) * v.hipotenusa);
    }
    
    // Caso 2: Ángulo + Opuesto
    else if (v.angulo !== null && v.opuesto !== null && v.adyacente === null && v.hipotenusa === null) {
        const anguloRad = gradosARadianes(v.angulo);
        establecerValor("adyacente", v.opuesto / Math.tan(anguloRad));
        establecerValor("hipotenusa", v.opuesto / Math.sin(anguloRad));
    }
    
    // Caso 3: Ángulo + Adyacente
    else if (v.angulo !== null && v.adyacente !== null && v.opuesto === null && v.hipotenusa === null) {
        const anguloRad = gradosARadianes(v.angulo);
        establecerValor("opuesto", Math.tan(anguloRad) * v.adyacente);
        establecerValor("hipotenusa", v.adyacente / Math.cos(anguloRad));
    }
    
    // Caso 4: Opuesto + Adyacente (Teorema de Pitágoras)
    else if (v.opuesto !== null && v.adyacente !== null && v.angulo === null && v.hipotenusa === null) {
        const hipotenusaCalc = Math.sqrt(Math.pow(v.opuesto, 2) + Math.pow(v.adyacente, 2));
        const anguloCalc = radianesAGrados(Math.atan(v.opuesto / v.adyacente));
        establecerValor("hipotenusa", hipotenusaCalc);
        establecerValor("angulo", anguloCalc);
    }
    
    // Caso 5: Opuesto + Hipotenusa
    else if (v.opuesto !== null && v.hipotenusa !== null && v.angulo === null && v.adyacente === null) {
        if (v.opuesto > v.hipotenusa) {
            throw new Error(traducciones[idiomaActual].errorCatetoMayorHipotenusa);
        }
        const adyacenteCalc = Math.sqrt(Math.pow(v.hipotenusa, 2) - Math.pow(v.opuesto, 2));
        const anguloCalc = radianesAGrados(Math.asin(v.opuesto / v.hipotenusa));
        establecerValor("adyacente", adyacenteCalc);
        establecerValor("angulo", anguloCalc);
    }
    
    // Caso 6: Adyacente + Hipotenusa
    else if (v.adyacente !== null && v.hipotenusa !== null && v.angulo === null && v.opuesto === null) {
        if (v.adyacente > v.hipotenusa) {
            throw new Error(traducciones[idiomaActual].errorCatetoMayorHipotenusa);
        }
        const opuestoCalc = Math.sqrt(Math.pow(v.hipotenusa, 2) - Math.pow(v.adyacente, 2));
        const anguloCalc = radianesAGrados(Math.acos(v.adyacente / v.hipotenusa));
        establecerValor("opuesto", opuestoCalc);
        establecerValor("angulo", anguloCalc);
    }
    
    // Caso inválido
    else {
        throw new Error(traducciones[idiomaActual].errorCombinacionInvalida);
    }
}

// ============================================
// FUNCIÓN DE LIMPIEZA
// ============================================

// Función para limpiar todos los campos
function limpiar() {
    document.getElementById("angulo").value = "";
    document.getElementById("opuesto").value = "";
    document.getElementById("adyacente").value = "";
    document.getElementById("hipotenusa").value = "";
    
    // Remover cualquier animación que pueda estar activa
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('calculated');
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Establecer idioma inicial al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cambiarIdioma('es');
});