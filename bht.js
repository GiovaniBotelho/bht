var file = null;
var address = [];
var predictions = new Map();
var initial_prediction = 1;
var index = 0;
var erros = 0;
var TIPO_PREDITOR = 0; // 1 -> 1 BIT  e 2 => 2 BIT

function lerArquivo(files) {
  var atributos = document.getElementById("registros");
  var fileIn = files[0];
  var reader = new FileReader();
  reader.readAsText(fileIn);
  reader.onload = function(event) {
    // console.log(event.target.result);
    file = event.target.result;
    file = file.split("\n");
    atributos.innerText = "O arquivo possui " + file.length + " endereços";
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
      '<table style="width:50%"> <caption> Preditores </caption> ' +
      "<tr> <th>Index</th> <th>Address</th> <th>Prediction</th> </tr>";

    for (var j = 0; j <= address.length; j++) {
      if (line[0] == address[j])
        incherto +=
          '<tr style="background-color: #00ff00"> <td>' +
          j +
          "</td> <td>" +
          address[j] +
          "</td> <td>" +
          `${predictions.get(address[j])}` +
          "</td> </tr>";
      else
        incherto +=
          "<tr> <td>" +
          j +
          "</td> <td>" +
          address[j] +
          "</td> <td>" +
          predictions.get(address[j]) +
          "</td> </tr>";
    }
    attr.innerHTML = incherto + "</table>";

    var endereco = document.getElementById("enderecos");
    var incherto2 =
      '<table style="width:50%"> <caption> Endereços no arquivo </caption> ' +
      "<tr> <th>Index</th> <th>Address</th> <th>Prediction</th> <th> </th> </tr>";
    for (var k = 0; k < file.length; k++) {
      let line = file[k].split(" ");
      if (index == k) {
        incherto2 +=
          '<tr style="background-color: #00ff00"> <td>' +
          k +
          "</td> <td>" +
          line[0] +
          "</td> <td>" +
          line[1] +
          "</td> <td> <button onClick='bht_1bit_nextStep()'>Próximo passo</button> </td> </tr>";
        jaPassou = true;
      } else
        incherto2 +=
          "<tr> <td>" +
          k +
          "</td> <td>" +
          line[0] +
          "</td> <td>" +
          line[1] +
          "</td> </tr>";
    }
    endereco.innerHTML = incherto2 + "</table>";

    if (!(line[1] == predictions.get(line[0]))) {
      console.log("errei");
      erros++;
      predictions.set(line[0], line[1]);
    }
    index++;
    if (index >= file.length) {
      var atributos = document.getElementById("registros");
      atributos.innerText =
        "O arquivo possui " +
        file.length +
        " endereços => " +
        Math.trunc(((file.length - erros) / file.length) * 100) +
        "% de acertos e " +
        erros +
        " prediçoes incorretas";
    }
  }
}

