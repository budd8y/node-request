# node-request
Requisições simultâneas http com node:

Para utilizar basta fazer o clone do repositório, entrar na pasta, baixar as dependências do node (npm i) e, ainda na pasta executar:

node app.js url_de_requisicao quantidade_de_requisicoes

Exemplo:
node app.js https://facebook.com 1000

Caso não sejam informados os parms, serão adotados os seguintes valores:
URL = https://www.google.com.br
QTDE DE REQUISIÇÕES: 100
