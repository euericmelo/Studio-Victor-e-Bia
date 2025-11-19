  /* ============================
        MENU MOBILE
  ============================ */
  const menuBtn = document.getElementById('menuBtn');
  const navbar = document.getElementById('navbar');
  const overlay = document.getElementById('overlay');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navbar.classList.remove('active');
    overlay.classList.remove('active');
  });


  /* ============================
        BOTÃO WHATSAPP
  ============================ */
  const btnWhats = document.getElementById("btn-whatsapp");

  btnWhats.addEventListener("click", function () {
    const numero = "5511972776263"; // coloque seu número COM DDI + DDD
    const mensagem = encodeURIComponent("Olá! Gostaria de agendar um horário no Studio Victor e Bia.");
    const link = `https://wa.me/${numero}?text=${mensagem}`;

    window.open(link, "_blank");
  });