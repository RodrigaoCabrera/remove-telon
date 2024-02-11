const removeTelon = document.getElementById("remove-telon");
console.log(removeTelon);
chrome.storage.sync.get(["remove-telon"], function (result) {
  removeTelon.checked = result["remove-telon"];
});

removeTelon.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  chrome.storage.sync.set({ "remove-telon": isChecked });
  remove(isChecked);
});

function remove(isChecked) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: function (isChecked) {
        const telonModal = document.querySelector(
          ".vtex-modal-layout-0-x-modal"
        );
        if (!telonModal) return;
        const bgBase = document.querySelector(".bg-base");
        if (isChecked) {
          telonModal.style.display = "none";
          bgBase.classList.remove("vtex-modal-layout-0-x-hiddenContainer");
        }
      },
      args: [isChecked],
    });
  });
}
