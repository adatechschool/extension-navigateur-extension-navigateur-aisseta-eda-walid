//fonction pour mettre à jour le minuteur

function updateTime() {
  //on récupère les 3 valeurs dans le storage local de chrome
  chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    const time = document.getElementById("time"); //pour afficher en html

    //la variable minute et calcul des minutes restantes
    const minutes = String(res.timeOption - Math.ceil(res.timer / 60)).padStart(
      2,
      "0"
    );
    //res.timeOption: C'est la valeur de l'option de temps provenant d'un objet stocké dans le stockage local de Chrome.res.timer: C'est la valeur du minuteur, également obtenue à partir de l'objet stocké dans le stockage local de Chrome.
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer";
  });
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn"); //on stock dans la variable
startTimerBtn.addEventListener("click", () => { //on detecte le click de l'utilisateur
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});
