document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todoForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            const input = document.getElementById('title');
            if (!input.value.trim()) {
                e.preventDefault();
                alert('Task cannot be empty!');
            }
        });
    }
});