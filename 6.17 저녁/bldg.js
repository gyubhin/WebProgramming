document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".allButton");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const dialogId = button.dataset.dialog;
      const dialog = document.getElementById(dialogId);
      dialog.showModal();
    });
  });

  const closeButtons = document.querySelectorAll("dialog .margin2");

  closeButtons.forEach(closeButton => {
    closeButton.addEventListener("click", (event) => {
      const dialog = event.target.closest("dialog");
      dialog.close();
    });
  });
});
