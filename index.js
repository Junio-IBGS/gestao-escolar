const form = {
  email: () => document.getElementById("email"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  passwordRequiredError: () => document.getElementById("password-required-error"),
  recoverPasswordButton: () => document.getElementById("recover-password-button"),
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "../sis/menu.html";
  }
})


function login() {
  firebase.auth().signInWithEmailAndPassword(
    form.email().value, form.password().value
  ).then(response => {
    window.location.href = "../sis/menu.html";
  }).catch(error => {
    alert(getErrorMessage(error));
  });
}



function recoverpassword() {
  firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
    alert('Email enviado com sucesso');
  }).catch(error => {
    alert(getErrorMessage(error));
  })
}

//erros

function getErrorMessage(error) {
  if (error.code == "auth/user-not-found") {
    return "Usuário nao encontrado";
  }
  return error.message;
}
function getErrorMessage(error) {
  if (error.code == "auth/invalid-credential") {
    return "Senha incorreta";
  }
  return error.message;
}

function getErrorMessage(error) {
  if (error.code == "auth/invalid-email") {
    return "Campo e-mail vazio ou invalido verifique";
  }
  return error.message;
}




function toggleEmailErrors() {
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";

  form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  form.recoverPasswordButton().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = form.email().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function isPasswordValid() {
  return form.password().value ? true : false;
}


//fim erros
