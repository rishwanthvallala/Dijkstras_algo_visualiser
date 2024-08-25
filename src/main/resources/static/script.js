// Global variables
let map;
let markers = {};
let graph = {};
let cities = []; // This will be populated from the API



let simulationState = {
    isRunning: false,
    isPaused: false,
    speed: 3,
    currentStep: 0,
    algorithm: null,
    exploredPaths: [],
    finalPath: [],
    pathLines: [],
    availableRoutes: [],
    totalDistance: 0
};

// Initialize the map
async function initMap() {
    await fetchCitiesFromAPI();

    const mapStyles = [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ];

    map = new google.maps.Map(document.getElementById('mapContainer'), {
        center: {lat: 22.5726, lng: 78.3639}, // Roughly the center of India
        zoom: 5,
        styles: mapStyles
    });
    
    // Add markers for each city
    cities.forEach(city => {
        let position = new google.maps.LatLng(city.latitude, city.longitude);
        markers[city.name] = new google.maps.Marker({
            position: position,
            map: map,
            title: city.name
        });
    });

    // Create a graph with distances between cities
    createGraph();

    // Display available routes
    displayAvailableRoutes();

    // Populate city dropdowns
    let citySelects = document.querySelectorAll('#startCity, #endCity');
    citySelects.forEach(select => {
        cities.forEach(city => {
            let option = document.createElement('option');
            option.value = city.name;
            option.textContent = city.name;
            select.appendChild(option);
        });
    });

    // Set up event listeners
    document.getElementById('startSimulation').addEventListener('click', startSimulation);
    document.getElementById('playPause').addEventListener('click', togglePlayPause);
    document.getElementById('reset').addEventListener('click', resetSimulation);
    document.getElementById('speedControl').addEventListener('input', updateSpeed);
}

async function fetchCitiesFromAPI() {
    try {
        const response = await fetch('http://localhost:8080/api/dijkstra/cities');
        cities = await response.json();
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}


// Create a graph with distances between cities
function createGraph() {
    cities.forEach(city => {
        let distances = cities
            .filter(otherCity => otherCity.name !== city.name)
            .map(otherCity => ({
                name: otherCity.name,
                distance: calculateDistance(
                    city.latitude, city.longitude,
                    otherCity.latitude, otherCity.longitude
                )
            }))
            .sort((a, b) => a.distance - b.distance);

        graph[city.name] = {};
        distances.slice(0, 3).forEach(connection => {
            graph[city.name][connection.name] = connection.distance;
        });
    });
}

// Display available routes
function displayAvailableRoutes() {
    for (let cityName in graph) {
        let city = cities.find(c => c.name === cityName);
        for (let neighborName in graph[cityName]) {
            let neighbor = cities.find(c => c.name === neighborName);
            let path = [
                { lat: city.latitude, lng: city.longitude },
                { lat: neighbor.latitude, lng: neighbor.longitude }
            ];
            let line = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#808080',
                strokeOpacity: 0.5,
                strokeWeight: 1
            });
            line.setMap(map);
            simulationState.availableRoutes.push(line);
        }
    }
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}
async function* dijkstra(graph, start, end) {
    try {
        const response = await fetch('http://localhost:8080/api/dijkstra/shortestpath', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start, end, graph }),
            credentials: 'include'  // Add this line
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const steps = await response.json();
        console.log(steps);
        for (let step of steps) {
            yield step;
        }
    } catch (error) {
        console.error('Error:', error);
        yield { type: 'error', message: error.message };
    }
}

// Run simulation
function runSimulation() {
    if (!simulationState.isRunning) return;
    if (simulationState.isPaused) return;

    simulationState.algorithm.next().then(result => {
        if (!result.done) {
            updateVisualization(result.value);
            simulationState.currentStep++;
            setTimeout(runSimulation, getStepDelay());
        } else {
            finishSimulation();
        }
    }).catch(error => {
        console.error('Error in runSimulation:', error);
        finishSimulation();
    });
}

