let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const contato = { codigo, nome, telefone, email };
    contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    renderTable();
    this.reset();
});

function renderTable() {
    const tbody = document.getElementById('contatosTableBody');
    tbody.innerHTML = '';
    contatos.forEach((contato, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contato.codigo}</td>
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editContato(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteContato(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editContato(index) {
    const contato = contatos[index];
    document.getElementById('codigo').value = contato.codigo;
    document.getElementById('nome').value = contato.nome;
    document.getElementById('telefone').value = contato.telefone;
    document.getElementById('email').value = contato.email;
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    renderTable();
}

function deleteContato(index) {
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    renderTable();
}

renderTable();
