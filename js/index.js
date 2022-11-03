'use strict';
// Declaramos nuestros elementos del DOM
const $slt_figure = document.getElementById("figura");
const $inp_base = document.getElementById("base");
const $inp_altura = document.getElementById("altura");
const $inp_radio = document.getElementById("radio");
const $btn_send = document.getElementById("send");
const $lb_area = document.getElementById("area");
const $lb_per = document.getElementById("perimetro");


// Mensajes de error
const $me_figure = document.getElementById("select_error");
const $me_radio = document.getElementById("radio_error");
const $me_base = document.getElementById("base_error");
const $me_altura = document.getElementById("altura_error");
const $me_values = document.getElementById("error_values");



// Declaramos nuestros contenedores
const container_parametros = document.getElementById("parametros");
const container_circunferencia = document.getElementById("circunferencia");
const container_fig = document.getElementById("container_fig");


container_parametros.style.display = 'none';
container_circunferencia.style.display = 'none';


$slt_figure.onchange = () => {
    $me_figure.innerText = ""
    let selectedFig = $slt_figure.value;
    if (selectedFig === 'circulo') {
        container_parametros.style.display = 'none';
        container_circunferencia.style.display = 'flex';
    } else if (selectedFig === 'cuadrado' || selectedFig === 'rectangulo' || selectedFig === 'triangulo') {
        container_circunferencia.style.display = 'none';
        container_parametros.style.display = 'flex';
    } else {
        $me_figure.innerText = "Favor de seleccionar una figura geometrica"
    }
}

$btn_send.onclick = () => {
    let selectedFig = $slt_figure.value;
    if (selectedFig === 'circulo') {
        if (validateRadio()) {
            createCircle();
        }
    } else if (selectedFig === 'cuadrado' || selectedFig === 'rectangulo' || selectedFig === 'triangulo') {
        let validateB = validateBase();
        let validateA = validateAltura();
        if (validateB && validateA) {
            createFigure();
        }
    } else {
        $me_figure.innerText = "Favor de seleccionar una figura geometrica"
    }
}

function validateRadio() {
    // Limpiamos el mensaje de error
    $me_radio.innerText = '';
    // Obtenemos el valor del input de radio
    let radio = $inp_radio.valueAsNumber;
    // validamos el valor
    if(Number.isInteger(radio)) {
        if (radio < 1) {
            $me_radio.innerText = 'El valor minimo es de 1';
            return false;
        } else if (radio > 5) {
            $me_radio.innerText = 'El valor máximo es de 5';
            return false;
        } else {
            return true;
        }
    } else {
        $me_radio.innerText = 'Favor de ingresar un valor numérico entero';
        return false;
    }
}

function validateBase() {
    // Limpiamos el mensajes de error
    $me_base.innerText = '';
    // Obtenemos el valor del input de base 
    let base = $inp_base.valueAsNumber;
    // validamos el valor
    // (1) Que el valor sea numerico y entero
    if(!Number.isInteger(base)) {
        $me_base.innerText = 'Favor de ingresar un valor numérico entero';
        return false;
    }
    // (2) que el valor sea mayor a 1
    if (base < 1) {
        $me_base.innerText = 'El valor minimo es de 1';
        return false;
    }
    // (3) que el valor no sea mayor a 10
    if (base > 10) {
        $me_base.innerText = 'El valor maximo es de 10';
        return false;
    }
    return true;
}

function validateAltura() {
    // Limpiamos el mensajes de error
    $me_altura.innerText = '';
    // Obtenemos el valor del input de altura
    let altura = $inp_altura.valueAsNumber;
    // validamos el valor
    // (1) Que el valor sea numerico y entero
    if(!Number.isInteger(altura)) {
        $me_altura.innerText = 'Favor de ingresar un valor numérico entero';
        return false;
    }
    // (2) que el valor sea mayor a 1
    if (altura < 1) {
        $me_altura.innerText = 'El valor minimo es de 1';
        return false;
    }
    // (3) que el valor no sea mayor a 10
    if (altura > 10) {
        $me_altura.innerText = 'El valor maximo es de 10';
        return false;
    }
    return true;
}


function createCircle() {
    // Limpiamos el contenedor
    container_fig.innerHTML = "";
    $lb_area.innerText = "";
    $lb_per.innerText = "";
    // Obtenemos el valor del radio
    let radio = $inp_radio.valueAsNumber*100;
    let diametro = (radio*2);
    // Calculamos el area
    let area = (3.1416)*((radio)**2);
    // Calculamos el perimetro
    let perimetro = (3.1416)*diametro;
    // Creamos la figura
    let figure = document.createElement("div");
    figure.style.width = `${diametro}px`;
    figure.style.height = `${diametro}px`;
    figure.style.backgroundColor = "red";
    figure.style.borderRadius = "50%";
    // Renderizamos la figura
    container_fig.appendChild(figure);
    // Colocamos el area y el perimetro
    $lb_area.innerText = `${area} U2`;
    $lb_per.innerText = `${perimetro} U`;
}


function createFigure() {
    // Limpiamos el contenedor
    container_fig.innerHTML = "";
    $lb_area.innerText = "";
    $lb_per.innerText = "";
    $me_values.innerText = ""
    // Obtenemos los valores 
    let base = $inp_base.valueAsNumber*100;
    let altura = $inp_altura.valueAsNumber*100;
    // Calculamos el area
    let area = base*altura;
    // Calculamos el perimetro
    let perimetro = (2*base)+(2*altura);
    // Verificamos la figura seleccionada
    let selectedFig = $slt_figure.value;
    // Creamos la figura
    let figure = document.createElement("div");
    if (selectedFig === 'cuadrado' || selectedFig === 'rectangulo') {
        figure.style.width = `${base}px`;
        figure.style.height = `${altura}px`;
        figure.style.backgroundColor = "red";
        // Colocamos el area y el perimetro
        $lb_area.innerText = `${area} U2`;
        $lb_per.innerText = `${perimetro} U`;
        if (selectedFig === 'cuadrado' && base !== altura) {
            $me_values.innerText = "Los datos indicados no corresponden a un Cuadrado"
        }
        if (selectedFig === 'rectangulo' && base === altura) {
            $me_values.innerText = "Los datos indicados no corresponden a un Rectángulo"
        }
    } else {
        figure.style.width = '0';
        figure.style.height = '0';
        figure.style.borderRight = `${base}px solid transparent`;
        figure.style.borderTop = `${altura}px solid transparent`;
        figure.style.borderLeft = `${base}px solid #f0ad4e`;
        figure.style.borderBottom = `${altura}px solid #f0ad4e`;
        // Colocamos el area y el perimetro
        $lb_area.innerText = `${area/2} U2`;
        $lb_per.innerText = `${altura + base + (teoremaP(altura, base))} U`;
    }
    // Renderizamos la figura
    container_fig.appendChild(figure);
}

function teoremaP(a, b) {
    let ladoA = a**2;
    let ladoB = b**2;

    const sum = ladoA + ladoB;
    let ladoC = sum**(1/2);
    return ladoC;
}