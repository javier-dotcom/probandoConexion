function login() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    var data = {
        usuario: usuario,
        password: password
    };

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://192.168.0.17/api/Login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                mostrarRespuesta(response);
            } else {
                mostrarError("Error al iniciar sesión: " + xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        mostrarError("Error de red al intentar conectar con la API");
    };

    xhr.ontimeout = function () {
        mostrarError("Timeout al intentar conectar con la API");
    };

    xhr.send(JSON.stringify(data));
}

function mostrarRespuesta(data) {
    var respuestaDiv = document.getElementById("respuestaAPI");
    respuestaDiv.innerHTML = "<h3>Datos obtenidos:</h3>" +
                             "<p>Nro. de Legajo: " + data[0].nroLegajo + "</p>" +
                             "<p>Empleado: " + data[0].empleado + "</p>" +
                             "<p>Forzar Cambio de Contraseña: " + data[0].forzarCambioPass + "</p>" +
                             "<p>Token: " + data[0].token + "</p>";
}

function mostrarError(mensaje) {
    var respuestaDiv = document.getElementById("respuestaAPI");
    respuestaDiv.innerHTML = "<h3>Error:</h3><p>" + mensaje + "</p>";
}
