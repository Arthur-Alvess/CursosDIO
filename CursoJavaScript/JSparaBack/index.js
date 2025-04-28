const precoEtanol = 5.49;
const precoGasolina = 6.12;
const gastoCombustivel = 12;
const distancia = 100;

let tipo = Number(prompt("Qual o tipo do Combustível:\n1. Etanol\n2. Gasolina"));

if (tipo === 1) {
    const valorgasto = (distancia / gastoCombustivel) * precoEtanol;
    console.log("Valor gasto: R$ " + valorgasto.toFixed(2));
} else if (tipo === 2) {
    const valorgasto = (distancia / gastoCombustivel) * precoGasolina;
    console.log("Valor gasto: R$ " + valorgasto.toFixed(2));
} else {
    console.log("Opção inválida.");
}
