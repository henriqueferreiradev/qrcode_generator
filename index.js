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


    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = "";


    QRCode.toDataURL(wifi, {
        width: 250,
        height: 250,
        colors: {

        },
    }, function (error, url) {
        if (error) {
            console.error(error);
        } else {
            console.log("QR Code gerado com sucesso!");

            const img = document.createElement('img');
            img.src = url;
            qrDiv.appendChild(img);
        }
    });
}


