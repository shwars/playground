document.addEventListener('DOMContentLoaded', () => {
    // Q&A functionality
    document.querySelectorAll('.qa-question').forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            const isActive = button.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.qa-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            // Open clicked if not active
            if (!isActive) {
                button.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});