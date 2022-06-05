class Validar {

	constructor() {
		this.validations = [
			'data-required',
			'data-min-length',
			'data-cpf-length',
			'data-email-validate',
			
			
		]

	}

	//inicia a validação de todos os caampos 
	validate(form) {

		//resgata todas as validações 
		let currentValidations = document.querySelectorAll('form .error-validation');

		if(currentValidations.length > 0) {
			this.cleanValidations(currentValidations);
		}

		//pegar os imputs
		let inputs = form.getElementsByTagName('input');

		//transformo umaHTMLCollection -> array
		let inputsArray = [...inputs];

		//lop nos inputs e validação mediante ao que for encontrado
		inputsArray.forEach(function(input) {
		
			//loop em todas as validações existentes
			for(let i = 0; this.validations.length > i; i++) {
				//verifica se a validãção existe no input
				if(input.getAttribute(this.validations[i]) != null) {

					//data-min-length -> minlength, limpando para virar um método
					let method = this.validations[i].replace('data-', '').replace('-', '');

					let value = input.getAttribute(this.validations[i]);

					//invocar o método
					this[method](input, value);

				}
			}	

		}, this);
	}
 //verifia se um input tem um número mínimo de caracteres
  minlength(input, minValue) {

  let inputlength = input.value.length;

  let erroMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  	if (inputlength < minValue) {
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

//verifica se input passa do limite de caracteres
  cpflength(input, cpfValue){

  	  let inputlength = input.value.length;

  let erroMessage = 'Digite o CPF corretamente';

  	if (inputlength != cpfValue) {
  		this.printMessage(input, erroMessage);
  	}
  }



  //método para imprimir mensagem de erro na tela
  printMessage(input, msg ) {

  // quantidade de erros
  	  let errorsQty = input.parentNode.querySelector('.error-validation'); 
  
  if (errorsQty === null) {
	  let template = document.querySelector('.error-validation').cloneNode(true);

	  template.textContent = msg;

	  let inputParent = input.parentNode;

	  template.classList.remove('template');

	  inputParent.appendChild(template);
  }

  }

  //verifica se o input é requirido
required(input) {

	let inputValue = input.value;

	if(inputValue === '') {
		let erroMessage = `Este campo é obrigatório`;

		this.printMessage(input, erroMessage);
	}

}

 
 // limpa as validações da tela 
  cleanValidations(validations) {
  	validations.forEach(el => el.remove());
  }

}

function mostrarOcultarSenha() {
	var senha = document.getElementById("password2");
	if (senha.type=="password") {
		senha.type="text";
	} else{
		senha.type="password";
	}
}


let form2 = document.getElementById("formcadastro2");
let submit2 = document.getElementById("btn-submit2");

let validador = new Validar();

// evento que dispara as validações
submit2.addEventListener('click', function(e) {

e.preventDefault();

validador.validate(form2);

});

