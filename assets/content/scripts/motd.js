document.addEventListener('DOMContentLoaded', function() {
    fetch('../assets/content/misc/motd.txt')
        .then(response => response.text())
        .then(data => {
            const motds = data.trim().split('\n');
            const randomIndex = Math.floor(Math.random() * motds.length);
            const randomMotd = motds[randomIndex];
            document.getElementById('motd').textContent = randomMotd;
        })
        .catch(error => {
            console.error('Error fetching and parsing MOTD:', error);
            document.getElementById('motdParagraph').textContent = 'Failed to fetch MOTD';
        });

});
