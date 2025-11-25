function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container');

    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(tab).classList.add('active');
}

async function handleLogin() {
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    if (!email || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    try {
        const response = await fetch('login_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Connexion rÃ©ussie ! Bienvenue ' + data.user.name);
            window.location.href = 'index.phtml';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error('Erreur:', error);
    }
}

async function handleSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
    const confirm = document.getElementById('password-confirm').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !password || !confirm) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (password !== confirm) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    if (!terms) {
        alert('Veuillez accepter les conditions d\'utilisation');
        return;
    }

    try {
        const response = await fetch('signup_handler.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirm: confirm
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Inscription rÃ©ussie ! Bienvenue ' + data.user.name);
            window.location.href = 'index.phtml';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error('Erreur:', error);
    }
}