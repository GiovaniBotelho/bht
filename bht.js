var file = null;
var address = [];
var predictions = new Map();
var initial_prediction = 1;
var index = 0;
var erros = 0;

function lerArquivo(files) {
  var atributos = document.getElementById("registros");
  var fileIn = files[0];
  var reader = new FileReader();
  reader.readAsText(fileIn);
  reader.onload = function(event) {
    // console.log(event.target.result);
    file = event.target.result;
    file = file.split("\n");
    atributos.innerText = file.length + ' endereços';
    for (var i = 0; i < file.length; i++) {
      line = file[i].split(" "); //linha completa
      if (!predictions.has(line[0])) {
        predictions.set(line[0], initial_prediction);
        address.push(line[0]);
      }
    }
  };
}

function bht_1bit_nextStep() {
  if (file == null || index >= file.length)
    alert("Arquivo não carregado ou o fim já foi alcançado");
  else {
      console.log(index);
      var line = file[index].split(" ");
      console.log(file[index].split(" "));
    
    var attr = document.getElementById("predicoes");
    var incherto = "";
    incherto =
      '<table style="width:50%"> ' +
      "<tr> <th>Index</th> <th>Address</th> <th>Prediction</th> </tr>";
    
    for (var j = 0; j <= address.length; j++) {
        if(line[0] == address[j]) incherto += '<tr style="background-color: #00ff00"> <td>' + j + "</td> <td>" + address[j] + "</td> <td>" + `${predictions.get(address[j])}` + "</td> </tr>";
        else incherto += "<tr> <td>" + j + "</td> <td>" + address[j] + "</td> <td>" + predictions.get(address[j]) + "</td> </tr>";
    }
    attr.innerHTML = incherto + "</table>";

    var endereco = document.getElementById("enderecos");
    var incherto2 = '<table style="width:50%"> ' +  "<tr> <th>Index</th> <th>Address</th> <th>Prediction</th> <th> </th> </tr>";
    for (var k = 0; k < file.length; k++) {
        let line = file[k].split(" ");
        if (index == k) {
            incherto2 += '<tr style="background-color: #00ff00"> <td>' + k + "</td> <td>" + line[0] + "</td> <td>" + line[1] + "</td> <td> <button onClick='bht_1bit_nextStep()'>Próximo passo</button> </td> </tr>";
            jaPassou = true;
        }
        else incherto2 += '<tr> <td>' + k + "</td> <td>" + line[0] + "</td> <td>" + line[1] + "</td> </tr>";
    }
    endereco.innerHTML = incherto2 + "</table>";

    if (!(line[1] == predictions.get(line[0]))) {
      console.log("errei");
      erros++;
      predictions.set(line[0], line[1]);
    }
    index++;
  }
}

function bht_1bit_summary() {
    if (file == null || index >= file.length)
        alert("Arquivo não carregado ou o fim já foi alcançado");
    else {
        console.log(file)
        for(var i = index; i < file.length; i++) {
            var line = file[i].split(" ");
            if (!(line[1] == predictions.get(line[0]))) {
                console.log("errei");
                erros++;
                predictions.set(line[0], line[1]);
              }
            index++;
        }

        var attr = document.getElementById("predicoes");
        var incherto = "";
        incherto = '<table> ' + '<tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th> </tr>';
        console.log(address)
        for (var j = 0; j < address.length; j++) {
            incherto += '<tr> <td style="text-align: center;">' + j + '</td> <td style="text-align: center;">' + address[j] + '</td> <td style="text-align: center;">' + predictions.get(address[j]) + '</td> </tr>';
        }
        attr.innerHTML = incherto + "</table>";

        var endereco = document.getElementById("enderecos");
        var incherto2 = '<table> ' +  '<tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th </tr>';
        for (var k = 0; k < file.length; k++) {
            let line = file[k].split(" ");
            incherto2 += '<tr> <td style="text-align: center;">' + k + '</td> <td style="text-align: center;">' + line[0] + '</td> <td style="text-align: center;">' + line[1] + "</td> </tr>";
        }
        endereco.innerHTML = incherto2 + "</table>";

        var atributos = document.getElementById("registros");
        atributos.innerText = file.length + ' endereços - ' + ((file.length-erros)/file.length)*100 + '% de acertos e ' + erros + ' prediçoes incorretas'; 
    }
    
}
