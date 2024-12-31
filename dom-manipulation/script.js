const serverURL = 'https://jsonplaceholder.typicode.com/posts'; // Simulated server endpoint
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
    const response = await fetch(serverURL);
    if (!response.ok) {
        throw new Error('Failed to fetch quotes from server.');
    }
    const serverQuotes = await response.json();

    // Map server quotes to match local format
    return serverQuotes.map(item => ({
        text: item.title,
      category: "Server Category" // Default or derived category
    }));
    } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
    }
}

// Sync quotes with server
async function syncQuotes() {
    try {
    const serverQuotes = await fetchQuotesFromServer();
    mergeServerQuotes(serverQuotes);
    } catch (error) {
    console.error("Error during sync:", error);
    }
}

// Merge server quotes with local quotes
function mergeServerQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    const mergedQuotes = [...localQuotes];

  // Add only new quotes from the server
    serverQuotes.forEach(serverQuote => {
    if (!localQuotes.some(localQuote => localQuote.text === serverQuote.text)) {
        mergedQuotes.push(serverQuote);
    }
    });

  // Update local storage
    quotes = mergedQuotes;
    localStorage.setItem('quotes', JSON.stringify(quotes));

  // Notify user and refresh UI
    alert('Quotes synced with server!');
    populateCategories();
    filterQuotes();
}

// Add a new quote and sync it with the server
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();

    // Sync to server
    try {
        const response = await fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
        });

        if (response.ok) {
        alert('Quote added and synced with the server!');
        } else {
        console.error("Failed to sync new quote with the server.");
        }
    } catch (error) {
        console.error("Error syncing new quote with the server:", error);
    }
    } else {
    alert('Please fill in both fields!');
    }
}

// Populate the category filter dropdown
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

// Filter quotes by category
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

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    populateCategories();
    filterQuotes();
  await syncQuotes(); // Initial sync with the server
  setInterval(syncQuotes, 60000); // Periodic sync every 60 seconds
});
