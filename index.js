function gerarQr() {
  const login = document.querySelector('.input_text-login').value;
  const senha = document.querySelector('.input_text-senha').value;
  
  if (!login || !senha) {
      alert("Deu ruim");
      return;
  }

  const wifi = `WIFI:S:${login};T:WPA;P:${senha};;`;
  console.log(wifi);

  // Limpa o conteúdo anterior do QRCode
  const qrDiv = document.getElementById('qrcode');
  qrDiv.innerHTML = ""; 

  // Gera o QR Code
  QRCode.toDataURL(wifi, {
      width: 250,
      height: 250
  }, function (error, url) {
      if (error) {
          console.error(error);
      } else {
          console.log("QR Code gerado com sucesso!");
          // Cria um elemento de imagem e coloca o QR Code gerado nele
          const img = document.createElement('img');
          img.src = url;
          qrDiv.appendChild(img);
      }
  });
}
