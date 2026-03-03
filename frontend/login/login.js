function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.form-container');
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));

    event.currentTarget.classList.add('active'); // Changement ici pour plus de fiabilité
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
        const response = await fetch('../../backend/login_handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert('Connexion réussie !');
            window.location.href = '../index.php';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
        console.error(error);
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
        alert('Veuillez accepter les conditions');
        return;
    }

    try {
        const response = await fetch('../../backend/signup_handler.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert('Inscription réussie !');
            window.location.href = '../index.php';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Erreur de connexion au serveur');
    }
}