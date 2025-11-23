document.addEventListener("DOMContentLoaded", () => {

  // HORÁRIOS A CADA 30 MINUTOS
  const horarios = [
    "09:00","09:30",
    "10:00","10:30",
    "11:00","11:30",
    "12:00","12:30",
    "13:00","13:30",
    "14:00","14:30",
    "15:00","15:30",
    "16:00","16:30",
    "17:00","17:30",
    "18:00"
  ];

  // Guarda horários ocupados enquanto o usuário está na página
  const horariosOcupados = {};

  const numeroWhatsApp = "5511972776263";

  const listaHorarios = document.getElementById("lista-horarios");
  const dataInput = document.getElementById("data");
  const form = document.getElementById("form-agenda");

  let horarioSelecionado = "";

  // Define min date (hoje)
  (function setMinDate() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    const dd = String(hoje.getDate()).padStart(2, "0");
    dataInput.min = `${yyyy}-${mm}-${dd}`;
  })();


  // ==========================
  //     GERAR HORÁRIOS
  // ==========================

  function carregarHorarios(dataVal) {
    listaHorarios.innerHTML = "";
    horarioSelecionado = "";

    const ocupados = horariosOcupados[dataVal] || [];

    horarios.forEach(hora => {
      const el = document.createElement("div");
      el.className = "horario";
      el.textContent = hora;

      if (ocupados.includes(hora)) {
        el.classList.add("ocupado");
      } else {
        el.addEventListener("click", () => {
          document.querySelectorAll(".horario").forEach(x => x.classList.remove("selecionado"));
          el.classList.add("selecionado");
          horarioSelecionado = hora;
        });
      }

      listaHorarios.appendChild(el);
    });
  }


  // ==========================
  //     AO MUDAR A DATA
  // ==========================

  dataInput.addEventListener("change", () => {
    const dataVal = dataInput.value;
    if (!dataVal) return;

    const diaSemana = new Date(dataVal + "T00:00:00").getDay();

    // Bloqueio de domingo (0) e segunda (1)
    if (diaSemana === 0 || diaSemana === 1) {
      alert("Agendamentos apenas de Terça a Sábado.");
      
      // NÃO limpa o input → apenas retorna
      // e espera o usuário escolher outra data
      return;
    }

    carregarHorarios(dataVal);
  });


  // ==========================
  //   FORM → WHATSAPP
  // ==========================

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const servico = document.getElementById("servico").value;
    const data = dataInput.value;

    if (!nome || !telefone || !servico || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!horarioSelecionado) {
      alert("Escolha um horário.");
      return;
    }

    // Impede agendar duas vezes no mesmo horário
    if (!horariosOcupados[data]) {
      horariosOcupados[data] = [];
    }
    if (horariosOcupados[data].includes(horarioSelecionado)) {
      alert("Este horário já está ocupado!");
      return;
    }

    horariosOcupados[data].push(horarioSelecionado);

    // Mensagem estilizada com emojis
    const mensagem = `
⭐ *NOVO AGENDAMENTO — Studio Victor & Bia* ⭐

👤 *Nome:* ${nome}
📱 *Telefone:* ${telefone}

💼 *Serviço:* ${servico}

📅 *Data:* ${data}
⏰ *Horário:* ${horarioSelecionado}

Obrigado pelo agendamento! 😊
    `.trim();

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = link;

    // Recarrega a lista de horários após ocupar
    carregarHorarios(data);
  });

});