const carrinhoCompras = () => {
  let somaGeral = 0;
  const container = document.querySelector('.conteudo');

  const Apagar = (div, chaveProduto, somaTotal) => {
    let excluir = document.createElement('button');
    excluir.setAttribute("class", "excluirItem");
    excluir.innerHTML = "REMOVER &#10060;";
    div.appendChild(excluir);

    excluir.addEventListener('click', () => {
      container.removeChild(div);
      removerSessionStorage(chaveProduto);

      // Atualiza a soma geral
      somaGeral -= somaTotal;
      document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)}`;
    });
  }

  const removerSessionStorage = (chaveProduto) => {
    sessionStorage.removeItem(chaveProduto);
    sessionStorage.removeItem(`quantidade_${chaveProduto}`);
    sessionStorage.removeItem(`escolhaValor_${chaveProduto}`);
  }

  const botaMaisMenos = (div, chaveProduto) => {
    let valorAtual = parseInt(sessionStorage.getItem(`quantidade_${chaveProduto}`)) || 1;

    // Cria o span para exibir o valor
    let span = document.createElement('span');
    span.setAttribute("class", "displayQuantidade");
    div.appendChild(span);
    span.innerHTML = valorAtual;

    // Cria os botões de mais e menos
    let botaoMais = document.createElement('button');
    let botaoMenos = document.createElement('button');
    botaoMais.setAttribute("class", "botaoMais");
    botaoMenos.setAttribute("class", "botaoMenos");

    botaoMais.innerHTML = "+";
    botaoMenos.innerHTML = "-";

    div.appendChild(botaoMenos);
    div.appendChild(botaoMais);

    // Função para atualizar o valor e recalcular
    const atualizarQuantidade = (novaQuantidade) => {
      valorAtual = novaQuantidade;
      sessionStorage.setItem(`quantidade_${chaveProduto}`, valorAtual); // Atualiza no sessionStorage
      span.innerHTML = `${valorAtual}`; // Atualiza a interface sem recarregar

      // Recalcula e atualiza a quantidade total
      CriarDiv();
    }

    // Função para incrementar o valor
    const botaoMaisS = () => {
      atualizarQuantidade(valorAtual + 1);
    }

    // Adiciona evento de clique para o botão de incrementar
    botaoMais.addEventListener('click', botaoMaisS);

    // Função para decrementar o valor
    const botaoMenosS = () => {
      if (valorAtual > 1) { // Evita valores menores que 1
        atualizarQuantidade(valorAtual - 1);
      }
    }

    // Adiciona evento de clique para o botão de decrementar
    botaoMenos.addEventListener('click', botaoMenosS);
  }

  const CriarDiv = () => {
    container.innerHTML = ''; // Limpa o container antes de recriar as divs

    somaGeral = 0; // Resetar a soma geral

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
        const somaTotal = parseFloat(valorProduto) * quantidade;
        somaGeral += somaTotal; // Atualiza somaGeral
        // Exiba os valores formatados no HTML
        div.innerHTML +=
          `
        <p>
        <br> <br><span style="font-weight: bold;">PRODUTO:</span><br><br>${escolhaProduto}
        <br>R$ ${valorProduto.toFixed(2)}
        <br><br><span style="font-weight: bold;">QUANTIDADE:</span>
  <br><br><br><br> <span style="display: block; text-align: center;">R$ ${somaTotal.toFixed(2)}</span>`;

        container.appendChild(div);
        Apagar(div, chaveProduto, somaTotal);
        botaMaisMenos(div, chaveProduto); // Passa a div e a chaveProduto para adicionar os botões
      }
    }

    document.querySelector(".valor").innerHTML = `<span style="font-weight: bold;">&#128181 VALOR GERAL:</span> R$ ${somaGeral.toFixed(2)} &#128181`;
  }

  CriarDiv(); // Cria as divs ao carregar a página
}

document.addEventListener('DOMContentLoaded', carrinhoCompras);
