// sessão
function validarSessao() {
    const idUsuario = sessionStorage.ID_USUARIO;
    const quizHeader = document.getElementById("quiz-header");      
    const dashboardHeader = document.getElementById("dashboard-header");
    const sairHeader = document.getElementById("sair-header");

    if (idUsuario != null) {    
        quizHeader.style.display = "block";
        dashboardHeader.style.display = "block";
        sairHeader.style.display = "block";
    } else {
        quizHeader.style.display = "none";
        dashboardHeader.style.display = "none";
        sairHeader.style.display = "none";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

