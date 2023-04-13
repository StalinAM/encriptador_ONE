const inputText = document.getElementById("input_text");
const btnEncrypt = document.getElementById("encrypt");
const btnDecrypt = document.getElementById("decrypt");
const btnCopy = document.getElementById("copy");
const btnCloseModal = document.getElementById("close_modal");
const message = document.getElementById("message");
const modal = document.getElementById("main_modal");

const messageNotFoundContainer = document.querySelector(
  ".message_not_found_container"
);
const messageFoundContainer = document.querySelector(
  ".message_found_container"
);

const validateString = (message) => {
  let regex = /[A-Z\_\u007F-\uFFFF]+/g;
  return !regex.test(message);
};

const KEYS_ENCRYPT = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};
const KEYS_DECRYPT = {};

Object.entries(KEYS_ENCRYPT).forEach(([key, value]) => {
  KEYS_DECRYPT[value] = key;
});

const encryptMessage = (message) => {
  return message
    .split("")
    .map((item) => (KEYS_ENCRYPT[item] ? KEYS_ENCRYPT[item] : item))
    .join("");
};

const decryptMessage = (message) => {
  let decryptedMessage = message;
  Object.keys(KEYS_DECRYPT).forEach((key) => {
    decryptedMessage = decryptedMessage.replaceAll(key, KEYS_DECRYPT[key]);
  });
  return decryptedMessage;
};

btnEncrypt.addEventListener("click", () => {
  if (!validateString(inputText.value)) {
    modal.showModal();
    return;
  }
  messageNotFoundContainer.classList.add("active");
  messageFoundContainer.classList.remove("active");
  message.innerHTML = encryptMessage(inputText.value);
});

btnDecrypt.addEventListener("click", () => {
  if (!validateString(inputText.value)) {
    modal.showModal();
    return;
  }
  messageNotFoundContainer.classList.add("active");
  messageFoundContainer.classList.remove("active");
  message.innerHTML = decryptMessage(inputText.value);
});

btnCopy.addEventListener("click", () => {
  const range = document.createRange();
  range.selectNode(message);
  window.getSelection().addRange(range);

  navigator.clipboard.writeText(message.innerHTML).then(
    function () {
      // El texto se copió con éxito en el portapapeles
      // No hace falta hacer nada más aquí
    },
    function () {
      alert("Error al copiar el texto en el portapapeles");
    }
  );
});

btnCloseModal.addEventListener("click", () => {
  modal.close();
});
