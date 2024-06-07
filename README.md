# AmazonProductScraper
 
# Amazon Product Scraper

This application allows users to search for products on Amazon and scrape the search results to retrieve product details.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/EdivanAzevedo/AmazonProductScraper
    ```

2. Install dependencies:

    ```bash
    cd AmazonProductScraper
    npm install
    ```

## Running the Application

1. Start the server:

    ```bash
    node server.js
    ```

2. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).
3. Enter a keyword in the search box and click the "Scrape" button to retrieve Amazon search results.
4. The product details will be displayed below the search box.

## Error Handling

- If the keyword is not provided, the server will respond with a 400 error.
- If there is an error while scraping the data from Amazon, the server will respond with a 500 error.
