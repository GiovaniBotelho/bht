# 1. Informações de  execução do sistema:
Para executar o sistema "BHT", basta selecionar o arquivo "bht.html" dentro do diretório /BHT.

# 2. Descrição detalhada:
 Nesta etapa do trabalho foram implementados, os preditores locais, de um e dois bits (BHT), a implementação foi feita na linguagem javascritp. A seguir teremos a descrição formal e detalhada do funcionamento de cada simulador:
 - **BHT de um bit**:
	 1. **Leitura do arquivo com as predições**
		 -	A princípio é realizada a leitura de um arquivo texto que contém as predições com seus devidos endereços e desvios. A leitura do arquivo é feita linha a linha, o que nos permite avaliar uma predição a cada leitura;
	 2. **O endereçamento**:
		 1. Cada linha do arquivo contém um endereço em hexadecimal. A princípio convertemos o número para binário e descartamos os dois bits menos significativos, após, é feita a conversão para inteiro que indicará em qual posição do vetor deverá ser feita a predição. 
	 3. **A predição**:
		 1. Para o preditor de um bit é utilizado o vetor  "predictions", e em cada posição contém o  desvio da predição;
		 2. Por default, o valor do desvio de todo o vetor  é  inicializado como `Tomado`;
		 3.  Para cada linha lida do arquivo, o valor do desvio da predição deverá ser comparado com o valor do desvio da tupla na última posição do vetor. Desta forma, podemos garantir que a predição será feita com o resultado da predição passada.
		 4.  As predições para arquivos de um bit devem ser realizadas de acordo com a seguinte máquina de estados:
		 ![1bit](https://github.com/GiovaniBotelho/bht/blob/master/1bit.PNG)
				
 - **BHT de dois bits**: 
	 1. **Leitura do arquivo com as predições**
		 -	A princípio é realizada a leitura de um arquivo texto que contém as predições com seus devidos endereços e desvios. A leitura do arquivo é feita linha a linha, o que nos permite avaliar uma predição a cada leitura;
	 2. **O endereçamento**:
		 1. Cada linha do arquivo contém um endereço em hexadecimal. A princípio convertemos o número para binário e descartamos os dois bits menos significativos, após, é feita a conversão para inteiro que indicará em qual posição do vetor deverá ser feita a predição. 
	 3. **A predição**:
		 1. Para o preditor de dois bits é utilizado o vetor  "predictions", e em cada posição contém o  desvio da predição;
		 2. Por default, o valor do desvio de todo o vetor  é  inicializado como `Tomado`;
		 3.  Para cada linha lida do arquivo, o valor do desvio da predição deverá ser comparado com o valor do desvio da tupla na última posição do vetor. Desta forma, podemos garantir que a predição será feita com o resultado da predição passada.
		 4.  As predições para arquivos de dois bits devem ser realizadas de acordo com a seguinte máquina de estados:
		 ![2bits](https://github.com/GiovaniBotelho/bht/blob/master/2bits.PNG)
				
# 3. Etapas de execução:
A tela do `Preditor BHT` deve conter:
- Campo `parâmetro m`;
- Botão `Escolher arquivo`;
- Combobox `Preditor`;
- Botão `Próximo passo`;
- Botão `Pular etapas`;
- Link `Descrição dos simuladores`;
- Quantidade de preditores que o arquivo possui;
- Tabela `Preditores` contendo as colunas:
	- Predito;
	- Realizado;
	- Acerto;
	- Erro;
	- Precisão.
	
Para executar os simuladores, basta abrir o arquivo bht.html, que irá iniciar uma página no browser contendo a interface de execução, para realizá-la bastar seguir os seguintes passos nas respectivas ordens:
- No campo "parâmetro 'm' ", insira o valor de m que será usado para definir o tamanho do vetor de predições;

-  Utilize o botão "Escolher arquvivo" para realizar o upload do arquivo contendo os dados a serem analisados (O grupo disponibiliza o arquivo traces.txt para execução)

- Selecione no combobox o preditor que deseja simular, podendo ser o de 1 ou 2 bits. Após selecionado, o grupo optou por desativar o botão de selecionar novamente para evitar possíveis conflitos. Portanto, se deseja trocar de preditor recarregue(F5) a página e escolha novamente. Para realizar a predição o usuário pode selecionar as seguintes opções :

	- Selecionar o botão "Próximo passo", que executa o passo a passo do simulador, realizando a leitura de linha a linha do arquivo e exibindo o passo a passo das predições.

	- Selecionar o botão "Pular etapas", que realizará todas as predições e apenas apresentará na tela o resultado final (a execução demora alguns segundos, não se preocupe).

- Após a execução, seja por "Próximo passo" ou "Pular etapas", será exibido na tabela as porcentagens de acertos, o número de acertos e erros.
###############################################

# 1. Informações de  execução do sistema:
Para executar o sistema "GHT", basta selecionar o arquivo "ght.html" dentro do diretório /BHT.

# 2. Descrição detalhada:
 Nesta etapa do trabalho foram implementados, o preditor global, a implementação foi feita na linguagem javascritp. A seguir teremos a descrição formal e detalhada do funcionamento de cada simulador:
 - **GHT**:
	 1. **Leitura do arquivo com as predições**
		 -	A princípio é realizada a leitura de um arquivo texto que contém as predições com seus devidos endereços e desvios. A leitura do arquivo é feita linha a linha, o que nos permite avaliar uma predição a cada leitura;
	 2. **O endereçamento**:
		 1. Cada linha do arquivo contém um endereço em hexadecimal. A princípio convertemos o número para binário e descartamos os dois bits menos significativos, após, é feita a conversão para inteiro que indicará em qual posição do vetor deverá ser feita a predição. 
	 3. **A predição**:
		 1. Para o preditor global é utilizado o vetor  "predictions", e em cada posição contém um número inteiro que pode variar de 0 a 3;
		 2. Por default, o valor de cada posição do vetor é inicializado em dois;
		 3.  Para cada linha lida do arquivo, o valor do desvio da predição deverá ser comparado com o valor do vetor. 
			 - Se o valor for maior ou igual a dois e a predição lida for `Tomado`,  é considerado acerto e o valor do vetor é incrementado em um. Caso o valor do vetor já esteja em três, nada é feito. Se o valor da predição for `Não tomado`, o vetor é decrementado em um e é considerado erro.
			 - Se o valor for menor que dois e a predição lida for `Tomado`, é considerado erro e o valor do vetor é decrementado em um. Caso o valor do vetor já esteja em zero, nada é feito. Se o valor da predição for `Não tomado` é considerado acerto é incrementado um no valor do vetor.
# 3. Etapas de execução:
A tela do `Preditor GHT` deve conter:
- Campo `parâmetro m`;
- Botão `Escolher arquivo`;
- Combobox `Preditor`;
- Botão `Próximo passo`;
- Botão `Pular etapas`;
- Link `Descrição dos simuladores`;
- Quantidade de preditores que o arquivo possui;
- Tabela `Preditores` contendo as colunas:
	- Predito;
	- Realizado;
	- Acerto;
	- Erro;
	- Precisão.
	
Para executar os simuladores, basta abrir o arquivo bht.html, que irá iniciar uma página no browser contendo a interface de execução, para realizá-la bastar seguir os seguintes passos nas respectivas ordens:
- No campo "parâmetro 'm' ", insira o valor de m que será usado para definir o tamanho do vetor de predições;

-  Utilize o botão "Escolher arquvivo" para realizar o upload do arquivo contendo os dados a serem analisados (O grupo disponibiliza o arquivo traces.txt para execução)

- Selecione no combobox o preditor que deseja simular, podendo ser o de 1 ou 2 bits. Após selecionado, o grupo optou por desativar o botão de selecionar novamente para evitar possíveis conflitos. Portanto, se deseja trocar de preditor recarregue(F5) a página e escolha novamente. Para realizar a predição o usuário pode selecionar as seguintes opções :

	- Selecionar o botão "Próximo passo", que executa o passo a passo do simulador, realizando a leitura de linha a linha do arquivo e exibindo o passo a passo das predições.

	- Selecionar o botão "Pular etapas", que realizará todas as predições e apenas apresentará na tela o resultado final (a execução demora alguns segundos, não se preocupe).

- Após a execução, seja por "Próximo passo" ou "Pular etapas", será exibido na tabela as porcentagens de acertos, o número de acertos e erros.
