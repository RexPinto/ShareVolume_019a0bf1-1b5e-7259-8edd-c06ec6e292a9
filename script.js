document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cik = urlParams.get('CIK') || '0001393818'; // Blackstone CIK

    const fetchData = async (cik) => {
        const apiUrl = `https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/dei/EntityCommonStockSharesOutstanding.json`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; YourOrg/1.0)'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const filteredShares = data.units.shares.filter(share => share.fy > "2020" && typeof share.val === 'number');

            let maxVal = Number.MIN_SAFE_INTEGER;
            let maxFy = "";
            let minVal = Number.MAX_SAFE_INTEGER;
            let minFy = "";

            filteredShares.forEach(share => {
                if (share.val > maxVal) {
                    maxVal = share.val;
                    maxFy = share.fy;
                }
                if (share.val < minVal) {
                    minVal = share.val;
                    minFy = share.fy;
                }
            });

            const processedData = {
                "entityName": data.entityName,
                "max": { "val": maxVal, "fy": maxFy },
                "min": { "val": minVal, "fy": minFy }
            };

            // Update the DOM
            document.title = `${processedData.entityName} Share Data`;
            document.getElementById('share-entity-name').textContent = processedData.entityName;
            document.getElementById('share-max-value').textContent = processedData.max.val;
            document.getElementById('share-max-fy').textContent = processedData.max.fy;
            document.getElementById('share-min-value').textContent = processedData.min.val;
            document.getElementById('share-min-fy').textContent = processedData.min.fy;

             // Save data to data.json (simulated - can't actually save on client-side)
             console.log('Processed data:', processedData);
             // In a real-world scenario, you'd send this data to a backend server to be saved.

        } catch (error) {
            console.error('Error fetching or processing data:', error);
            // Optionally display an error message on the page
        }
    };

    fetchData(cik);
});