// Array to store quotes
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuote');
const categoryFilter = document.getElementById('categoryFilter');

// Function to show a random quote
function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available in this category.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <strong>${randomQuote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please fill in both fields.");
        return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });

    // Add category to filter if it's new
    if (!Array.from(categoryFilter.options).some(option => option.value === quoteCategory)) {
        categoryFilter.innerHTML += `<option value="${quoteCategory}">${quoteCategory}</option>`;
    }

    newQuoteText.value = "";
    newQuoteCategory.value = "";
    alert("Quote added successfully!");
}

// Populate category filter
function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    let optionsHTML = '<option value="all">All</option>';
    categories.forEach(category => {
        optionsHTML += `<option value="${category}">${category}</option>`;
    });
    categoryFilter.innerHTML = optionsHTML;
}

// Event Listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);

// Initial Setup
populateCategories();
showRandomQuote();
