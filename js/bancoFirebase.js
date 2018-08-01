// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAiYlgWW5j03haswCQuW1qUiy7R5ytxl_w",
    authDomain: "brainee-9ee17.firebaseapp.com",
    databaseURL: "https://brainee-9ee17.firebaseio.com",
    projectId: "brainee-9ee17",
    storageBucket: "brainee-9ee17.appspot.com",
    messagingSenderId: "516855679444"
  };
  firebase.initializeApp(config);


//Referenciando usuarios collection
var usuariosRef = firebase.database().ref();

//Listen for form submit
document.getElementById('contactForm').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
  e.preventDefault();

  //Pega os valores
  if (!validarNome(txtNomeUsuario.value))
    alert('Favor informar seu nome completo e válido!');
  else{
    if(!validaEmail(txtEmailUsuario.value))
    {
      alert('Favor informar um email válido!');
    }
    else{
      if(!validarOcupacao(txtOcupacaoUsuario.value))
      {
        alert('Favor informar uma ocupação válida!');   
      }
      else{
        var nome = getInputVal('txtNomeUsuario');
        var email = getInputVal('txtEmailUsuario');
        var ocupacao = getInputVal('txtOcupacaoUsuario');
      }
    }
  }

  //save user
  saveUser(nome,email,ocupacao,validaEmailB2B(email),moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss"),getIp());

  //Reseta form
  var form = document.querySelector("#contactForm");
  form.reset();
  
  alert('Muito obrigado! Seus dados foram salvos.');
}

//Função para pegar valores do form
function getInputVal(id){
  return document.getElementById(id).value;
}

//Salva o form para o firebase
function saveUser(nome,email,ocupacao,tipo,datahora,ip){
  var novoUsuarioRef = usuariosRef.push();
  novoUsuarioRef.set({
    nome: nome,
    email: email,
    ocupacao: ocupacao,
    datahora: datahora,
    ip: ip,
    tipo: tipo
  });
}




//Função para conseguir o IP
function getIp() {
  //inicializo a classe de requisições
  const xhr = new XMLHttpRequest();
  //defino o metodo a ser utilizado (get/post/put/patch/delete)
  const method = 'GET';
  //defino a url que sera utilizada na minah requisição
  const url = 'https://ipapi.co/json/';
  //inicializo a requisição passando o metodo e a url e afirmo que minha requisição sera SINCRONA utilizando o false
  xhr.open(method, url, false)
  //executo a requisição configurada acima
  xhr.send();

  //verifico o estado da reposta dada pela api, o estado 200 caracteriza uma resposta correta
  //caso a resposta seja correta (200) então eu prossigo com meu codigo e retorno o ip
  if(xhr.status == 200) {
    //transformo a resposta que veio com o formato de texto
    const respostaJson = JSON.parse(xhr.response);
    //acesso a propriedade ip e adiciono ele na div
    return respostaJson.ip;
  }
  //caso tenha algum erro na api retorno a mensagem de erro
  return 'ERRO: Ocorreu algum problema com nossa api';
}

console.log(getIp());
console.log(moment().tz("America/Sao_Paulo").format());



//Função para validar email
function validaEmail(email){
    var str = email;
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(filtro.test(str)) {
        return true;
    } 
    else {
        return false;
    }
}

//Função Regex para o nome
function validarNome(nome) {
    let nomeValido = nome.trim().match(/^[a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+([ ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+)*([ ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+)+([ ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+)*$/);
    if (nomeValido) {
        return true;
    } else {
        return false;
    }
}

//Função para validar Ocupação
function validarOcupacao(ocupacao) {
    let nomeValido = ocupacao;
    if(nomeValido.trim().match(/^[a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]*$/) || nomeValido.trim().match(/^[a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+([ ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+)*([ ][a-zA-ZáÁãÃâÂäÄéÉêÊëËíÍîÎõÕôÔöÖúÚüÜçÇ]+)*$/))
    if (nomeValido) {
        return true;
    } else {
        return false;
    }
}


//Para validar email B2B
function validaEmailB2B(email){
  var emailCorp = ["gmail.com","hotmail.com","uol.com.br","terra.com.br","outlook.com.br","live.com"];

  var separador = '@';
  var emailB2B = email.split(separador);

  var splitEmail = emailB2B[1];

  var tipo = 'B2B';

  for(i = 0; i < emailCorp.length;i++){
    if(splitEmail === emailCorp[i])
      tipo = 'B2C';
  }
  return tipo;   
}