class Validator {
  constructor() {
    this.validations = [
      "data-required",
      "data-only-letters",
      "data-only-numbers",
      "data-min-length",
      "data-cpf-length",
      "data-email-validate",
      "data-password-validate",
      "data-equal",
      "data-minpass-length",
    ];
  }
  //inicia a validação de todos os caampos
  validate(form) {
    //resgata todas as validações
    let currentValidations = document.querySelectorAll(
      "form .error-validation"
    );

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }

    //pegar os imputs
    let inputs = form.getElementsByTagName("input");

    //transformo umaHTMLCollection -> array
    let inputsArray = [...inputs];

    //lop nos inputs e validação mediante ao que for encontrado
    inputsArray.forEach(function (input) {
      //loop em todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        //verifica se a validãção existe no input
        if (input.getAttribute(this.validations[i]) != null) {
          //data-min-length -> minlength, limpando para virar um método
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          let value = input.getAttribute(this.validations[i]);

          //invocar o método
          this[method](input, value);
        }
      }
    }, this);

    if (currentValidations.length === 0) {
      return true;
    }
  }

  // valida o campo de senha
  passwordvalidate(input) {
    // explodir a string em um array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (
        charArr[i] === charArr[i].toUpperCase() &&
        isNaN(parseInt(charArr[i]))
      ) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if (uppercases === 0 || numbers === 0) {
      let erroMessage = `A senha precisa de pelo menos um caractere maiúsculo e um número`;
      this.printMessage(input, erroMessage);
    }
  }

  //verifia se um input tem um número mínimo de caracteres
  minlength(input, minValue) {
    let inputlength = input.value.length;

    let erroMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
    if (inputlength < minValue) {
      this.printMessage(input, erroMessage);
    }
  }

  minpasslength(input, minpassValue) {
    let inputlength = input.value.length;

    let erroMessage = `O campo precisa ter pelo menos ${minpassValue} caracteres`;
    if (inputlength < minpassValue) {
      this.printMessage(input, erroMessage);
    }
  }

  // valída emails

  emailvalidate(input) {
    // email@email.com.br

    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let erroMessage = `Digite um email valido (exemplo@exemplo.com.br)`;

    if (!re.test(email)) {
      this.printMessage(input, erroMessage);
    }
  }

  //verifica se o input tem só letras
  onlyletters(input) {
    let re = /^[A-Za-z ]+$/;

    let inputValue = input.value;

    let erroMessage = `Este campo não aceita números nem caracteres especiais`;

    if (!re.test(inputValue)) {
      this.printMessage(input, erroMessage);
    }
  }

  onlynumbers(input) {
    let re = /^[0-9]+$/;

    let inputValue = input.value;

    let erroMessage = `Este campo só aceita números`;

    if (!re.test(inputValue)) {
      this.printMessage(input, erroMessage);
    }
  }

  //verifica se input passa do limite de caracteres
  cpflength(input, cpfValue) {
    let inputlength = input.value.length;

    let erroMessage = "Digite o CPF corretamente";

    if (inputlength != cpfValue) {
      this.printMessage(input, erroMessage);
    }
  }

  //verifica se o input é requirido
  required(input) {
    let inputValue = input.value;

    if (inputValue === "") {
      let erroMessage = `Este campo é obrigatório`;

      this.printMessage(input, erroMessage);
    }
  }

  // verifica se dois campos são iguais
  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];

    let erroMessage = `Este campo precisa estar igual ao campo ${inputName}!`;

    if (input.value != inputToCompare.value) {
      this.printMessage(input, erroMessage);
    }
  }

  //método para imprimir mensagem de erro na tela
  printMessage(input, msg) {
    // quantidade de erros
    let errorsQty = input.parentNode.querySelector(".error-validation");

    if (errorsQty === null) {
      let template = document
        .querySelector(".error-validation")
        .cloneNode(true);

      template.textContent = msg;

      let inputParent = input.parentNode;

      template.classList.remove("template");

      inputParent.appendChild(template);
    }
  }

  // limpa as validações da tela
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}

//-------------------------------------------\\

let form = document.getElementById("formcadastro");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(validator.validate(form));

  if (validator.validate(form)) {
    window.location.replace("pagina-inicial.html");
  }
});

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
  body.className = "sign-in-js";
});

btnSignup.addEventListener("click", function () {
  body.className = "sign-up-js";
});

// function validar() {
// 	var formulario = document.forms["formcadastro"]
// 	var nome = formulario.nome.value
// 	var email = formulario.email.value
// 	var cpf = formulario.cpf.value
// 	var senha = formulario.senha.value
// 	var confirmar = formulario.confirmar.value

// 	var erro = false

// 	if (nome.indexOf(" ") == -1){
// 		alert("Prencha o nome completo")
// 		erro = true
// 	}

// 	if () {}

// 	if (cpf.length != 11) {
// 		alert("CPF inválido")
// 	}
// 	erro = true

// 	if(erro){
// 		return false
// 	}else {
// 		return true
// 	}

// }
