const API = "http://localhost:3000";

let professorLogado = null;
let turmaSelecionada = null;

function mostrar(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById(view).classList.remove("hidden");
}

async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    document.getElementById("msg").innerText = "Login inválido";
    return;
  }

  professorLogado = data;
  document.getElementById("profNome").innerText = professorLogado.nome;

  mostrar("professorView");
  carregarTurmas();
}

async function carregarTurmas() {
  const res = await fetch(API + "/turma/listar?professorId=" + professorLogado.id);
  const turmas = await res.json();

  const div = document.getElementById("turmas");
  div.innerHTML = "";

  turmas.forEach((t, index) => {
    div.innerHTML += `
      <div class="turma">
        <span>${index + 1} - ${t.nome}</span>
        <div>
          <button onclick="verAtividades(${t.id}, '${t.nome}')">Ver</button>
          <button onclick="excluirTurma(${t.id})">Excluir</button>
        </div>
      </div>
    `;
  });
}

function mostrarCadastroTurma() {
  mostrar("cadastroTurmaView");
}

function voltarProfessor() {
  mostrar("professorView");
  carregarTurmas();
}

async function cadastrarTurma() {
  const nome = document.getElementById("nomeTurma").value;

  await fetch(API + "/turma/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      professorId: professorLogado.id
    })
  });

  voltarProfessor();
}

async function excluirTurma(id) {
  if (!confirm("Excluir turma?")) return;

  await fetch(API + "/turma/excluir/" + id, {
    method: "DELETE"
  });

  carregarTurmas();
}

async function verAtividades(id, nome) {
  turmaSelecionada = id;

  document.getElementById("turmaTitulo").innerText = nome;

  const res = await fetch(API + "/atividade/listar");
  const atividades = await res.json();

  const filtradas = atividades.filter(a => a.turmaId === id);

  const div = document.getElementById("atividades");
  div.innerHTML = "";

  filtradas.forEach((a, index) => {
    div.innerHTML += `
      <div class="atividade">
        ${index + 1} - ${a.descricao}
      </div>
    `;
  });

  mostrar("atividadesView");
}

function mostrarCadastroAtividade() {
  mostrar("cadastroAtividadeView");
}

async function cadastrarAtividade() {
  const descricao = document.getElementById("descricaoAtividade").value;

  await fetch(API + "/atividade/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      descricao,
      turmaId: turmaSelecionada
    })
  });

  verAtividades(turmaSelecionada, document.getElementById("turmaTitulo").innerText);
}

function voltarAtividades() {
  verAtividades(turmaSelecionada, document.getElementById("turmaTitulo").innerText);
}

async function logout() {
  location.reload();
}