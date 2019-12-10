var file = null;
const TOMADO = 1;
const TOMADO_FRACAMENTE = 2;
const NAO_TOMADO = 0;
const NAO_TOMADO_FRACAMENTE = 3;
var predictions = [];
var initial_prediction = TOMADO;
var index = 0;
var TIPO_PREDITOR = 0; // 1 -> 1 BIT  e 2 => 2 BIT
var m = undefined; //tamanho da tabela

function exibirPorcentagem() {
  var acertos = 0;
  predictions.forEach(prediction => {
    acertos += prediction.acerto;
  });

  var attr = document.getElementById("resultado");
  let res = (acertos / file.length)*100

  attr.innerHTML =
    "Total de <b>" + acertos + "</b> acertos, logo <b>" + res.toFixed(2) + "%</b> de predições corretas.";
}

function setM() {
  var num = document.getElementById("m");
  var option = num.value;
  m = option;
  num.disabled = true;
  var fileSelector = document.getElementById("inputfile");
  fileSelector.disabled = false;
}

function disable_button() {
  var select = document.getElementById('preditor')
  var btn1 = document.getElementById("btn1")
  var btn2 = document.getElementById("btn2")
  if (select != 0){
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
        predictions[j].predicao == TOMADO
          ? "TOMADO"
          : predictions[j].predicao == TOMADO_FRACAMENTE
          ? "TOMADO FRACAMENTE"
          : predictions[j].predicao == NAO_TOMADO
          ? "NÃO TOMADO"
          : "NAO TOMADO FRACAMENTE"
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
    atributos.innerText = "O arquivo possui " + file.length + " endereços.";
    for (var i = 0; i < file.length; i++) {
      line = file[i].split(" "); //linha completa
      let index = binToInteger(hexToBinario(line[0]));
      predictions[index] = {
        predicao: initial_prediction,
        realizado: -1,
        acerto: 0,
        erro: 0,
        precisao: 0
      };
    }
    drawTable();
  };
}

function bht_1bit_nextStep(draw = true) {
  if (file == null || index >= file.length || m == undefined)
    alert(
      "Arquivo não carregado, ou o fim já foi alcançado ou o parametro m não foi passado"
    );
  else {
    var line = file[index].split(" ");
    var indexPreditor = binToInteger(hexToBinario(line[0]));

    predictions[indexPreditor].realizado = line[1];

    if (predictions[indexPreditor].predicao == TOMADO) {
      if (line[1] == TOMADO) {
        predictions[indexPreditor].acerto =
          predictions[indexPreditor].acerto + 1;
        if (draw) drawTable();
      } else if (line[1] == NAO_TOMADO) {
        predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
        if (draw) drawTable();
        predictions[indexPreditor].predicao = NAO_TOMADO;
      }
    } else if (predictions[indexPreditor].predicao == NAO_TOMADO) {
      if (line[1] == NAO_TOMADO) {
        predictions[indexPreditor].acerto =
          predictions[indexPreditor].acerto + 1;
        if (draw) drawTable();
      } else if (line[1] == TOMADO) {
        predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
        if (draw) drawTable();
        predictions[indexPreditor].predicao = TOMADO;
      }
    }
    predictions[indexPreditor].precisao =
      (predictions[indexPreditor].acerto /
        (predictions[indexPreditor].acerto + predictions[indexPreditor].erro)) *
      100;
    index++;
  }
  if (index == file.length) {
    exibirPorcentagem();
  }
}

function bht_1bit_summary() {
  if (file == null || index >= file.length)
    alert("Arquivo não carregado ou o fim já foi alcançado");
  else {
    for (var i = index; i < file.length; i++) {
      bht_1bit_nextStep(false);
    }
    drawTable();
  }
}

function bht_2bits_nextStep(draw = true) {
  // const TOMADO = 1;
  // const TOMADO_FRACAMENTO = 2
  // const NAO_TOMADO = 0;
  // const NAO_TOMADO_FRACAMENTE = 3

  if (file == null || index >= file.length || m == undefined)
    alert(
      "Arquivo não carregado, ou o fim já foi alcançado ou o parametro m não foi passado"
    );
  else {
    var line = file[index].split(" ");
    var indexPreditor = binToInteger(hexToBinario(line[0]));

    predictions[indexPreditor].realizado = line[1];
    //começando a predição
    switch (predictions[indexPreditor].predicao) {
      case TOMADO:
        if (line[1] == TOMADO) {
          predictions[indexPreditor].acerto =
            predictions[indexPreditor].acerto + 1;
          predictions[indexPreditor].realizado = TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = TOMADO;
        } else if (line[1] == NAO_TOMADO) {
          predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
          predictions[indexPreditor].realizado = NAO_TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = TOMADO_FRACAMENTE;
        }
        break;
      case TOMADO_FRACAMENTE:
        if (line[1] == TOMADO) {
          predictions[indexPreditor].acerto =
            predictions[indexPreditor].acerto + 1;
          predictions[indexPreditor].realizado = TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = TOMADO;
        } else if (line[1] == NAO_TOMADO) {
          predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
          predictions[indexPreditor].realizado = NAO_TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = NAO_TOMADO;
        }
        break;
      case NAO_TOMADO:
        if (line[1] == TOMADO) {
          predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
          predictions[indexPreditor].realizado = TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = NAO_TOMADO_FRACAMENTE;
        } else if (line[1] == NAO_TOMADO) {
          predictions[indexPreditor].acerto =
            predictions[indexPreditor].acerto + 1;
          predictions[indexPreditor].realizado = NAO_TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = NAO_TOMADO;
        }
        break;
      case NAO_TOMADO_FRACAMENTE:
        if (line[1] == TOMADO) {
          predictions[indexPreditor].erro = predictions[indexPreditor].erro + 1;
          predictions[indexPreditor].realizado = TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = TOMADO;
        } else if (line[1] == NAO_TOMADO) {
          predictions[indexPreditor].acerto =
            predictions[indexPreditor].acerto + 1;
          predictions[indexPreditor].realizado = NAO_TOMADO;
          if (draw) drawTable();
          predictions[indexPreditor].predicao = NAO_TOMADO;
        }
        break;
      default:
        alert("Deu alguma merda no código");
    }

    predictions[indexPreditor].precisao =
      (predictions[indexPreditor].acerto /
        (predictions[indexPreditor].acerto + predictions[indexPreditor].erro)) *
      100;
    index++;
  }
  if (index == file.length) {
    exibirPorcentagem();
  }
}

function bht_2bits_summary() {
  if (file == null || index >= file.length)
    alert("Arquivo não carregado ou o fim já foi alcançado");
  else {
    for (var i = index; i < file.length; i++) {
      bht_2bits_nextStep(false);
    }
    drawTable();
    disable_button()
  }
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
}