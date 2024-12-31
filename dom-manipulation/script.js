const serverURL = 'https://jsonplaceholder.typicode.com/posts'; // Replace with a real or mock server endpoint

let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Fetch quotes from server
async function fetchQuotesFromServer() {
    try {
    const response = await fetch(serverURL);
    const serverQuotes = await response.json();

    // Map server quotes to our format (if server format differs)
    const formattedQuotes = serverQuotes.map(item => ({
        text: item.title,
      category: "Server Category" // Default or derived category
    }));

    mergeServerQuotes(formattedQuotes);
    } catch (error) {
    console.error("Error fetching quotes from server:", error);
    }
}

// Merge server quotes with local quotes
function mergeServerQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // Merge logic: add new quotes from server while avoiding duplicates
    const mergedQuotes = [...localQuotes];
    serverQuotes.forEach(serverQuote => {
    if (!localQuotes.some(localQuote => localQuote.text === serverQuote.text)) {
        mergedQuotes.push(serverQuote);
    }
    });

  // Save merged quotes
    quotes = mergedQuotes;
    localStorage.setItem('quotes', JSON.stringify(quotes));

  // Notify user of updates
    alert('Quotes have been synced with the server.');
    populateCategories();
    filterQuotes();
}

// Periodically sync data with the server
function startPeriodicSync(interval = 60000) { // Default: every 60 seconds
    fetchQuotesFromServer();
    setInterval(fetchQuotesFromServer, interval);
}

// Add a new quote and sync to server (simulated)
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();

    // Sync to server (POST request simulation)
    try {
        const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
        });

        if (response.ok) {
        alert('Quote added and synced with server!');
        } else {
        console.error("Failed to sync new quote with server.");
        }
    } catch (error) {
        console.error("Error syncing new quote with server:", error);
    }
    } else {
    alert('Please fill in both fields!');
    }
}

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

// Display quotes
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
    });
}

// Load initial quotes and start sync
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    filterQuotes();
    startPeriodicSync();
});
