# Matriz API

API REST em Node.js e Express para executar operações com matrizes. Além dos cálculos, a aplicação pode converter matrizes para uma representação esparsa, manter matrizes geradas temporariamente em memória e exibi-las em HTML.

## Tecnologias

- Node.js;
- Express 4;
- Body Parser;
- CORS;
- JavaScript.

## Pré-requisitos

- Node.js 18 ou superior;
- npm.

## Instalação e execução

Na raiz do projeto, execute:

```powershell
npm install
node index.js
```

O servidor será iniciado em `http://localhost:8081`.

Teste rápido:

```powershell
curl.exe http://localhost:8081/
```

Resposta esperada:

```text
Estou aqui
```

## Formato das matrizes

As matrizes são enviadas como arrays bidimensionais JSON:

```json
[[1, 2], [3, 4]]
```

## Endpoints

A rota base das operações é `/matriz`.

| Método | Endpoint | Corpo esperado | Descrição |
| --- | --- | --- | --- |
| `POST` | `/matriz/gerar` | `{ "matriz": [[...]] }` | Gera uma representação esparsa, guardada em memória. |
| `GET` | `/matriz/exibir` | — | Exibe em HTML todas as matrizes geradas. |
| `POST` | `/matriz/limpar` | — | Limpa as matrizes armazenadas em memória. |
| `POST` | `/matriz/somar` | `{ "matriz1": [[...]], "matriz2": [[...]] }` | Soma duas matrizes de mesmo tamanho. |
| `POST` | `/matriz/subtrair` | `{ "matriz1": [[...]], "matriz2": [[...]] }` | Subtrai duas matrizes de mesmo tamanho. |
| `POST` | `/matriz/multiplicar` | `{ "matriz1": [[...]], "matriz2": [[...]] }` | Multiplica duas matrizes compatíveis. |
| `POST` | `/matriz/transpor` | `{ "matriz": [[...]] }` | Transpõe uma matriz. |
| `POST` | `/matriz/inverter` | `{ "matriz": [[...]] }` | Inverte visualmente linhas e colunas de uma matriz quadrada. |
| `POST` | `/matriz/multiplicarEscalar` | `{ "matriz": [[...]], "escalar": 2 }` | Multiplica cada elemento por um escalar. |
| `POST` | `/matriz/adicionar` | `{ "matriz": [[...]], "valor": 2 }` | Soma um valor escalar a cada elemento. |
| `POST` | `/matriz/determinante` | `{ "matriz": [[...]] }` | Calcula o determinante de uma matriz quadrada. |

## Exemplos

### Somar matrizes

```http
POST /matriz/somar
Content-Type: application/json
```

```json
{
  "matriz1": [[1, 2], [3, 4]],
  "matriz2": [[5, 6], [7, 8]]
}
```

Resposta:

```json
[[6, 8], [10, 12]]
```

### Calcular determinante

```http
POST /matriz/determinante
Content-Type: application/json
```

```json
{
  "matriz": [[1, 2], [3, 4]]
}
```

Resposta:

```json
{
  "determinante": -2
}
```

### Gerar representação esparsa

```json
{
  "matriz": [[1, 0], [0, 4]]
}
```

Resposta:

```json
[
  { "linha": 0, "coluna": 0, "valor": 1 },
  { "linha": 1, "coluna": 1, "valor": 4 }
]
```

## Observações

- As matrizes geradas por `/matriz/gerar` ficam somente em memória e são perdidas ao reiniciar o servidor.
- O endpoint `/matriz/inverter` não calcula a matriz inversa da álgebra linear; ele apenas reorganiza os valores invertendo linhas e colunas e retorna posições no formato esparso.
- As operações de soma e subtração exigem matrizes com as mesmas dimensões; a multiplicação exige que o número de colunas da primeira seja igual ao número de linhas da segunda.

## Estrutura

```text
.
├── index.js                         # Servidor Express e configuração das rotas
├── controllers/
│   └── matrizController.js           # Operações e armazenamento em memória
├── package.json                      # Dependências do projeto
└── README.md
```
