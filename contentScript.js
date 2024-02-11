chrome.runtime.sendMessage({ method: "getState" }, function (response) {
  if (response && response.state) {
    setInterval(() => {
      const telonModal = document.querySelector(".vtex-modal-layout-0-x-modal");
      if (telonModal) {
        const bgBase = document.querySelector(".bg-base");
        telonModal.style.display = "none";
        bgBase.classList.remove("vtex-modal-layout-0-x-hiddenContainer");
      }
    }, 500); // Comprueba cada 500 milisegundos
  }
});
