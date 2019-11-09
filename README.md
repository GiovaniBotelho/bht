# BHT - Preditor de 1 e 2 bits

Após decompactar o arquivo bht.zip, este diretório deve conter os seguintes arquivos:

-  bht.html

- bht.js

- README.md

- traces.txt

O código-fonte com a lógica dos simuladores encontra-se no bht.js.

## 1. Descrição dos preditores  

Na execução, há duas tabelas: de Preditores (tabela da esquerda) e a de Endereços no arquivo (tabela da direita). Na tabela de preditores, encontra-se todos os endereços do arquivo que o usuário seleciona e as predições adotadas, aparecendo apenas uma vez cada endereço. Na tabela da endereços no arquivo, encontra-se todas os endereços e as predições passadas do arquivo. A cada linha lida na tabela de endereços, é conferida na tabela de predições o endereço relativo e sua predição, alterando se a predição estiver errada, e mantendo caso esteja certa.

  ## 2. Etapas de execução:

Para executar os simuladores, basta abrir o arquivo bht.html, que irá iniciar uma página no browser contendo a interface de execução, para realizá-la bastar seguir os seguintes passos:

-  Utilize o botão "Escolher arquvivo" para realizar o upload do arquivo contendo os dados a serem analisados (O grupo disponibiliza o arquivo traces.txt para execução)

- Selecione no combobox o preditor que deseja simular, podendo ser o de 1 ou 2 bits. Após selecionado, o grupo optou por desativar o botão de selecionar novamente para evitar possíveis conflitos. Portanto, se deseja trocar de preditor recarregue(F5) a página e escolha novamente. A seguir a execução de cada um dos preditores:

	- No preditor de 1 bit, na tabela de Endereços no arquivo, é colorido de verde a linha que se encontra o iterador, e na tabela de Preditores, é colorido de verde a linha que contém o endereço relativo ao que está sendo lido na tabela de Endereços no arquivo.

	- No preditor de 2 bits, na tabela de Endereços é colorido a linha que se encontra o iterador, e na tabela de Preditores é colorido a linha que contém o endereço relativo ao que está sendo lido na tabela de Endereços com a cor relativa a qual estado se encontra o preditor no endereço, de acordo com a legenda acima.

- Há duas opção de execução, que são:

	- Selecionar o botão "Próximo passo", que executa o passo a passo do simulador, realizando a leitura de linha a linha do arquivo e exibindo o passo a passo das predições.

	- Selecionar o botão "Pular etapas", que realizará todas as predições e apenas apresenterá na tela o resultado final (a execução demora alguns segundos, não se preocupe).

- Após a execução, seja por "Próximo passo" ou "Pular etapas", será exibido ao lado dos dois botões a porcentagem de acertos e o número de erros.