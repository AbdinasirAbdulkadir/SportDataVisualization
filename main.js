function uploadData() {
    var formData = {
        player_name: document.getElementById('player_name').value,
        score: parseInt(document.getElementById('score').value),
        game_date: document.getElementById('game_date').value
    };

    fetch('/upload_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        loadData(); // Reload data after successful upload
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function loadData() {
    fetch('/get_data')
    .then(response => response.json())
    .then(data => {
        console.log('Data:', data);
        visualizeData(data); // Visualize the new data
    });
}

function visualizeData(data) {
    // Prepare data for Chart.js
    var labels = data.map(entry => entry.game_date);
    var scores = data.map(entry => entry.score);

    var ctx = document.getElementById('chartArea').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line', // or 'bar', 'pie', etc.
        data: {
            labels: labels,
            datasets: [{
                label: 'Game Scores',
                data: scores,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadData);
