
//----FORMULÁRIO ENDEREÇO
const FormEnd = () => {
    let nomeRua = document.getElementById('nomeRua').value;
    let numeroCasa = document.getElementById('numeroCasa').value;
    let cep = document.getElementById('cep').value;
    let cidade = document.getElementById('cidade').value;
    let bairro = document.getElementById('bairro').value;
    let referencia = document.getElementById('referencia').value;
  
    if (nomeRua && numeroCasa && cep && cidade && bairro && referencia) {
      let endereco = {
        nomeRua: nomeRua,
        numeroCasa: numeroCasa,
        cep: cep,
        cidade: cidade,
        bairro: bairro,
        referencia: referencia,
      };
      sessionStorage.setItem('endereco', JSON.stringify(endereco));
      window.location.href = '../pagamento/forma.html'
      } else {
      alert('Por favor, preencha todos os campos do Endereço para Entrega.');
      return false; // Impede o envio do formulário se a validação falhar
    }
  };
  
  let botaoEndereco = document.querySelector("#botaoEndereco");
  botaoEndereco.addEventListener("click", ()=>{
    FormEnd()
  })
  
  // ENTREGA SIM OU NÃO----------------------------------------------------------------------------
  
  
  let Retiradas = document.getElementsByName('entrega');
  for (var i = 0; i < Retiradas.length; i++) {
    Retiradas[i].addEventListener('click', Escolha);
  }
  
  function limparFormulario() {
    document.getElementById('nomeRua').value = '';
    document.getElementById('numeroCasa').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('referencia').value = '';
  }
  
  function Escolha() {
    let escolhaEntrega = document.querySelector('input[name="entrega"]:checked');
    if (escolhaEntrega) {
      let NaoEntregar = document.querySelector('#myForm');
      let botao = document.querySelector(".botano")
  
      if (escolhaEntrega.value === 'NÃO') {
        NaoEntregar.style.display = 'block';
        botao.style.display = 'none';
        sessionStorage.setItem('escolhaEntrega', escolhaEntrega.value);
      } else {
        NaoEntregar.style.display = 'none';
        botao.style.display = 'block';
        sessionStorage.setItem('escolhaEntrega', escolhaEntrega.value);
        limparFormulario();
      }
    }
  }
  
  let botaoRetirada = document.querySelector("#botaoRetirada")
  botaoRetirada.addEventListener("click", () => {
    Escolha();
    window.location.href = '../pagamento/forma.html'
  })
  w