// Array to store quotes
let quotes = [];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const importFileInput = document.getElementById('importFile');

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add a quote.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Save the last viewed quote in session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));

    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Display the last viewed quote from session storage (if available)
function showLastViewedQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastQuote) {
        quoteDisplay.innerHTML = `"${lastQuote.text}" - <strong>${lastQuote.category}</strong>`;
    }
}

// Create and add a form for adding quotes
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.id = "addQuoteForm";

    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
    `;

    document.body.appendChild(formContainer);

    document.getElementById('addQuoteButton').addEventListener('click', () => {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please fill in both fields.");
            return;
        }

        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes();

        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";

        alert("Quote added successfully!");
    });
}

// Export quotes to a JSON file
function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        } catch (error) {
            alert('Error importing quotes. Ensure the file is a valid JSON.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event Listeners
newQuoteButton.addEventListener('click', showRandomQuote);
importFileInput.addEventListener('change', importFromJsonFile);

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    createAddQuoteForm();
    showLastViewedQuote(); // Show the last viewed quote (if available)
});
