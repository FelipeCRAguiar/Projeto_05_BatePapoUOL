let nomeUsuario = ""
function carregarSite() {
    nomeUsuario = prompt("Qual é o seu nome?")
    const entrada = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: nomeUsuario})
    entrada.catch(erro)
    entrada.then(puxarMensagens)
}
function carregarMensagens(resposta) {
    let mensagens = resposta.data
    for (let i = 0 ; i < mensagens.length ; i++) {
        document.querySelector(".conteudo").innerHTML += `
        <div class="mensagens ${mensagens[i].type}">
            <strong>(${mensagens[i].time})</strong> &nbsp <b>${mensagens[i].from}</b>: &nbsp ${mensagens[i].text}
        </div>`
        let listamnsg = document.querySelectorAll(".mensagens")
        listamnsg[i].scrollIntoView()
    }
}
function erro(erro) {
    console.log(erro.response)
}
function puxarMensagens() {
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    mensagens.catch(erro)
    mensagens.then(carregarMensagens)  
}
carregarSite()