function sorteios() {
	
	var sort = Math.floor ((Math.random() * 56) + 5);

	document.getElementById("resultado").innerHTML =('Parabéns! você ganhou um desconto de: ') + sort + ("%");

   var generatePassword = (
  length = 9,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'
) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');

document.getElementById("numeracao").innerHTML = ('Este é o seu cupom: ') + '#' + generatePassword();

}








