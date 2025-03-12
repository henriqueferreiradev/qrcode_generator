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


let coresSelecionadas = {
    cor1: "#1D1B31",
    cor2: "#28F19C"
};

function syncColorInputs(customDiv, picker, text, key) {

    customDiv.style.backgroundColor = picker.value;

    customDiv.addEventListener("click", () => {
        picker.click();
    });

    picker.addEventListener("input", () => {
        customDiv.style.backgroundColor = picker.value;
        text.value = picker.value.toUpperCase();
        coresSelecionadas[key] = picker.value;
    });

    text.addEventListener("input", () => {
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(text.value)) {
            picker.value = text.value;
            customDiv.style.backgroundColor = text.value;
            coresSelecionadas[key] = text.value;
        }
    });
}

syncColorInputs(document.getElementById("custom-picker-1"), document.getElementById("color-picker-1"), document.getElementById("color-text-1"), "cor1");
syncColorInputs(document.getElementById("custom-picker-2"), document.getElementById("color-picker-2"), document.getElementById("color-text-2"), "cor2");

console.log(coresSelecionadas.cor1, coresSelecionadas.cor2);


async function gerarQrEmail() {

}
function gerarQrSMS() {
    const numero = document.querySelector('.input_text-sms').value;
    const mensagem = document.querySelector('.textarea_sms').value;



    if (!numero || !mensagem) {
        alert('Preencha todos os campos.');
        console.log("Número:", numero);
        console.log("Mensagem:", mensagem);

        return;
    }


    let sms 
    sms = `sms:+${numero}?body=${mensagem}`;

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    qrDiv.style.display = 'flex';

    QRCode.toDataURL(sms, {
        width: 400,
        height: 450,
        margin: 0,
        color: { light: coresSelecionadas.cor1, dark:coresSelecionadas.cor2 }
    }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log(url);

            qrDiv.innerHTML = `
                <h3 class="titulo_div">Aqui está seu QRCODE</h3>
                <div class="div_card_qrcode" id='div_card_qrcode'>
                    <div class="card_qrcode">
                        <div class="qr_img">
                            <img class="resultado_img" id="resultadoImg" src="${url}" alt="QR Code">
                        </div>

                        <input type="range" id="sizeRange" class="range-input" min="100" max="2000" value="1000" step="10">
                        <div class="div_sizeLabel">
                            <p class="size_label-p">Baixa qualidade</p>
                            <p class="size_label" id="sizeLabel">1000 x 1000 px</p>
                            <p class="size_label-p">Alta qualidade</p>
                        </div>
                    </div>
                    <div class="div_buttons">
                        <button class="code_generator button" onclick="gerarQrSMS()">Gerar QRCode</button>
                        <button class="code_generator" onclick="baixarCardSMS()">Baixar PNG</button>
                    </div>
                </div>
            </div>`;
        }
    });
}

function baixarCardSMS() {
    const img = document.getElementById("resultado_img");

    if (img && img.src) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'QRCode_SMS.png';
        link.click();
    } else {
        console.error("Imagem não encontrada ou não gerada ainda.");
    }
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

    QRCode.toDataURL(wifi, { width: 450, height: 450, margin: 2, color: { light: coresSelecionadas.cor1, dark: coresSelecionadas.cor2 } }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            qrDiv.innerHTML = `
                 
                    <h3 class="titulo_div">Aqui está seu QRCODE</h3>
                    <div class="div_card_qrcode" id='div_card_qrcode'>
                        <div class="card_qrcode">
                            <div class="qr_img">
                                <img class="resultado_img" src="${url}" alt="QR Code">
                            </div>

                            <input type="range" id="sizeRange" class="range-input" min="100" max="2000" value="1000"
                                step="10">
                            <div class="div_sizeLabel">
                                <p class="size_label-p" id=" ">Baixa qualidade</p>
                                <p class="size_label" id="sizeLabel">1000 x 1000 px</p>
                                <p class="size_label-p" id=" ">Alta qualidade</p>
                            </div>
                        </div>
                        <div class="div_buttons">
                            <button class="code_generator button" onclick="gerarQrWifi()">Gerar QRCode</button>
                            <button class="code_generator" onclick="baixarCardWifi()">Baixar PNG</button>
                        </div>
                    </div>
                </div>`;
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
    const img = document.querySelector(".resultado_img");

    if (img && img.src) {
        const link = document.createElement('a');
        link.href = img.src;  // Usar o src da imagem (DataURL do QR Code)
        link.download = 'cardWifi.png';
        link.click();
    } else {
        console.error("Imagem não encontrada ou não gerada ainda.");
    }
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
    let allDropdowns = document.querySelectorAll('.dropdown'); 
    let parent = element.parentElement;
    let isOpen = parent.classList.contains("active");
    let maisMenos = element.querySelector('.mais_menos');
    let spanInfos = element.querySelector('.infos_span');

    if (!isOpen) {
        parent.classList.add("active");
        maisMenos.src = `./assets/icons/minus.png`;
        spanInfos.style.color = '#28F19C';
        spanInfos.style.fontWeight = '600';
    } else {
        parent.classList.remove("active");
        maisMenos.src = `./assets/icons/plus.png`;
        spanInfos.style.color = '#FFFFFF';
        spanInfos.style.fontWeight = '400';
    }
}

const rangeInput = document.getElementById('sizeRange');
const sizeLabel = document.getElementById('sizeLabel');
const previewBox = document.getElementById('previewBox');

rangeInput.addEventListener('input', function () {
    const size = this.value;
    sizeLabel.textContent = `${size} x ${size} px`;
    previewBox.style.width = size + 'px';
    previewBox.style.height = size + 'px';
});
