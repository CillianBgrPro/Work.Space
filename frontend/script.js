// activer la sidebar
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
});