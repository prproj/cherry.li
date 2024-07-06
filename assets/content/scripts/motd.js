document.addEventListener('DOMContentLoaded', function() {
    fetch('../assets/content/misc/motd.txt')  // Replace with the path to your MOTD text file
        .then(response => response.text())
        .then(data => {
            // Split text into lines (assuming each line is a MOTD)
            const motds = data.trim().split('\n');
            // Get a random MOTD from the array
            const randomIndex = Math.floor(Math.random() * motds.length);
            const randomMotd = motds[randomIndex];
            // Update the paragraph element with the random MOTD
            document.getElementById('motd').textContent = randomMotd;
        })
        .catch(error => {
            console.error('Error fetching and parsing MOTD:', error);
            document.getElementById('motdParagraph').textContent = 'Failed to fetch MOTD';
        });
});