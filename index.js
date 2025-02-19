function mostrarSecao(secaoId) {

    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativa');
    });

    document.getElementById(secaoId).classList.add('ativa');
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarSecao('url');
});

function gerarQr() {
    const login = document.querySelector('.input_text-login').value;
    const senha = document.querySelector('.input_text-senha').value;

    if (!login || !senha) {
        alert("Deu ruim");
        return;
    }

    const wifi = `WIFI:S:${login};T:WPA;P:${senha};;`;
    console.log(wifi);

    // Pega a div onde o QR Code deve ser inserido
    const qrDiv = document.getElementById("qrcode");

    // Remove conteúdo anterior antes de gerar um novo
    qrDiv.innerHTML = "";

    // Gera o QR Code e insere na div
    QRCode.toDataURL(wifi, { width: 300, height: 300, margin: 2,   }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            qrDiv.innerHTML = `
                <div class="div_card_qrcode">
                    <div class="card_qrcode">
                        <div class="qr_img">
                            <img src="${url}" alt="QR Code">
                        </div>
                        <div class="qrcode_resultado">
                            <img class='resultado_img' src="wifi-2-logo-png-transparent.png" alt="Wi-Fi">
                            <p>Nome da Rede (SSID)</p>
                            <h2 class="resultado_texto">${login}</h2>
                            <p>Senha da Rede</p>
                            <h2 class="resultado_texto">${senha}</h2>
                        </div>
                    </div>
                    <p class="resultado_dica">Escaneie o QRCODE ou pesquise pelo SSID e senha.</p>
                </div>`;
        }
    });
}


function iniciarScroll(elemento) {
    const targetPosition = elemento.getBoundingClientRect().top + window.scrollY;
    const scrollSpeed = 1;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Posição máxima de scroll

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
