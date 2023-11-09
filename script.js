function combinarNumeros() {
    // Obtenemos los valores de los inputs
    var numerosInput = document.getElementById("numeros").value;
    var objetivoInput = document.getElementById("objetivo").value;

    // Convertimos los números ingresados en un array
    var numeros = numerosInput.split(",").map(function(numero) {
        return parseInt(numero.trim());
    });

    // Convertimos el número objetivo en un entero
    var objetivo = parseInt(objetivoInput.trim());

    // Llamamos a la función que encuentra las combinaciones y obtenemos el resultado
    var resultado = encontrarCombinaciones(numeros, objetivo);

    // Mostramos el resultado en el elemento con id "output"
    var outputElement = document.getElementById("output");
    outputElement.innerHTML = resultado.join("<br>");
}

function encontrarCombinaciones(numeros, objetivo) {
    // Array para almacenar las combinaciones encontradas
    var combinaciones = [];

    // Función recursiva para encontrar las combinaciones
    function encontrarCombinacionesRecursivo(numerosRestantes, combinacionActual) {
        // Si ya no hay números restantes, verificamos si la combinación actual suma el objetivo
        if (numerosRestantes.length === 0) {
            if (combinacionActual.reduce(function(a, b) { return a + b; }, 0) === objetivo) {
                combinaciones.push(combinacionActual);
            }
            return;
        }

        // Tomamos el primer número del array y lo agregamos a la combinación actual
        var numero = numerosRestantes[0];
        var nuevaCombinacion = combinacionActual.concat(numero);

        // Llamamos a la función recursiva con los números restantes y la nueva combinación actualizada
        encontrarCombinacionesRecursivo(numerosRestantes.slice(1), nuevaCombinacion);

        // Llamamos a la función recursiva sin agregar el número a la combinación actual
        encontrarCombinacionesRecursivo(numerosRestantes.slice(1), combinacionActual);
    }

    // Llamamos a la función recursiva con los números y una combinación vacía
    encontrarCombinacionesRecursivo(numeros, []);

    // Si no se encontraron combinaciones, agregamos un mensaje de error al array de resultados
    if (combinaciones.length === 0) {
        combinaciones.push("No se encontraron combinaciones que sumen " + objetivo);
    }

    return combinaciones;
}
