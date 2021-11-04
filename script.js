let seuVotoPara = document.querySelector('.tela__esquerda-1 span')
let cargo = document.querySelector('.tela__esquerda-2 span')
let numero = document.querySelector('.tela__esquerda-3')
let descricao = document.querySelector('.tela__esquerda-4')
let lateral = document.querySelector('.tela__direita')
let aviso = document.querySelector('.tela__baixo')

let etapaAtual = 0
let digitos = ''
let votoEmBranco = false
let votos = []

function comecarEtapa() {
  let etapa = etapas[etapaAtual]
  digitos = ''
  votoEmBranco = false

  let numeroHTML = ' '

  for (i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero selecionado"></div>'
    } else {
      numeroHTML += '<div class="numero"></div>'
    }
  }

  seuVotoPara.style.display = 'none'
  descricao.innerHTML = ''
  lateral.innerHTML = ' '
  aviso.style.display = 'none'
  cargo.innerHTML = etapa.titulo
  numero.innerHTML = numeroHTML
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual]
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === digitos) {
      return true
    } else {
      return false
    }
  });
  if(candidato.length > 0) {
    candidato = candidato[0]
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block'
    descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

    let fotoHTML = ''
      for(i in candidato.fotos) {
        if(candidato.fotos[i].small) {
        fotoHTML += ` <div class="tela__direita-img menor">
        <img src="./images/${candidato.fotos[i].url}" alt="">
        ${candidato.fotos[i].legenda}
      </div>`
      } else {
        fotoHTML += ` <div class="tela__direita-img">
        <img src="./images/${candidato.fotos[i].url}" alt="">
        ${candidato.fotos[i].legenda}
      </div>`
      }

      lateral.innerHTML = fotoHTML

    }
  } else { 
  seuVotoPara.style.display = 'block';
  aviso.style.display = 'block'
  descricao.innerHTML = '<div class="aviso__grande selecionado">VOTO NULO</div>'
}
}
function clicou(n) {
  let elNumero = document.querySelector('.numero.selecionado')
  if (elNumero !== null) {
    elNumero.innerHTML = n
    digitos = `${digitos}${n}`

    elNumero.classList.remove('selecionado')
    if (elNumero.nextElementSibling !== null) {
      elNumero.nextElementSibling.classList.add('selecionado')
    } else {
      atualizaInterface()
    }
  }
}
function branco() {
  if(digitos === '') {
    votoEmBranco = true
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block'
    numero.innerHTML = ''
    descricao.innerHTML = '<div class="aviso__grande selecionado">VOTO EM BRANCO</div>'
  } else {
    alert('Para votar em branco precisa apagar todos os numero digitados clicando em CORRIGE.')
  }

}
function corrige() {
  comecarEtapa()
}
function confirma() {
  let etapa = etapas[etapaAtual]
  let votoConfirmado = false

  if(votoEmBranco === true){
    votoEmBranco = true
    votoConfirmado = true
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    })
  } else if (digitos.length === etapa.numeros) {
    votoConfirmado = true
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: digitos
    })
  }

  if(votoConfirmado){
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined) {
      comecarEtapa()
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso__gigante selecionado">FIM!</div>'
      console.log(votos)
    }
  }
}

comecarEtapa()
