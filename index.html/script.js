const campoAno = document.querySelector('#campoAno');
const btnBuscarAno = document.querySelector('#btnBuscar');
const tbody = document.querySelector('#lista-feriados');

function popularFeriados(feriadosDados) {
    tbody.innerHTML = '';
    feriadosDados.forEach(feriado => {
        let tr = document.createElement('tr');
        let tdData = document.createElement('td');
        let tdNome = document.createElement('td');

        tdData.innerText = feriado.date.split("-").reverse().join('/');
        tdNome.innerText = feriado.name;

        tr.appendChild(tdData);
        tr.appendChild(tdNome);

        tbody.appendChild(tr);
    });
}

btnBuscarAno.addEventListener('click', function() {
    const anoValor = campoAno.value;
    const messageError = document.querySelector('.erro');

    messageError.innerHTML = '';

    if (anoValor <= 0 || anoValor < 1900 || anoValor > 2199) {
        messageError.innerHTML = "Ano inválido, insira um ano entre 1900 e 2199";
        return;
    }

    const URL = `https://brasilapi.com.br/api/feriados/v1/${anoValor}`;
    
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(dados) {
            console.log(dados);
            popularFeriados(dados);
        })
        .catch(function(erro) {
            console.log(erro);
        });
});
