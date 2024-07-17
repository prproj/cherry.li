document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate-button");
    const saveButton = document.getElementById("save-button");
    const characterDiv = document.getElementById("character");
    const availabilityDiv = document.getElementById("availability");
    const numCharactersSelect = document.getElementById("num-characters");
    const customNumCharactersInput = document.getElementById("custom-num-characters");

    const MAX_CHARACTERS = 20000;

    function generateRandomChineseCharacter() {
        const unicodeStart = 0x4E00;
        const unicodeEnd = 0x9FA5;
        const randomCode = Math.floor(Math.random() * (unicodeEnd - unicodeStart + 1)) + unicodeStart;
        return String.fromCharCode(randomCode);
    }

    function displayRandomCharacters() {
        let numCharacters;
        if (numCharactersSelect.value === "custom") {
            numCharacters = parseInt(customNumCharactersInput.value, 10);
            if (isNaN(numCharacters) || numCharacters < 1) {
                alert("Please enter a valid number of characters.");
                return;
            }
        } else {
            numCharacters = parseInt(numCharactersSelect.value, 10);
        }

        if (numCharacters > MAX_CHARACTERS) {
            alert(`Enter a number that is less than or equal to ${MAX_CHARACTERS}.`);
            return;
        }

        let characters = '';
        for (let i = 0; i < numCharacters; i++) {
            characters += generateRandomChineseCharacter();
        }
        characterDiv.textContent = characters;
        displayYouTubeLinks(characters);
    }

    function displayYouTubeLinks(characters) {
        let linksHTML = '';
        for (let i = 0; i < characters.length; i++) {
            linksHTML += `<span class="availability-icon" style="color: pink;"><i class="fas fa-info-circle"></i></span> <span style="color: pink;"><a href="https://www.youtube.com/@${characters[i]}" target="_blank" style="color: inherit; text-decoration: underline;">https://www.youtube.com/@${characters[i]}</a></span><br>`;
        }
        availabilityDiv.innerHTML = linksHTML;
    }

    function saveToFile() {
        let numCharacters;
        if (numCharactersSelect.value === "custom") {
            numCharacters = parseInt(customNumCharactersInput.value, 10);
            if (isNaN(numCharacters) || numCharacters < 1) {
                alert("Please enter a valid number of characters.");
                return;
            }
        } else {
            numCharacters = parseInt(numCharactersSelect.value, 10);
        }

        if (numCharacters > MAX_CHARACTERS) {
            alert(`Please enter a number less than or equal to ${MAX_CHARACTERS}.`);
            return;
        }

        let characters = '';
        for (let i = 0; i < numCharacters; i++) {
            characters += generateRandomChineseCharacter();
        }

        let textContent = '';
        for (let i = 0; i < characters.length; i++) {
            textContent += `https://www.youtube.com/@${characters[i]}\n`;
        }

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'youtube_handles.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    numCharactersSelect.addEventListener("change", function() {
        if (numCharactersSelect.value === "custom") {
            customNumCharactersInput.style.display = "inline-block";
        } else {
            customNumCharactersInput.style.display = "none";
        }
    });

    generateButton.addEventListener("click", displayRandomCharacters);
    saveButton.addEventListener("click", saveToFile);

    displayRandomCharacters();
});