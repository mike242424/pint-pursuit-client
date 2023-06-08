export const closeModal = (modalName) => {
  const modal = document.getElementById(modalName);
  const modalBackdrop = document.querySelector(".modal-backdrop");

  modal.classList.remove("show");
  modal.style.display = "none";

  modalBackdrop.parentNode.removeChild(modalBackdrop);
};