function bht_1bit_summary() {
  if (file == null || index >= file.length)
    alert("Arquivo não carregado ou o fim já foi alcançado");
  else {
    console.log(file);
    for (var i = index; i < file.length; i++) {
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
    incherto =
      "<table> <caption> Preditores </caption>" +
      '<tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th> </tr>';
    console.log(address);
    for (var j = 0; j < address.length; j++) {
      incherto +=
        '<tr> <td style="text-align: center;">' +
        j +
        '</td> <td style="text-align: center;">' +
        address[j] +
        '</td> <td style="text-align: center;">' +
        predictions.get(address[j]) +
        "</td> </tr>";
    }
    attr.innerHTML = incherto + "</table>";

    var endereco = document.getElementById("enderecos");
    var incherto2 =
      "<table> <caption> Endereços no arquivo </caption> " +
      '<tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th </tr>';
    for (var k = 0; k < file.length; k++) {
      let line = file[k].split(" ");
      incherto2 +=
        '<tr> <td style="text-align: center;">' +
        k +
        '</td> <td style="text-align: center;">' +
        line[0] +
        '</td> <td style="text-align: center;">' +
        line[1] +
        "</td> </tr>";
    }
    endereco.innerHTML = incherto2 + "</table>";

    if (index >= file.length) {
      var atributos = document.getElementById("registros");
      atributos.innerText =
        "O arquivo possui " +
        file.length +
        " endereços => " +
        Math.trunc(((file.length - erros) / file.length) * 100) +
        "% de acertos e " +
        erros +
        " prediçoes incorretas";
    }
  }
}

function bht_2bits_nextStep() {
  // fortemente tomado 1
  // fracamente tomado 2
  // fortemente no tomado 3
  // fracamente no tomado 0

  if (file == null || index >= file.length) {
    alert("Arquivo não carregado ou o fim já foi alcançado");
  } else {
    var line = file[index].split(" ");

    var attr = document.getElementById("predicoes");
    var incherto =
      '<table> <caption> Preditores </caption> <tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th> </tr>';
    for (var j = 0; j < address.length; j++) {
      console.log(line[0]);
      console.log(address[j]);
      if (line[0] == address[j]) {
        if (predictions.get(line[0]) == 0)
          incherto +=
            '<tr> <td style="text-align:center;background-color: #FFDEAD">' +
            j +
            '</td> <td style="text-align: center;background-color: #FFDEAD">' +
            address[j] +
            '</td> <td style="text-align: center;background-color: #FFDEAD">' +
            predictions.get(address[j]) +
            "</td> </tr>";
        else if (predictions.get(line[0]) == 1)
          incherto +=
            '<tr> <td style="text-align:center;background-color: #1E90FF">' +
            j +
            '</td> <td style="text-align: center;background-color: #1E90FF">' +
            address[j] +
            '</td> <td style="text-align: center;background-color: #1E90FF">' +
            predictions.get(address[j]) +
            "</td> </tr>";
        else if (predictions.get(line[0]) == 2)
          incherto +=
            '<tr> <td style="text-align:center;background-color: #B0C4DE">' +
            j +
            '</td> <td style="text-align: center;background-color: #B0C4DE">' +
            address[j] +
            '</td> <td style="text-align: center;background-color: #B0C4DE">' +
            predictions.get(address[j]) +
            "</td> </tr>";
        else
          incherto +=
            '<tr> <td style="text-align: center;background-color: #D2691E">' +
            j +
            '</td> <td style="text-align: center;background-color: #D2691E"">' +
            address[j] +
            '</td> <td style="text-align: center;background-color: #D2691E"">' +
            predictions.get(address[j]) +
            "</td> </tr>";
      } else {
        incherto +=
          '<tr> <td style="text-align: center;">' +
          j +
          '</td> <td style="text-align: center;">' +
          address[j] +
          '</td> <td style="text-align: center;">' +
          predictions.get(address[j]) +
          "</td> </tr>";
      }
    }
    attr.innerHTML = incherto + "</table>";

    var endereco = document.getElementById("enderecos");
    var incherto2 =
      '<table> <caption> Endereços no arquivo </caption> <tr> <th style="width:13%">Index</th> <th style="width:44%">Address</th> <th style="width:43%">Prediction</th </tr>';
    for (var k = 0; k < file.length; k++) {
      let line = file[k].split(" ");
      if (index == k) {
        incherto2 +=
          '<tr style="background-color: #00ff00"> <td style="text-align: center;">' +
          k +
          '</td> <td style="text-align: center;">' +
          line[0] +
          '</td> <td style="text-align: center;">' +
          line[1] +
          "</td> </tr>";
      } else {
        incherto2 +=
          '<tr> <td style="text-align: center;">' +
          k +
          '</td> <td style="text-align: center;">' +
          line[0] +
          '</td> <td style="text-align: center;">' +
          line[1] +
          "</td> </tr>";
      }
    }
    endereco.innerHTML = incherto2 + "</table>";

    if (line[1] == 1) {
      switch (predictions.get(line[0])) {
        case 2:
          predictions.set(line[0], 1);
          break;
        case 3:
          predictions.set(line[0], 0);
          break;
        case 0:
          predictions.set(line[0], 1);
          erros++; // Estava no fracamente não tomado e fui para tomado
          break;
      }
    } else if (line[1] == 0) {
      switch (predictions.get(line[0])) {
        case 0:
          predictions.set(line[0], 3);
          break;
        case 1:
          predictions.set(line[0], 2);
          break;
        case 2:
          predictions.set(line[0], 3);
          console.log("errei");
          erros++; // estava no framente tomado e fui para não tomado
          break;
      }
    }
    index++;
    if (index >= file.length) {
      var atributos = document.getElementById("registros");
      atributos.innerText =
        "O arquivo possui " +
        file.length +
        " endereços => " +
        Math.trunc(((file.length - erros) / file.length) * 100) +
        "% de acertos e " +
        erros +
        " prediçoes incorretas";
    }
  }
}

function bht_2bits_summary() {
  for (var i = index; i < file.length; i++) {
    bht_2bits_nextStep();
  }

  var atributos = document.getElementById("registros");
  atributos.innerText =
    "O arquivo possui " +
    file.length +
    " endereços => " +
    Math.trunc(((file.length - erros) / file.length) * 100) +
    "% de acertos e " +
    erros +
    " prediçoes incorretas";
}

function bht_nextStep() {
  if (TIPO_PREDITOR == 0) alert("Nenhum preditor selecionado!");
  else if (TIPO_PREDITOR == 1) bht_1bit_nextStep();
  else bht_2bits_nextStep();
}

function bht_summary() {
  if (TIPO_PREDITOR == 0) alert("Nenhum preditor selecionado!");
  else if (TIPO_PREDITOR == 1) bht_1bit_summary();
  else bht_2bits_summary();
}

function selecionaPreditor() {
  var select = document.getElementById("preditor");
  var option = select.options[select.selectedIndex].value;
  TIPO_PREDITOR = option;
  select.disabled = true;
  if (TIPO_PREDITOR == 1) {
    var legenda = document.getElementById("legenda");
    legenda.innerHTML = "1 - Tomado |  0 - Não Tomado";
  } else if (TIPO_PREDITOR == 2) {
    var legenda = document.getElementById("legenda");
    legenda.innerHTML =
      '<div style="width: 100%;">' +
      '<p style="background-color: #FFDEAD; width: auto; color: #000000;float: left;margin-right: 10px;padding: 5px"> 0 - Fracamento não tomado </p>' +
      '<p style="background-color: #1E90FF; width: auto; color: #ffffff;float: left;margin-right: 10px;padding: 5px"> 1 - Fortemente tomado </p>' +
      '<p style="background-color: #B0C4DE; width: auto; color: #ffffff;float: left;margin-right: 10px;padding: 5px"> 2 - Fracamente tomado </p>' +
      '<p style="background-color: #D2691E; width: auto; color: #ffffff;float: left;margin-right: 10px;padding: 5px"> 3 - Fortemente não tomado </p>' +
      "</div>";
  }
}
