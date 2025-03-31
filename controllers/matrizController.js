const express = require('express');
const router = express.Router();

// Variável para armazenar múltiplas matrizes geradas
let matrizesGeradas = [];

router.get('/exibir', (req, res) => {
    // Verifica se há matrizes geradas
    if (matrizesGeradas.length === 0) {
        return res.status(404).json({ error: 'Nenhuma matriz foi gerada ainda.' });
    }

    // Formata todas as matrizes para exibição
    const matrizesFormatadas = matrizesGeradas.map((matrizGerada, index) => {
        // Determina o número de linhas e colunas
        const numLinhas = Math.max(...matrizGerada.map(item => item.linha)) + 1;
        const numColunas = Math.max(...matrizGerada.map(item => item.coluna)) + 1;

        // Inicializa a matriz original com zeros
        const matrizOriginal = Array.from({ length: numLinhas }, () => Array(numColunas).fill(0));

        // Preenche a matriz com os valores de matrizGerada
        matrizGerada.forEach(({ linha, coluna, valor }) => {
            matrizOriginal[linha][coluna] = valor;
        });

        // Formata a matriz como uma string para exibição
        const matrizFormatada = matrizOriginal.map(linha => linha.join(' ')).join('\n');
        return `Matriz ${index + 1}:\n${matrizFormatada}`;
    });

    // Retorna todas as matrizes formatadas
    res.send(`<pre>${matrizesFormatadas.join('\n\n')}</pre>`);
});

router.post('/gerar', (req, res) => {
    const { matriz } = req.body;
    const resultado = [];

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] !== 0) { // Inclui qualquer valor diferente de 0
                resultado.push({ linha: i, coluna: j, valor: matriz[i][j] });
            }
        }
    }

    // Armazena a nova matriz gerada
    matrizesGeradas.push(resultado);

    res.json(resultado);
});

router.post('/limpar', (req, res) => {
    // Limpa a lista de matrizes geradas
    matrizesGeradas = [];

    res.json({ message: 'Todas as matrizes foram limpas.' });
});

router.post('/somar', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Verifica se as matrizes têm o mesmo tamanho
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        return res.status(400).json({ error: 'As matrizes devem ter o mesmo tamanho.' });
    }

    // Inicializa a matriz de resultado
    const resultado = Array.from({ length: matriz1.length }, () => []);

    // Realiza a soma das matrizes
    for (let i = 0; i < matriz1.length; i++) {
        for (let j = 0; j < matriz1[i].length; j++) {
            resultado[i][j] = matriz1[i][j] + matriz2[i][j];
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/subtrair', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Verifica se as matrizes têm o mesmo tamanho
    if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
        return res.status(400).json({ error: 'As matrizes devem ter o mesmo tamanho.' });
    }

    // Inicializa a matriz de resultado
    const resultado = Array.from({ length: matriz1.length }, () => []);

    // Realiza a subtração das matrizes
    for (let i = 0; i < matriz1.length; i++) {
        for (let j = 0; j < matriz1[i].length; j++) {
            resultado[i][j] = matriz1[i][j] - matriz2[i][j];
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/multiplicar', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    // Verifica se as matrizes podem ser multiplicadas
    if (matriz1[0].length !== matriz2.length) {
        return res.status(400).json({ error: 'Número de colunas da primeira matriz deve ser igual ao número de linhas da segunda matriz.' });
    }

    // Inicializa a matriz de resultado
    const resultado = Array.from({ length: matriz1.length }, () => Array(matriz2[0].length).fill(0));

    // Realiza a multiplicação das matrizes
    for (let i = 0; i < matriz1.length; i++) {
        for (let j = 0; j < matriz2[0].length; j++) {
            for (let k = 0; k < matriz1[0].length; k++) {
                resultado[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/transpor', (req, res) => {
    const { matriz } = req.body;

    // Inicializa a matriz transposta
    const resultado = Array.from({ length: matriz[0].length }, () => []);

    // Realiza a transposição
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            resultado[j][i] = matriz[i][j];
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/inverter', (req, res) => {
    const { matriz } = req.body;
    const resultado = [];

    // Verifica se a matriz é quadrada
    if (matriz.length !== matriz[0].length) {
        return res.status(400).json({ error: 'A matriz deve ser quadrada para ser invertida.' });
    }

    // Inverte a matriz (apenas um exemplo simples, não é uma inversão real)
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            resultado.push({ linha: i, coluna: j, valor: matriz[matriz.length - 1 - i][matriz[i].length - 1 - j] });
        }
    }

    res.json(resultado);
});

router.post('/multiplicarEscalar', (req, res) => {
    const { matriz, escalar } = req.body;

    // Inicializa a matriz de resultado
    const resultado = Array.from({ length: matriz.length }, () => []);

    // Multiplica cada elemento pelo escalar
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            resultado[i][j] = matriz[i][j] * escalar;
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/adicionar', (req, res) => {
    const { matriz, valor } = req.body;

    // Inicializa a matriz de resultado
    const resultado = Array.from({ length: matriz.length }, () => []);

    // Adiciona o valor escalar a cada elemento da matriz
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            resultado[i][j] = matriz[i][j] + valor;
        }
    }

    // Retorna o resultado como uma matriz bidimensional
    res.json(resultado);
});

router.post('/determinante', (req, res) => {
    const { matriz } = req.body;

    // Verifica se a matriz é quadrada
    if (matriz.length !== matriz[0].length) {
        return res.status(400).json({ error: 'A matriz deve ser quadrada para calcular o determinante.' });
    }

    // Função para calcular o determinante de forma recursiva
    const calcularDeterminante = (matriz) => {
        const n = matriz.length;

        // Caso base: determinante de uma matriz 1x1
        if (n === 1) {
            return matriz[0][0];
        }

        // Caso base: determinante de uma matriz 2x2
        if (n === 2) {
            return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
        }

        // Expansão de Laplace para matrizes maiores
        let determinante = 0;
        for (let j = 0; j < n; j++) {
            const submatriz = matriz.slice(1).map(linha => linha.filter((_, col) => col !== j));
            determinante += matriz[0][j] * calcularDeterminante(submatriz) * (j % 2 === 0 ? 1 : -1);
        }

        return determinante;
    };

    // Calcula o determinante da matriz
    const determinante = calcularDeterminante(matriz);

    res.json({ determinante });
});

module.exports = router;
