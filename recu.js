let inputForm = document.querySelector("#inputForm");
let evaluarBtn = document.querySelector("#evaluarBtn");
let resultadoDiv = document.querySelector("#resultado");
let errorMensaje = document.querySelector("#errorMensaje");
let regresarBtn = document.querySelector("#regresarBtn");

let limpiarFormulario = () => {
    document.querySelector("#a").value = "";
    document.querySelector("#b").value = "";
    document.querySelector("#c").value = "";
    resultadoDiv.innerHTML = "";
    errorMensaje.classList.add("d-none");
};

let calcularRaices = (a, b, c) => {
    let discriminante = b * b - 4 * a * c;
    let raices = [];

    if (discriminante > 0) {
        let raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        let raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        raices = [raiz1, raiz2];
    } else if (discriminante === 0) {
        let raiz = -b / (2 * a);
        raices = [raiz];
    } else {
        // Raíces complejas, mostrar mensaje de error
        errorMensaje.classList.remove("d-none");
        return null;
    }

    return raices;
};

let generarTabla = (a, b, c, raices) => {
    let tablaHTML = `
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>a</th>
                    <th>b</th>
                    <th>c</th>
                    <th>x1</th>
                    <th>x2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${a}</td>
                    <td>${b}</td>
                    <td>${c}</td>
                    <td>${raices[0] !== undefined ? raices[0] : '-'}</td>
                    <td>${raices[1] !== undefined ? raices[1] : '-'}</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-danger btn-sm">Regresar</button>
    `;
    return tablaHTML;
};

evaluarBtn.addEventListener("click", () => {
    let a = parseFloat(document.querySelector("#a").value);
    let b = parseFloat(document.querySelector("#b").value);
    let c = parseFloat(document.querySelector("#c").value);

    if (!isNaN(a) && a !== 0 && !isNaN(b) && !isNaN(c)) {
        let raices = calcularRaices(a, b, c);

        if (raices !== null) {
            let tablaHTML = generarTabla(a, b, c, raices);
            resultadoDiv.innerHTML = tablaHTML;
            errorMensaje.classList.add("d-none");

            let regresarTablaBtn = resultadoDiv.querySelector("button");
            regresarTablaBtn.addEventListener("click", () => {
                limpiarFormulario();
            });
        }
    } else {
        alert('Por favor, ingrese valores numéricos válidos para a, b y c. Asegúrese que a sea distinto de 0.');
    }
});

window.addEventListener("load", () => {
    limpiarFormulario();
});
