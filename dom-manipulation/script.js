// Array to store quotes
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Function to show a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add a quote.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to create and add the form for adding quotes
function createAddQuoteForm() {
    // Create form container
    const formContainer = document.createElement('div');
    formContainer.id = "addQuoteForm";

    // Add inner HTML for the form
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
    `;

    // Append form to the body
    document.body.appendChild(formContainer);

    // Add event listener for adding quotes
    document.getElementById('addQuoteButton').addEventListener('click', () => {
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please fill in both fields.");
            return;
        }

        // Add new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Clear input fields
        document.getElementById('newQuoteText').value = "";
        document.getElementById('newQuoteCategory').value = "";

        alert("Quote added successfully!");
    });
}

// Event Listeners
newQuoteButton.addEventListener('click', showRandomQuote);

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote();
    createAddQuoteForm();
});
