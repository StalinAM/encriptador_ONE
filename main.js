const input_text = document.getElementById("input_text");
const btn_encrypt = document.getElementById("encrypt");
const btn_decrypt = document.getElementById("decrypt");
const btn_copy = document.getElementById("copy");
const message = document.getElementById("message");

const message_not_found_container = document.querySelector(
  ".message_not_found_container"
);
const message_found_container = document.querySelector(
  ".message_found_container"
);

const KEYS_ENCRYPT = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const encryptMessage = (message) => {
  return message
    .split("")
    .map((item) => (KEYS_ENCRYPT[item] ? KEYS_ENCRYPT[item] : item))
    .join("");
};

btn_encrypt.addEventListener("click", () => {
  message_not_found_container.classList.add("active");
  message_found_container.classList.remove("active");
  message.innerHTML = encryptMessage(input_text.value);
});

btn_copy.addEventListener("click", () => {
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