// Start simulation
function startSimulation() {
    let start = document.getElementById('startCity').value;
    let end = document.getElementById('endCity').value;

    if (start && end) {
        resetSimulation();
        simulationState.algorithm = dijkstra(graph, start, end);
        simulationState.isRunning = true;
        simulationState.isPaused = false;
        document.getElementById('playPause').textContent = 'Pause';
        runSimulation();
    } else {
        alert('Please select both start and end cities.');
    }
}
// Update visualization
function updateVisualization(stepResult) {
    switch (stepResult.type) {
        case 'explore':
            highlightCity(stepResult.current, '#FFFF00'); // Yellow for current city
            break;
        case 'update':
            let updatePath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, stepResult.neighbor);
            drawPath(updatePath, '#0000FF', 2); // Blue for explored paths
            break;
        case 'finish':
            let finalPath = reconstructPath(stepResult.previous, document.getElementById('startCity').value, document.getElementById('endCity').value);
            if (finalPath.length > 1) {
                drawPath(finalPath, '#FF0000', 3); // Red and thicker for final path
                displayFinalPath(finalPath, stepResult.distances);
            } else {
                displayNoPathFound();
            }
            break;
    }

    // Update progress display
    document.getElementById('algorithmProgress').textContent = `Exploring: ${stepResult.current}`;
}

function togglePlayPause() {
    if (!simulationState.isRunning) return;

    simulationState.isPaused = !simulationState.isPaused;
    document.getElementById('playPause').textContent = simulationState.isPaused ? 'Play' : 'Pause';

    if (!simulationState.isPaused) {
        runSimulation();
    }
}

// Highlight a city
function highlightCity(cityName, color) {
    let marker = markers[cityName];
    marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 2
    });
}

// Display final path and total distance
function displayFinalPath(path, distances) {
    let endCity = document.getElementById('endCity').value;
    let totalDistance = distances[endCity];
    simulationState.totalDistance = totalDistance;
    simulationState.finalPath = path;

    let pathString = path.join(" → ");
    let distanceString = totalDistance !== Infinity ? totalDistance.toFixed(2) : "No path found";

    let resultDiv = document.getElementById('finalResult');
    resultDiv.innerHTML = `
        <h3>Final Path:</h3>
        <p>${pathString}</p>
        <h3>Total Distance:</h3>
        <p>${distanceString} ${totalDistance !== Infinity ? 'km' : ''}</p>
    `;
    resultDiv.style.display = 'block';

    // Highlight the final path
    path.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
}

// Display message when no path is found
function displayNoPathFound() {
    let resultDiv = document.getElementById('finalResult');
    resultDiv.innerHTML = `
        <h3>No Path Found</h3>
        <p>There is no valid path between the selected cities.</p>
    `;
    resultDiv.style.display = 'block';
}

// Reconstruct path
function reconstructPath(previous, start, end) {
    let path = [];
    let current = end;
    while (current !== null && current !== start) {
        path.unshift(current);
        current = previous[current];
    }
    if (current === start) {
        path.unshift(start);
    }
    return path;
}

// Draw path on map
function drawPath(path, color, weight = 2) {
    for (let i = 0; i < path.length - 1; i++) {
        let start = markers[path[i]].getPosition();
        let end = markers[path[i+1]].getPosition();
        let line = new google.maps.Polyline({
            path: [start, end],
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: weight
        });
        line.setMap(map);
        simulationState.pathLines.push(line);
    }
}

// Finish simulation
function finishSimulation() {
    simulationState.isRunning = false;
    document.getElementById('playPause').textContent = 'Play';
    document.getElementById('algorithmProgress').textContent = 'Simulation complete';
    
    // Highlight the final path
    simulationState.finalPath.forEach(city => highlightCity(city, '#00FF00')); // Green for cities in the final path
}

// Reset simulation
function resetSimulation() {
    simulationState.isRunning = false;
    simulationState.isPaused = false;
    simulationState.currentStep = 0;
    simulationState.algorithm = null;
    simulationState.exploredPaths = [];
    simulationState.finalPath = [];
    simulationState.pathLines.forEach(line => line.setMap(null));
    simulationState.pathLines = [];
    simulationState.totalDistance = 0;
    document.getElementById('playPause').textContent = 'Play';
    document.getElementById('algorithmProgress').textContent = '';
    document.getElementById('finalResult').style.display = 'none';

    // Reset city markers
    for (let cityName in markers) {
        markers[cityName].setIcon(null);
    }
}
// Update speed
function updateSpeed() {
    simulationState.speed = document.getElementById('speedControl').value;
    document.getElementById('speedValue').textContent = simulationState.speed;
}

// Get step delay based on speed
function getStepDelay() {
    return 1000 / simulationState.speed;
}

// Initialize the map when the page loads
window.onload = initMap;