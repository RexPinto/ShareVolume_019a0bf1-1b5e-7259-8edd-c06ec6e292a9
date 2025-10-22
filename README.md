# Blackstone Inc. Share Data App

## Summary

This app fetches and displays the maximum and minimum outstanding common stock shares for Blackstone Inc. (or another company based on the CIK query parameter) from the SEC's XBRL data API. It filters the data for years after 2020 and presents the results in a visually appealing format.

## Setup Instructions

Since this is a purely frontend application, no server-side setup is required. Simply open the `index.html` file in your web browser.

## Usage Guide

1.  **Basic Usage:** Open `index.html` in your browser. The app will fetch data for Blackstone Inc. (CIK: 0001393818) and display the maximum and minimum shares outstanding since 2020.

2.  **Using a Different CIK:**  You can specify a different company's CIK using the `CIK` query parameter in the URL. For example:

    ```
    index.html?CIK=0001018724
    ```

    This will fetch data for the company with CIK 0001018724 and update the displayed information dynamically without requiring a page reload.

## Code Explanation

*   **`index.html`:** This file contains the basic HTML structure, including the title, heading, and placeholders for the share data. It also includes a link to the `style.css` stylesheet and the `script.js` JavaScript file.

*   **`script.js`:** This file contains the JavaScript logic to:
    *   Fetch data from the SEC API based on the provided CIK (or the default Blackstone CIK).
    *   Parse the JSON response and filter the share data for years after 2020.
    *   Calculate the maximum and minimum share values and their corresponding years.
    *   Update the content of the HTML elements with the retrieved and processed data.
    *   Handle potential errors during the fetch or processing.
    * The SEC API requires a `User-Agent` header, which is set in the `fetch` request.

*   **`style.css`:** This file contains the CSS styles to enhance the visual presentation of the app. It provides basic styling for the body, headings, data containers, and the max/min share values.

## Data Storage

The application does not persist any data.
In a real production environment, you would need to save the processed data to a database using a backend server.

## Important Considerations

* The SEC API requires that requests include a descriptive User-Agent header.
* This app is purely frontend and runs entirely in the browser. No backend server is required.