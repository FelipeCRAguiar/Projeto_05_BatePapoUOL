let nomeUsuario = ""
function carregarSite() {
    nomeUsuario = prompt("Qual é o seu nome?")
    const entrada = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", `{name: ${nomeUsuario}}`)
    const usuarioRepitido = entrada.then()
    if (usuarioRepitido.status === 200) {
        const mensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
        mensagens.then(carregarMensagens)
    }
}
function carregarMensagens(resposta) {
    for (let i=0;i<resposta.lenght;i++) {
        if (resposta[i].to === nomeUsuario || resposta[i].to === "Todos") {
            document.querySelector(".conteudo").innerHTML += `
            <div class="mensagens ${resposta[i].type}">
                <strong>${resposta[i].time}</strong> <b>${resposta[i].from}</b> ${resposta[i].text}
            </div>`
        }
    }
}