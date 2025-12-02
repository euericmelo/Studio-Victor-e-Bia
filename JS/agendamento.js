document.addEventListener("DOMContentLoaded", () => {

  // HORÁRIOS A CADA 30 MIN
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

  const numeroWhatsApp = "5511972776263";
  const listaHorarios = document.getElementById("lista-horarios");
  const dataInput = document.getElementById("data");
  const form = document.getElementById("form-agenda");

  let horarioSelecionado = "";

  // ============================
  //   LOCALSTORAGE
  // ============================

  const horariosOcupados = JSON.parse(localStorage.getItem("ocupados")) || {};

  function salvarOcupados() {
    localStorage.setItem("ocupados", JSON.stringify(horariosOcupados));
  }


  // ============================
  // DEFINIR MIN DATA
  // ============================

  (function setMinDate() {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    const dd = String(hoje.getDate()).padStart(2, "0");
    dataInput.min = `${yyyy}-${mm}-${dd}`;
  })();


  // ============================
  // BLOQUEAR DOMINGO / SEGUNDA
  // ============================

  dataInput.addEventListener("input", () => {
    const val = dataInput.value;
    if (!val) return;

    const day = new Date(val + "T00:00").getDay();

    if (day === 0 || day === 1) {
      dataInput.value = "";
      listaHorarios.innerHTML = `<p class="aviso">Selecione uma data de Terça a Sábado.</p>`;
      return;
    }

    carregarHorarios(val);
  });


  // ============================
  //   FUNÇÃO → MOSTRAR HORÁRIOS
  // ============================

  function carregarHorarios(dataEscolhida) {
    listaHorarios.innerHTML = "";
    horarioSelecionado = "";

    const ocupados = horariosOcupados[dataEscolhida] || [];

    const hoje = new Date();
    const dataSelecionada = new Date(dataEscolhida + "T00:00");

    const diaHoje = hoje.toISOString().split("T")[0];
    const mesmaData = dataEscolhida === diaHoje;

    horarios.forEach(hora => {
      const el = document.createElement("div");
      el.className = "horario";
      el.textContent = hora;

      // BLOQUEAR HORÁRIO PASSADO (se for hoje)
      if (mesmaData) {
        const [h, m] = hora.split(":");
        const agoraMin = hoje.getHours() * 60 + hoje.getMinutes();
        const horaMin = parseInt(h) * 60 + parseInt(m);

        if (horaMin <= agoraMin) {
          el.classList.add("ocupado");
          listaHorarios.appendChild(el);
          return;
        }
      }

      // HORÁRIO OCUPADO
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


  // ============================
  //     FORM → WHATSAPP
  // ============================

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

    // Salvar horário ocupado
    if (!horariosOcupados[data]) horariosOcupados[data] = [];
    if (!horariosOcupados[data].includes(horarioSelecionado)) {
      horariosOcupados[data].push(horarioSelecionado);
      salvarOcupados();
    }

    // MENSAGEM BONITA
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

    carregarHorarios(data);
  });

});

    // ===============================
    // MENU HAMBÚRGUER + OVERLAY
    // ===============================

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const overlay = document.getElementById("overlay");

    if (menuBtn && navbar && overlay) {

        // Função abrir menu
        function abrirMenu() {
            menuBtn.classList.add("active");
            navbar.classList.add("mobile-show");
            navbar.classList.remove("mobile-hidden");
            overlay.classList.add("show");
        }

        // Função fechar menu
        function fecharMenu() {
            menuBtn.classList.remove("active");
            navbar.classList.remove("mobile-show");
            navbar.classList.add("mobile-hidden");
            overlay.classList.remove("show");
        }

        // Toggle do botão
        menuBtn.addEventListener("click", () => {
            if (navbar.classList.contains("mobile-show")) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });

        // Fechar menu ao clicar no overlay
        overlay.addEventListener("click", () => {
            fecharMenu();
        });
    }