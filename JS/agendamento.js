// agendamento.js atualizado — salva agendamento COMPLETO

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form-agenda");
  const listaHorarios = document.getElementById("lista-horarios");

  const KEY = "agendamentos";

  // carregar storage
  function getStore() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  }

  // salvar storage
  function saveStore(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
  }

  // horários padrão
  const horariosPadrao = [
    "09:00","10:00","11:00",
    "13:00","14:00","15:00","16:00"
  ];

  // carregar horários ao mudar a data
  document.getElementById("data").addEventListener("change", (e) => {
    carregarHorarios(e.target.value);
  });

  function carregarHorarios(dataEscolhida) {
    listaHorarios.innerHTML = "";
    if (!dataEscolhida) return;

    const store = getStore();
    const ocupados = store[dataEscolhida]?.map(a => a.hora) || [];

    horariosPadrao.forEach(hora => {
      const div = document.createElement("div");
      div.className = "horario";
      div.textContent = hora;

      if (ocupados.includes(hora)) {
        div.classList.add("ocupado");
      } else {
        div.addEventListener("click", () => {
          document.querySelectorAll(".horario").forEach(x => x.classList.remove("selecionado"));
          div.classList.add("selecionado");
        });
      }

      listaHorarios.appendChild(div);
    });
  }

  // enviar agendamento
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value.trim();
    const data = document.getElementById("data").value;

    const horarioSelecionado = document.querySelector(".horario.selecionado");
    if (!horarioSelecionado) {
      alert("Selecione um horário!");
      return;
    }

    const hora = horarioSelecionado.textContent;

    // montar objeto
    const store = getStore();
    if (!store[data]) store[data] = [];

    // salvar objeto completo
    store[data].push({
      hora,
      nome,
      telefone,
      servico
    });

    saveStore(store);

    alert("Agendamento realizado com sucesso!");
    form.reset();
    listaHorarios.innerHTML = "";
  });
});