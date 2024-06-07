var database = require("../database/config")

function salvarVoto(fkUsuario, fkPersonagem) {
    var instrucaoSql = `
        INSERT INTO votos (fkUsuario, fkPersonagem) values (${fkUsuario}, ${fkPersonagem});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function recuperarVotos() {
    var instrucaoSql = `
        SELECT 
            nome, 
            count(fkPersonagem) AS qtdVotos 
        FROM votos 
            JOIN personagens 
            on votos.fkPersonagem = personagens.idPersonagem GROUP BY personagens.idPersonagem  
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarVoto,
    recuperarVotos
}