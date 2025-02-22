

function mostrarSecao(secaoId) {
    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativa');
    });

    document.getElementById(secaoId).classList.add('ativa');
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarSecao('url');
});
async function gerarQrEmail() {

}
async function gerarQrSMS() {
    const numero = document.getElementById('sms_mensagem')
    const mensagem = document.getElementById('textarea')

    if (!numero) {
        alert('Preencha todos os campos.');
        return;
    }
    let sms;
    sms = `sms:+${numero}?body=${mensagem}`

    console.log(wifi)

    const qrDiv = document.getElementById("qrcode_sms");
    qrDiv.innerHTML = "";
    qrDiv.style.display = 'flex'

    QRCode.toDataURL(sms, { width: 260, height: 260, margin: 2 }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            qrDiv.innerHTML = `
            <h3>Aqui está seu QRCODE</h3>
                <div class="div_card_qrcode" id='div_card_qrcode'>
                    <div class="card_qrcode">
                        <div class="qr_img">
                            <img src="${url}" alt="QR Code">
                        </div>
                    </div>
                    <p class="resultado_dica">Scan Now</p>
                </div>
                <button class="code_generator" onclick="baixarCardWifi()">Download QrCode</button>`;
        }
    });
}
async function gerarQrWifi() {
    const login = document.querySelector('.input_text-login').value;
    const senha = document.querySelector('.input_text-senha').value;
    const criptografia = await pegarCriptografia(); // Agora esperamos a resposta correta

    if (!login) {
        alert("Preencha o nome da rede e a senha!");
        return;
    }

    if (!criptografia === null) {
        return;
    }


    let wifi;

    if (criptografia === "") {
        wifi = `WIFI:S:${login};;`;
    } else {
        wifi = `WIFI:S:${login};T:${criptografia};P:${senha};;`;

    }
    console.log(wifi)

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    qrDiv.style.display = 'flex'

    QRCode.toDataURL(wifi, { width: 260, height: 260, margin: 2 }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            qrDiv.innerHTML = `
            <h3>Aqui está seu QRCODE</h3>
                <div class="div_card_qrcode" id='div_card_qrcode'>
                
                    <div class="card_qrcode">
                        <div class="qr_img">
                            <img src="${url}" alt="QR Code">
                        </div>
                        <div class="qrcode_resultado">
                            <img class='resultado_img' src="./assets/icons/wifi_logo.png" alt="Wi-Fi">
                            <p>Nome da Rede (SSID)</p>
                            <h2 class="resultado_texto">${login}</h2>
                            <p>Senha da Rede</p>
                            <h2 class="resultado_texto">${senha}</h2>
                        </div>
                    </div>
                    <p class="resultado_dica">Escaneie o QRCODE ou pesquise pelo SSID e senha.</p>
                </div>
                <button class="code_generator" onclick="baixarCardWifi()">Download QrCode</button>`;
        }
    });
}

function iniciarScroll(elemento) {
    const targetPosition = elemento.getBoundingClientRect().top + window.scrollY;
    const scrollSpeed = 1;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    function scrollStep() {
        const currentPosition = window.scrollY;

        if (currentPosition < targetPosition - 20 && currentPosition < maxScroll) {
            window.scrollBy(0, 5);
            setTimeout(scrollStep, scrollSpeed);
        } else {
            console.log("Scroll interrompido!");
        }
    }

    scrollStep();
}

async function pegarCriptografia() {
    const criptografiaSelecionada = document.querySelector('input[name="criptografia"]:checked');

    if (criptografiaSelecionada) {
        let tipo = criptografiaSelecionada.value.toUpperCase();

        if (tipo === "NENHUMA")
            return ""
        return tipo;
    } else {
        alert('Selecione uma opção de criptografia');
        return null;
    }
}

function baixarCardWifi() {
    const cardWifi = document.getElementById("div_card_qrcode");

    html2canvas(cardWifi).then(canvas => {
        const imgURL = canvas.toDataURL("cardWifi/png")
        const link = document.createElement('a')
        link.href = imgURL
        link.download = 'cardWifi.png'
        link.click()
    })
}

let trocaBtn = document.getElementById('switch')
let body = document.querySelector('body')
let sidebar = document.querySelector('.sidebar')
let containers = document.querySelectorAll('.container')
let sideButton = document.querySelectorAll('.sidebutton')
let toggleImgDark = document.querySelector('.theme_img-dark')
let toggleImgLight = document.querySelector('.theme_img-light')

trocaBtn.addEventListener('click', () => {
    trocaBtn.classList.toggle("light")
    body.classList.toggle("light")
    sidebar.classList.toggle('light')
    containers.forEach(container => container.classList.toggle('light'))
    sideButton.forEach(button => button.classList.toggle('light'))
    if (body.classList.contains('light')) {
        toggleImgDark.src = `./assets/icons/dark_toggle.png`;
        toggleImgLight.src = `./assets/icons/light_toggle.png`;
    } else {
        toggleImgDark.src = `./assets/icons/dark.png`;
        toggleImgLight.src = `./assets/icons/light.png`;
    }

})