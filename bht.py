f = open('traces.txt', 'r')

enderecos = {}
predicoes = {}

for line in f:
    linha = line.strip('\n').split(' ')##linha completa
    if linha[0] in enderecos: #endereco
        if predicoes[linha[0]] != enderecos[linha[0]]:
            if predicoes[linha[0]] == 0:
                predicoes[linha[0]] = 1
            else:
                predicoes[linha[0]] = 0
    else:
        enderecos[linha[0]] = linha[1]





        


