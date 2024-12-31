let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = Array.from(new Set(quotes.map(quote => quote.category)));
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
    });
}

// Filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory);
    const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);
    displayQuotes(filteredQuotes);
}

// Display quotes in the quote display section
function displayQuotes(quotesToDisplay) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    quotesToDisplay.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
    });
}

// Add a new quote and update categories
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();
    alert('Quote added successfully!');
    } else {
    alert('Please fill in both fields!');
    }
}

// Load quotes and categories on page load
document.addEventListener('DOMContentLoaded', () => {
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    populateCategories();
    document.getElementById('categoryFilter').value = lastSelectedCategory;
    filterQuotes();
});
