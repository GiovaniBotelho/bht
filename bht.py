def read_file():
    f = open('traces.txt', 'r')
    predictions = {}
    for line in f:
        linha = line.strip('\n').split(' ')##linha completa
        predictions[linha[0]] = 1

    f.close()

    return predictions

def bht_1bit():
    predictions = read_file()

    nf = open('traces.txt', 'r')
    errors = 0
    for line in nf:
        linha = line.strip('\n').split(' ')##linha completa
        if predictions[linha[0]] != int(linha[1]):
            errors += 1
            predictions[linha[0]] = int(linha[1])
    
    nf.close()
    
    return [predictions, errors]
#fortemente tomado 1
#fracamente tomado 2
#fortemente no tomado 3
#fracamente no tomado 0

def bht_2bits():
    predictions = read_file()

    nf = open('traces.txt', 'r')
    errors = 0
    prediction_history = {}
    for line in nf:
        linha = line.strip('\n').split(' ')##linha completa7
        if int(linha[1]) == 1:
            if predictions[linha[0]] == 2:
                predictions[linha[0]] = 1
                # prediction_history[linha[0]].extend(1)
            elif predictions[linha[0]] == 3:
                predictions[linha[0]] = 0
                # prediction_history[linha[0]].push(0) 
            elif predictions[linha[0]] == 0:
                errors += 1
                predictions[linha[0]] = 1
                # prediction_history[linha[0]].push(1) 
        else:
            if predictions[linha[0]] == 1:
                predictions[linha[0]] = 2
                # prediction_history[linha[0]].push(2) 

            elif predictions[linha[0]] == 2:
                errors += 1
                predictions[linha[0]] = 3
                # prediction_history[linha[0]].push(3) 
            elif predictions[linha[0]] == 0:
                predictions[linha[0]] = 3
                # prediction_history[linha[0]].push(3) 
    nf.close()
    
    return [predictions, errors, prediction_history]
            


def main():
    predictions, errors, prediction_history = bht_2bits()
    print(prediction_history)

if __name__ == "__main__":
    main()


