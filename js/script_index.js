import Countdown from "./countdown.js";

const tempoParaDesconto = new Countdown("29 June 2021 20:00:00 GMT-0300");
const tempos = document.querySelectorAll("[data-time]");

function mostrarTempo() {
	tempos.forEach((tempo, index) => {
  tempo.innerHTML = tempoParaDesconto.total[index];
});

}
mostrarTempo();
setInterval(mostrarTempo, 1000);




