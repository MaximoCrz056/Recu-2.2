let evaluarBtn = document.querySelector("#evaluarBtn");
let resultado = document.querySelector("#resultado");

let limpiarFormulario = () => {
  document.querySelector("#a").value = "";
  document.querySelector("#b").value = "";
  document.querySelector("#c").value = "";
  resultado.innerHTML = "";
};

let calcularRaices = (a, b, c) => {
  let discriminante = b * b - 4 * a * c;
  let raices = [];

  if (a === 0) {
    return null;
  }

  if (discriminante > 0) {
    let raiz1 = (-b + Math.sqrt(discriminante)) / (2 * a);
    let raiz2 = (-b - Math.sqrt(discriminante)) / (2 * a);
    raices = [raiz1, raiz2];
  } else if (discriminante === 0) {
    let raiz = -b / (2 * a);
    raices = [raiz, raiz];
  } else {
    return { error: "negativa" };
  }

  return { raices };
};

let generarContenido = (a, b, c, resultadoCalculo) => {
  if (resultadoCalculo.error === "negativa") {
    return `<p class='text-danger mt-3'>La ecuación no tiene solución porque la raíz es negativa.</p>
            <button id='regresarBtn' class='btn btn-danger btn-sm mt-3'>Regresar</button>`;
  } else {
    let raices = resultadoCalculo.raices;
    let tablaHTML = "<table class='table table-bordered mt-3'>";
    tablaHTML +=
      "<thead><tr><th>a</th><th>b</th><th>c</th><th>x1</th><th>x2</th></tr></thead>";
    tablaHTML +=
      "<tbody><tr><td>" + a + "</td><td>" + b + "</td><td>" + c + "</td>";

    for (let i = 0; i < 2; i++) {
      if (raices[i] !== undefined) {
        tablaHTML += "<td>" + raices[i].toFixed(2) + "</td>";
      } else {
        tablaHTML += "<td>-</td>";
      }
    }

    tablaHTML += "</tr></tbody></table>";
    tablaHTML +=
      "<button id='regresarBtn' class='btn btn-danger btn-sm mt-3'>Regresar</button>";
    return tablaHTML;
  }
};

evaluarBtn.addEventListener("click", () => {
  let a = parseFloat(document.querySelector("#a").value);
  let b = parseFloat(document.querySelector("#b").value);
  let c = parseFloat(document.querySelector("#c").value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    resultado.innerHTML = `<p class='text-danger mt-3'>Por favor, ingresa valores numéricos válidos.</p>
                            <button id='regresarBtn' class='btn btn-danger btn-sm mt-3'>Regresar</button>`;
    let regresarBtn = document.querySelector("#regresarBtn");
    regresarBtn.addEventListener("click", () => {
      limpiarFormulario();
    });
    return;
  }

  let resultadoCalculo = calcularRaices(a, b, c);

  let contenidoHTML = generarContenido(a, b, c, resultadoCalculo);
  resultado.innerHTML = contenidoHTML;

  let regresarBtn = document.querySelector("#regresarBtn");
  regresarBtn.addEventListener("click", () => {
    limpiarFormulario();
  });
});

window.addEventListener("load", () => {
  limpiarFormulario();
});
