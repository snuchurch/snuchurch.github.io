const apiKey = 'AIzaSyCHu6CPBmNlcNjoS3N06XnmZmAxuGQOnZo';
const sheetId = '1cQAZmfIngCiztT1dnfeLK57y6QZKhVDPgbY8H8J5xUk';
const range = 'Main!A1:K40';
const range_ad = 'Advertisement!A1:D40';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
const url_ad = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range_ad}?key=${apiKey}`;

async function fetchSheetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderBulletin(data.values);
    } catch (error) {
        console.error('Error fetching sheet data:', error);
    }
}

function renderBulletin(data) {
    document.getElementById('bulletin-date').textContent = data[0][0];
    const lang = localStorage.getItem('language') || 'en';
    const bulletinContent = document.getElementById('bulletin-content');
    let content = '';

    for (let i = 2; i < data.length; i++) {
        const row = data[i];

        if(row[1] == 'TRUE'){
            // Check for defined and use empty string if undefined
            const firstColumnContent = row[lang === "en" ? 3 : 2];
            const secondColumnContent = row[lang === "en" ? 7 : 6];
            const thirdColumnContent = row[lang === "en" ? 9 : 8];

            // Function to replace '/' with '<br>' if defined
            const formatContent = (text) => {
                return text ? text.replace(/\//g, '<br>') : '';
            };

            content += `
                <tr>
                    <td>${formatContent(firstColumnContent)}</td>
                    <td>
                        <div class="hr-with-text">
                            <span>${formatContent(secondColumnContent)}</span>
                        </div>
                    </td>
                    <td>${formatContent(thirdColumnContent)}</td>
                </tr>
            `;
        }
    }

    // Insert the content into the bulletin
    bulletinContent.innerHTML = content; // Ensure to insert HTML correctly
}


async function fetchSheetDataAd() {
    try {
        const response_ad = await fetch(url_ad);
        const data_ad = await response_ad.json();
        renderAdvertisement(data_ad.values);
    } catch (error) {
        console.error('Error fetching sheet data:', error);
    }
}

function renderAdvertisement(data) {
    const lang = localStorage.getItem('language') || 'en';
    const advertisementContent = document.getElementById('advertisement-content');
    let content = '';

    for (let i = 2; i < data.length; i++) {
        const row = data[i];
        // Check for defined and use empty string if undefined
        const item_ad = row[lang === "en" ? 2 : 0];
        const content_ad = row[lang === "en" ? 3 : 1];

        // Function to replace '/' with '<br>' if defined
        const formatContent = (text) => {
            return text ? text.replace(/\//g, '<br>') : '';
        };

        content += `
            <h2>${formatContent(item_ad)}</h2>
            <p>${formatContent(content_ad)}</p>`;
    }

    // Insert the content into the bulletin
    advertisementContent.innerHTML = content; // Ensure to insert HTML correctly
}

// Fetch and render sheet data when the page loads
fetchSheetData();
fetchSheetDataAd();