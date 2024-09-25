
let indiceProduto = sessionStorage.length;
let indiceValor = sessionStorage.length;
const RealizarCompra = () => {

    const produtoSelecionado = document.querySelector('input[name="produto"]:checked');

    if (produtoSelecionado) {
        // Obtém o comprimento atual do sessionStorage

        let dataTexto = produtoSelecionado.getAttribute('data-text');
        let valorProduto = parseFloat(produtoSelecionado.value);

        const NomeProduto = `escolhaProduto_${indiceProduto}`;
        const ValordoProduto = `escolhaValor_${indiceValor}`;

        sessionStorage.setItem(NomeProduto, dataTexto);
        sessionStorage.setItem(ValordoProduto, valorProduto);

        // Recarrega a página após a compra
        //location.reload();
        window.location.href = '../carrinho/resumo.html';
    } else {
        alert("Por favor, marque/selecione um produto para prosseguir!");
    }
};

const botoesComprar = document.querySelectorAll(".Comprar");

botoesComprar.forEach((botao) => {
    botao.addEventListener("click", RealizarCompra);
});
