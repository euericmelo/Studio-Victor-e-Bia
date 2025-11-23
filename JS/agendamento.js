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

  const horariosOcupados = {};
  const numeroWhatsApp = "5511972776263";

  const listaHorarios = document.getElementById("lista-horarios");
  const dataInput = document.getElementById("data");
  const form = document.getElementById("form-agenda");

  let horarioSelecionado = "";

  // Define a menor data (hoje)
  (function setMinDate() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    const dd = String(hoje.getDate()).padStart(2, "0");
    dataInput.min = `${yyyy}-${mm}-${dd}`;
  })();

  // Quando escolhe a data → mostra horários
  dataInput.addEventListener("change", () => {
    listaHorarios.innerHTML = "";
    horarioSelecionado = "";

    const dataVal = dataInput.value;
    if (!dataVal) return;

    const dataObj = new Date(dataVal + "T00:00:00");
    const dia = dataObj.getDay();

    // Domingo e segunda = fechado
    if (dia === 0 || dia === 1) {
      alert("Agendamentos apenas de Terça a Sábado.");
      dataInput.value = "";
      return;
    }

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
  });

  // FORMULÁRIO → WhatsApp
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

    // Marca horário como ocupado
    if (!horariosOcupados[data]) horariosOcupados[data] = [];
    horariosOcupados[data].push(horarioSelecionado);

    // MENSAGEM COM EMOJIS (ATUALIZADA)
    const mensagem = `
⭐ *NOVO AGENDAMENTO — Studio Victor & Bia* ⭐

👤 *Nome:* ${nome}
📱 *Telefone:* ${telefone}

💼 *Serviço:* ${servico}

📅 *Data:* ${data}
⏰ *Horário:* ${horarioSelecionado}

Obrigado pelo agendamento! 😊
    `.trim();

    // Link WhatsApp
    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = link; // funciona no iPhone
  });

});