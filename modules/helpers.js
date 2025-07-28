function validation(element) {
  if ((element.value).trim() === "") {
    element.classList.add("error");
    element.value = "";
    element.placeholder = "Заполните это поле";
    return false;
  } else {
    return true;
  }
}

function deleteClass(element, className) {
  element.classList.remove(className);
  element.placeholder = "";
}

function setPlaceholder(element, placeholderText) {
  element.placeholder = placeholderText;
}

function formatText(text) {
  return text.replaceAll("<", "&lt").replaceAll(">", "&gt");
}


export { validation, deleteClass, setPlaceholder, formatText }