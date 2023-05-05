$('#validade').mask('00/0000');
$('#phone').mask('(00) 00000-0000');
$('#CPF').mask('000.000.000-00');

function mostraDialogo(mensagem, tipo, tempo){
    
    // se houver outro alert desse sendo exibido, cancela essa requisição
    if($("#message").is(":visible")){
        return false;
    }

    // se não setar o tempo, o padrão é 3 segundos
    if(!tempo){
        var tempo = 3000;
    }

    // se não setar o tipo, o padrão é alert-info
    if(!tipo){
        var tipo = "info";
    }

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: fixed; bottom: 5%; width: 100%; padding-top: 10px; z-index: 9999; text-align:center; color: #fff; left: 0;";
    var cssInner = "margin: 0 auto;  background: linear-gradient(to bottom , #000 90% , #fff 10%); height: 50px ; left; 0 ;";

    // monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="'+cssMessage+'">';
    dialogo += '    <div class="alert alert-'+tipo+' alert-dismissable" style="'+cssInner+'">';    
    dialogo +=          '<span style="color: #fff; font-family: \'Open Sans\', sans-serif;">'+mensagem+'</span><br><span style="font-size: 15px; color: #fff;">Por favor, digite novamente.</span>';
    dialogo += '    </div>';
    dialogo += '</div>';

    // adiciona ao body a mensagem com o efeito de fade
    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

    // contador de tempo para a mensagem sumir
    setTimeout(function() {
        $('#message').fadeOut(2000, function(){
            $(this).remove();
        });
    }, tempo); // milliseconds

}


function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') {
    mostraDialogo("Por favor, informe o CPF.", "warning", 1000);
    return false;
  }
  // Elimina CPFs invalidos conhecidos
  if (cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999") {
    mostraDialogo("CPF inválido!", "warning", 1000);
    return false;
  }
  // Valida primeiro digito
  add = 0;
  for (i = 0; i < 9; i++)
    add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(9))) {
    mostraDialogo("CPF inválido!", "warning", 1000);
    return false;
  }
  // Valida segundo digito
  add = 0;
  for (i = 0; i < 10; i++)
    add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
    rev = 0;
  if (rev != parseInt(cpf.charAt(10))) {
    mostraDialogo("CPF inválido!", "warning", 1000);
    return false;
  }
  return true;
}

document.getElementById("btncad").addEventListener("click", function() {
  var cvv = document.getElementById("cvv").value.trim();
  var validade = document.getElementById("validade").value.trim();
  var numcpf = document.getElementById("CPF").value.trim();
  var soma = 0;
  for (i = 0; i < numcpf.length; i++) {
    if (!isNaN(parseInt(numcpf.charAt(i)))) {
      soma += parseInt(numcpf.charAt(i));
    }
  }
  if (cvv.length < 3 || validade.length < 5 || numcpf.length < 14) {
    document.getElementById("btncad").disabled = true;
  } else if (cvv == "" || validade == "" || numcpf == "" || numcpf.length != 14 || !validaCPF(numcpf)) {
    document.getElementById("btncad").disabled = true;
  } else if (soma == 11111111111 || soma == 22222222222 || soma == 33333333333 || soma == 44444444444 || soma == 55555555555 || soma == 66666666666 || soma == 77777777777 || soma == 88888888888 || soma == 99999999999) {
    mostraDialogo("CPF inválido!", "warning", 1000);
    document.getElementById("btncad").disabled = true;
  } else {
    document.getElementById("btncad").disabled = false;
    mostraDialogo("Dados enviados com sucesso!", "success", 3000);
  }
});

            
            




const helpcvv = document.getElementById("mod-help-cvv");
const closecvv = document.getElementById("mod-help-close");

// Função para mostrar o modal de ajuda do CVV
function showHelpCvv() {
  helpcvv.style.display = "flex";
}

// Função para fechar o modal de ajuda do CVV
function closeHelpCvv() {
  helpcvv.style.display = "none";
}

// Adicionando evento de clique no ícone de ajuda do CVV
document.getElementById("helpcvv").addEventListener("click", showHelpCvv);

// Adicionando evento de clique no botão de fechar do modal de ajuda do CVV
closecvv.addEventListener("click", closeHelpCvv); 

// Fechando o modal de ajuda do CVV quando o usuário clicar fora da janela
window.onclick = function(event) {
  if (event.target == helpcvv) {
    helpcvv.style.display = "none";
  }
}
