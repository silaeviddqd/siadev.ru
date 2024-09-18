// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Smooth scrolling for reviews container
const container = document.querySelector('.reviews-container');
container.addEventListener('wheel', (event) => {
    event.preventDefault();
    container.scrollBy({ top: event.deltaY, behavior: 'smooth' });
});

// Popup functionality
function openPopup() {
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}

// Form validation and captcha handling
function validateUser() {
    event.preventDefault();

    if (!window.smartCaptcha) {
        return;
    }

    window.smartCaptcha.execute();
}

function sendData(captchaToken) {
    getIp().then(userIp => {
        const fs = require('fs');

        const secretPath = '/run/secrets/ysc_server_key';
        const secretKey = fs.readFile(secretPath, 'utf8', (err, data) => {
          if (err) {
            console.error('Ошибка при чтении секрета:', err);
            return;
          }
          return data;
        });
        const url = `https://smartcaptcha.yandexcloud.net/validate?secret=${secretKey}&ip=${userIp}&token=${captchaToken}`;

        fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Ошибка сети');
            return response.json();
        })
        .then(data => {
            if (data.success) {
                formData.preventDefault();

                const formData = new FormData(document.getElementById('feedbackForm'));
                // Здесь вы можете отправить данные формы
                fetch('send_email.php', {
                    method: 'POST',
                    body: formData
                }).then(response => response.text())
                .then(data => {
                    showResult(true);
                })
                .catch(error => {
                    showResult(false);
                });
                
            } else {
                alert('Капча не пройдена: ' + data.error);
                showResult(false);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showResult(false);
        });
    });
}

function getIp() {
    return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(error => {
        console.error('Ошибка получения IP-адреса:', error);
    });
}

// SmartCaptcha on load function
const form = document.getElementById('form');

function onloadFunction() {
    if (!window.smartCaptcha) {
        return;
    }

    const secretPath = '/run/secrets/ysc_site_key';
    const secretKey = fs.readFile(secretPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Ошибка при чтении секрета:', err);
        return;
      }
      return data;
    });

    window.smartCaptcha.render('captcha-container', {
        sitekey: secretKey,
        invisible: true,
        shieldPosition: 'top-left',
        callback: callback,
    });
}

function callback(token) {
    sendData(token);
}

function showResult(success) {
    const successAlert = document.getElementById('successAlert');
    const errorAlert = document.getElementById('errorAlert');
    
    if (success) {
        successAlert.classList.remove('hidden');
        successAlert.add('opacity-100');
        errorAlert.classList.add('hidden');
    } else {
        errorAlert.classList.remove('hidden');
        successAlert.classList.add('hidden');
        errorAlert.classList.add('opacity-100');
    }

    setTimeout(() => {
        successAlert.classList.remove('opacity-100');
        successAlert.classList.add('opacity-0');
        errorAlert.classList.remove('opacity-100');
        errorAlert.classList.add('opacity-0');
        setTimeout(() => {
            successAlert.classList.add('hidden');
            errorAlert.classList.add('hidden');
        }, 300)
    }, 300);  // Скрыть через 5 секунд
}
