//FORMA DE PAGAMENTO


const FormaPagamento = () => {
    let formasPagamento = document.getElementsByName('pagamento');
    for (let i = 0; i < formasPagamento.length; i++) {
        formasPagamento[i].addEventListener('change', mostrarTroco);
    }

    function mostrarTroco() {
        let escolhaPagamento = document.querySelector('input[name="pagamento"]:checked').value;


        let trocoSection = document.getElementById('trocoSection');

        if (escolhaPagamento) {
            if (escolhaPagamento === 'DINHEIRO') {
                trocoSection.style.display = 'block';
                sessionStorage.setItem('formaPagamento', 'DINHEIRO');
            }
            else if (escolhaPagamento === 'CARTÃO' || escolhaPagamento === 'PIX') {
                trocoSection.style.display = 'none';
                sessionStorage.setItem('formaPagamento', escolhaPagamento);
            }
        }
    }


    const Troco = () => {
        let valorTroco = document.getElementById('valorTroco').value.trim();
        if (valorTroco) {
            sessionStorage.setItem('Vtroco', valorTroco);
        }

    }

    const VerificarDados = () => {
        // Verifica se pelo menos uma forma de pagamento foi escolhida antes de prosseguir
        
        if(sessionStorage.getItem('formaPagamento')) {
            enviarMensagemWhatsApp();
        }
       else if (!sessionStorage.getItem('formaPagamento')) {
            alert("Escolha uma forma de pagamento!");
            return true; // Impede a continuação se nenhuma forma de pagamento foi escolhida
        } 
    }

    document.querySelector("#Fpagamento").addEventListener("click", () => {
        Troco()
        VerificarDados()
        FormaPagamento()
    });
};

document.addEventListener('DOMContentLoaded', FormaPagamento);


const enviarMensagemWhatsApp=()=> {
    let somaGeral = 0
    let textoParaEnviar = '';
  
    const calcular = (somaTotal)=> {
      somaGeral += somaTotal;
    };
//contador de pedidos
    let numeroPedido = 1;

    for (let i = 0; i < sessionStorage.length; i++) {
      const chaveProduto = `escolhaProduto_${i}`;
      const chaveValor = `escolhaValor_${i}`;
      const chaveQuantidade = `quantidade_${chaveProduto}`; // Corrigido aqui

      const escolhaProduto = sessionStorage.getItem(chaveProduto);
      const valorProduto = parseFloat(sessionStorage.getItem(chaveValor));
      const quantidade = parseInt(sessionStorage.getItem(chaveQuantidade)) || 1;

  
      if (escolhaProduto) {
        let div = document.createElement('div');
        div.setAttribute("class", "mercadoria");
  
        

      // Calcular a soma total
      const somaTotal = parseFloat(valorProduto) * quantidade;


        textoParaEnviar += `
        \n*PEDIDO Nº:* ${numeroPedido}
        *PRODUTO:* ${escolhaProduto}
        *VALOR: R$* ${valorProduto.toFixed(2)}
        *QUANTIDADE:* ${quantidade}  
        *TOTAL PEDIDO R$:* ${somaTotal.toFixed(2)}  
        ____________________________________
   `;

   numeroPedido++;
   
        calcular(somaTotal)
      }
    }

     //TRECHO PARA GERAR ENDEREÇO 
     const endereco = JSON.parse(sessionStorage.getItem('endereco')) || {};
     const retiradaProduto = sessionStorage.getItem('escolhaEntrega')
   
         //TRECHO PARA GERAR FORMA DE PAGAMENTO
     const formaPagamento = sessionStorage.getItem('formaPagamento');
     const valorTroco = sessionStorage.getItem('Vtroco');
 
    // Verifica se o endereço foi preenchido
    const enderecoPreenchido = (endereco.nomeRua || endereco.numeroCasa || endereco.cep || endereco.cidade || endereco.bairro || endereco.referencia);
  
    let enderecoTexto = '';
    if (enderecoPreenchido) {
      enderecoTexto = `
                 *ENDEREÇO PARA ENTREGA*
                 *Nome da Rua:* ${endereco.nomeRua || 'Não fornecido'}
                 *Número da Casa/AP:* ${endereco.numeroCasa || 'Não fornecido'}
                 *CEP:* ${endereco.cep || 'Não fornecido'}
                 *Cidade:* ${endereco.cidade || 'Não fornecido'}
                 *Bairro:* ${endereco.bairro || 'Não fornecido'}
                 *Ponto de Referência:* ${endereco.referencia || 'Não fornecido'}
             `;
    }
  
    textoParaEnviar += ` 
    \n*TOTAL TODOS OS PEDIDOS:* R$ ${somaGeral.toFixed(2)}
    \n*FORMA DE PAGAMENTO:* ${formaPagamento}
    ${valorTroco ? `*TROCO:* R$ ${valorTroco}` : ''}
    \n*RETIRADA NO LOCAL:* ${retiradaProduto}
    ${enderecoTexto}
`;
  
    const codigoPais = '55';
    const numeroTelefone = '74999508103';
  
    const linkWhatsApp = `https://wa.me/${codigoPais}${numeroTelefone}?text=${encodeURIComponent(textoParaEnviar)}`;
    window.open(linkWhatsApp, '_blank');
  }

