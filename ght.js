var file = null;
var predictions = [];
const TOMADO = 1;
const NAO_TOMADO = 0;
var index = 0;
var TIPO_PREDITOR = 0; // 1 -> 1 BIT  e 2 => 2 BIT
var m = undefined; //tamanho da tabela

function setM() {
  var num = document.getElementById("m");
  var option = num.value;
  m = option;
  num.disabled = true;
  var fileSelector = document.getElementById("inputfile");
  fileSelector.disabled = false;
}

function disable_button() {
  var fileSelector = document.getElementById("inputfile");
  if (fileSelector != undefined) {
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    btn1.disabled = true;
    btn2.disabled = true;
  }
}

function hexToBinario(num) {
  //Função para converter hexadecimal em binario já descartando os dois ultimos bits
  let decimal = parseInt(num, 16);
  let binario = decimal.toString(2);
  return binario.slice(0, binario.length - 2);
}

function binToInteger(num) {
  var tamanhoTabela = Math.pow(2, m);
  // var numBits = Math.log2(m); //definindo o numero de bits que sera usado do endereço
  var inteiro = num.slice(num.length - m);
  return parseInt(inteiro, 2);
}

function drawTable() {
  var attr = document.getElementById("preditores");

  var data =
    "<table style=width:70% align=center> <caption><h1> Preditores </h1></caption> " +
    "<tr> <th><h2>Predito</h2></th> <th><h2>Realizado</h2></th> <th><h2>Acerto</h2></th> <th><h2>Erro</h2></th> <th><h2>Precisao</h2></th> </tr>";

  for (var j = 0; j < predictions.length; j++) {
    if (predictions[j] != undefined) {
      data += `<tr align=center> <td> ${
        predictions[j].counter >= 2 ? "TOMADO" : "NÃO TOMADO"
      } </td> <td> ${
        predictions[j].realizado == TOMADO ? "TOMADO" : "NÃO TOMADO"
      } </td> <td> ${predictions[j].acerto} </td> <td> ${
        predictions[j].erro
      } </td> <td> ${predictions[j].precisao.toFixed(2)}% </td> </tr>`;
    }
  }
  attr.innerHTML = data + "</table>";
}

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
      let index = binToInteger(hexToBinario(line[0]));
      if (predictions[index] == undefined) {
        predictions[index] = {
          predictions: [],
          counter: 2,
          acerto: 0,
          erro: 0,
          precisao: 0
        };
      }
    }
    drawTable();
  };
}

// const TOMADO = 3;
// const TOMADO_FRACAMENTE = 2;
// const NAO_TOMADO = 1;
// const NAO_TOMADO_FRACAMENTE = 0;

function getPrediction(indexPrediction) {
  var ini = 0;

  if (predictions[indexPrediction].predictions.length > m)
    ini = predictions[indexPrediction].predictions.length - m;

  console.log(predictions[indexPrediction].counter < 3);

  for (var i = ini; i < predictions[indexPrediction].predictions.length; i++) {
    console.log(predictions[indexPrediction].predictions[i].realizado);
    if (predictions[indexPrediction].predictions[i].predicao == TOMADO) {
      console.log("oi");
      if (predictions[indexPrediction].counter < 3) {
        predictions[indexPrediction].counter =
          predictions[indexPrediction].counter + 1;
      }
    } else {
      console.log("tchau");
      if (predictions[indexPrediction].counter > 0) {
        predictions[indexPrediction].counter =
          predictions[indexPrediction].counter - 1;
      }
    }
  }

  if (predictions[indexPrediction].counter >= 2) return TOMADO;

  if (index == 0) predictions[indexPrediction].counter -= 1;
  return NAO_TOMADO;
}

function ght_nextStep(draw = true) {
  if (file == null || index >= file.length || m == undefined)
    alert(
      "Arquivo não carregado, ou o fim já foi alcançado ou o parametro m não foi passado"
    );
  else {
    var line = file[index].split(" ");
    var indexPreditor = binToInteger(hexToBinario(line[0]));

    if (predictions[indexPreditor].counter >= 2) {
      //predição foi dada como tomada
      if (line[1] == TOMADO) {
        if (predictions[indexPreditor].counter < 3) {
          predictions[indexPreditor].counter += 1;
        }
        predictions[indexPreditor].acerto += 1;
      } else if (line[1] == NAO_TOMADO) {
        predictions[indexPreditor].counter -= 1;
        predictions[indexPreditor].erro += 1;
      }
    } else {
      if (line[1] == NAO_TOMADO) {
        predictions[indexPreditor].counter += 1;
        predictions[indexPreditor].acerto += 1;
      } else if (line[1] == TOMADO) {
        if (predictions[indexPreditor].counter > 0) {
          predictions[indexPreditor].counter -= 1;
        }
        predictions[indexPreditor].erro += 1;
      }
    }

    predictions[indexPreditor].predictions.push({
      predicao: predictions[indexPreditor].counter >= 2 ? TOMADO : NAO_TOMADO,
      realizado: parseInt(line[1])
    });

    predictions[indexPreditor].precisao =
      (predictions[indexPreditor].acerto /
        (predictions[indexPreditor].acerto + predictions[indexPreditor].erro)) *
      100;

    index++;
    if (draw) drawTable();
  }
}

function ght_summary() {
  if (file == null || index >= file.length || m == undefined)
    alert("Arquivo não carregado ou o fim já foi alcançado");
  else {
    for (var i = index; i < file.length; i++) {
      ght_nextStep(false);
    }
    drawTable();
    disable_button();
  }
}
