function mostrarSecao(secaoId) {

    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativa');
    });
    document.getElementById(secaoId).classList.add('ativa');
    document.querySelectorAll('.sidebutton').forEach(botao => {
        botao.classList.remove('ativo');
    });
    document.querySelector(`button[onclick="mostrarSecao('${secaoId}')"]`).classList.add('ativo');
}

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

    QRCode.toDataURL(wifi, { width: 200, height: 200, margin: 2 }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            //            qrDiv.innerHTML = `
            //             <h3>Aqui está seu QRCODE</h3>
            //                 <div class="div_card_qrcode" id='div_card_qrcode'>
            //                
            //                     <div class="card_qrcode">
            //                         <div class="qr_img">
            //                             <img src="${url}" alt="QR Code">
            //                         </div>
            //                         <div class="qrcode_resultado">
            //                             <p>Nome da Rede (SSID)</p>
            //                             <h2 class="resultado_texto">${login}</h2>
            //                             <p>Senha da Rede</p>
            //                             <h2 class="resultado_texto">${senha}</h2>
            //                         </div>
            //                     </div>
            //                     <p class="resultado_dica">Escaneie o QRCODE ou pesquise pelo SSID e senha.</p>
            //                 </div>
            //                 <button class="code_generator" onclick="baixarCardWifi()">Download QrCode</button>`;
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
let QRButton = document.querySelectorAll('.button')
let sideButtonImg = document.querySelectorAll('.sidebutton-img')
let toggleImgDark = document.querySelector('.theme_img-dark')
let toggleImgLight = document.querySelector('.theme_img-light')
let formulario = document.querySelectorAll('.formulario')
let qrcodeIconImg = document.querySelector('.qrcode_icon')
let tituloNome = document.querySelectorAll('.titulo_nome')
let inputText = document.querySelectorAll('.input_text')


trocaBtn.addEventListener('click', () => {
    trocaBtn.classList.toggle("light")
    body.classList.toggle("light")
    sidebar.classList.toggle('light')


    containers.forEach(container => container.classList.toggle('light'))
    sideButton.forEach(button => button.classList.toggle('light'))
    QRButton.forEach(btn => btn.classList.toggle('light'))
    tituloNome.forEach(nome => nome.classList.toggle('light'))
    formulario.forEach(form => form.classList.toggle('light'))
    inputText.forEach(input => input.classList.toggle('light'))

    sideButtonImg.forEach(buttonImg => {
        let srcAtual = buttonImg.getAttribute('src');

        if (srcAtual.includes('/light/')) {
            buttonImg.setAttribute('src', srcAtual.replace('/light/', '/dark/').replace('_light', '_dark'));
        } else {
            buttonImg.setAttribute('src', srcAtual.replace('/dark/', '/light/').replace('_dark', '_light'));
        }
    });

    if (body.classList.contains('light')) {
        toggleImgDark.src = `./assets/icons/dark_toggle.png`;
        toggleImgLight.src = `./assets/icons/light_toggle.png`;
        qrcodeIconImg.src = `./assets/icons/qrcode-icon-light.png`

    } else {
        toggleImgDark.src = `./assets/icons/dark.png`;
        toggleImgLight.src = `./assets/icons/light.png`;
        qrcodeIconImg.src = `./assets/icons/qrcode-icon-dark.png`
    }

})

sideButton.forEach(button => {
    button.addEventListener("mouseover", () => {
        let buttonImg = button.querySelector('.sidebutton-img');
        if (body.classList.contains('light')) {
            return;
        }
        let srcAtual = buttonImg.getAttribute("src");
        buttonImg.setAttribute("src", srcAtual.includes("/light/")
            ? srcAtual.replace('/light/', '/dark/').replace('_light', '_dark')
            : srcAtual.replace('/dark/', '/light/').replace('_dark', '_light')
        );
    });

    button.addEventListener("mouseout", () => {
        if (body.classList.contains('light')) {
            return;
        }
        let buttonImg = button.querySelector('.sidebutton-img');
        let srcAtual = buttonImg.getAttribute("src");
        buttonImg.setAttribute("src", srcAtual.includes("/dark/")
            ? srcAtual.replace('/dark/', '/light/').replace('_dark', '_light')
            : srcAtual.replace('/light/', '/dark/').replace('_light', '_dark')
        );
    });
});

function toggleDropdown(element) {
    let parent = element.parentElement;
    let isOpen = parent.classList.contains("active");
    let maisMenos = element.querySelector('.mais_menos')
    let spanInfos = element.querySelector('.infos_span')
    document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("active"));

    if (!isOpen) {
        parent.classList.add("active");
        maisMenos.src = `./assets/icons/minus.png`
        spanInfos.style.color = '#28F19C'
        spanInfos.style.fontWeight = '600'

    } else {
        maisMenos.src = `./assets/icons/plus.png`
        spanInfos.style.color = '#FFFFFF'
        spanInfos.style.fontWeight = '400'

    }
}