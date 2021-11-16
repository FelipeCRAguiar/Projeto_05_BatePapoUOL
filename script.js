let nomeUsuario = ""
function carregarSite() {
    nomeUsuario = prompt("Qual é o seu nome?")
    const entrada = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", {name: nomeUsuario})
    entrada.catch(erro)
    entrada.then(puxarMensagens)
}
function carregarMensagens(resposta) {
    document.querySelector(".conteudo").innerHTML = ""
    let mensagens = resposta.data
    for (let i=0;i<mensagens.length;i++) {
        if (mensagens[i].to === nomeUsuario || mensagens[i].to === "Todos") {
            document.querySelector(".conteudo").innerHTML += `
            <div class="mensagens ${mensagens[i].type}">
                <strong>${mensagens[i].time}</strong> <b>${mensagens[i].from}</b>: ${mensagens[i].text}
            </div>`
            let listamnsg = document.querySelectorAll(".mensagens")
            listamnsg[i].scrollIntoView()
        }
    }
}
function erro(erro) {
    window.location.reload()
}
function puxarMensagens() {
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    mensagens.then(carregarMensagens)  
}
function statusOnline() {
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name: nomeUsuario})
}
function enviarMensagem() {
    let input = document.querySelector("footer input")
    const mensagem = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", {from: nomeUsuario, to: "Todos",text: input.value, type: "message"})
    mensagem.then(carregarMensagens)
    mensagem.catch(erro)
}
carregarSite()
setInterval(statusOnline, 5000)
setInterval(puxarMensagens, 3000)