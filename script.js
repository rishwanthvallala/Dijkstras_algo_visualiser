// Define global variables
let map;
let pathPolyline;
let mainPathCoordinates;
let markers = [];
// City data
const cities = [
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Kanyakumari", lat: 8.0844, lng: 77.5495 },
  { name: "Srinagar", lat: 34.0837, lng: 74.7973 },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { name: "Panaji", lat: 15.4909, lng: 73.8278 },
  { name: "Patna", lat: 25.5941, lng: 85.1376 },
  { name: "Kochi", lat: 9.9312, lng: 76.2673 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Puri", lat: 19.8135, lng: 85.8312 },
  { name: "Jodhpur", lat: 26.2389, lng: 73.0243 },
  { name: "Raipur", lat: 21.2514, lng: 81.6296 },
  { name: "Ranchi", lat: 23.3441, lng: 85.3096},
  { name: "Visakhapatnam", lat: 17.6868, lng: 83.2185 },
  { name: "Indore", lat: 22.7196, lng: 75.8577 }
];

// Initialize the Google Maps API
function initMap() {
    const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    populateCityDropdowns();
}
// Populate city dropdowns
function populateCityDropdowns() {

    const startCityDropdown = document.getElementById("startCity");
    const endCityDropdown = document.getElementById("endCity");

    cities.forEach((city) => {
        const startOption = document.createElement("option");
        startOption.text = city.name;
        startOption.value = JSON.stringify(city);
        startCityDropdown.appendChild(startOption);

        const endOption = document.createElement("option");
        endOption.text = city.name;
        endOption.value = JSON.stringify(city);
        endCityDropdown.appendChild(endOption);
    });
    drawCityConnections();
}
// Draw grey connections between cities
function drawCityConnections() {
    cities.forEach((city) => {
        const neighbors = getNeighbors(city);
        const closestNeighbors = getClosestNeighbors(city, neighbors, 3); // Get the three closest neighbors
        closestNeighbors.forEach((neighbor) => {
        const pathCoordinates = [city, neighbor].map((coord) => ({
            lat: coord.lat,
            lng: coord.lng,
        }));
        const connection = new google.maps.Polyline({
            path: pathCoordinates,
            strokeColor: "#D3D3D3", // Light grey color
            strokeOpacity: 1,
            strokeWeight: 1,
            map: map,
        });
        });
    });
}
// Visualize Dijkstra's Algorithm
async function visualizeAlgorithm() {
  
    const startCityDropdown = document.getElementById("startCity");
    const endCityDropdown = document.getElementById("endCity");

    const startCity = JSON.parse(startCityDropdown.value);
    const endCity = JSON.parse(endCityDropdown.value);

    clearMarkers();
    addMarker(startCity);
    addMarker(endCity);

    const { pathCoordinates, shortestDistance } = await calculateShortestPath(startCity, endCity);

    document.getElementById("shortestDistance").textContent = `Shortest Distance: ${shortestDistance.toFixed(2)} units`;
}

async function calculateShortestPath(startCity, endCity) {
    // Create a map instance
    const graph = new Map();
    cities.forEach(city => {
        graph.set(city.name, { 
        name: city.name, 
        lat: city.lat, 
        lng: city.lng, 
        distance: Infinity, 
        parent: null 
        });
    });
    
    // Set the distance of the start city to 0
    graph.get(startCity.name).distance = 0;
    
    // Create a queue to track the shortest paths
    const queue = Array.from(graph.values());
    
    let shortestDistance = Infinity; // Initialize with a high value

    // Helper function to get the city with the shortest distance
    function getCityWithShortestDistance() {
        let shortestDistance = Infinity;
        let shortestCity = null;
        queue.forEach(city => {
        if (city.distance < shortestDistance) {
            shortestDistance = city.distance;
            shortestCity = city;
        }
        });
        return shortestCity;
    }
    // Function to visualize each step of the algorithm with a delay
    async function visualizeSteps() {
        let count = 0;
        while (queue.length > 0) {
        const currentCity = getCityWithShortestDistance();
        if (currentCity === endCity) {
            break; // Found the end city, exit the loop
        }

        queue.splice(queue.indexOf(currentCity), 1);

        const neighbors = getClosestNeighbors(currentCity, queue, 3); // Get the three closest neighbors
        neighbors.forEach((neighbor) => {
            const distance = currentCity.distance + getDistance(currentCity, neighbor);

            if (distance < neighbor.distance) {
                neighbor.distance = distance;
                neighbor.previous = currentCity;
                if (neighbor === endCity) {
                    shortestDistance = distance; // Update shortest distance if the end city is reached
                }
            }
        });

        await sleep(1000); // Delay each step by 1 second
        // calculate temp path

        const tempCoordinates = await makePath(currentCity, graph);
        console.log(tempCoordinates);
        await drawPath(tempCoordinates);

        count++;
        console.log("Step", count);
        }
    }
    await visualizeSteps();
    // construct the final path coordinates from the end city to the start city
    const pathCoordinates = makePath(endCity, graph);

    return {
        pathCoordinates,
        shortestDistance, // Return the shortest distance as well
    };
}

//helpers
// Helper function to introduce a delay using setTimeout
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function makePath(endCity,graph){
    let currentCity = graph.get(endCity.name);
    const pathCoordinates = [];
    while (currentCity) {
        pathCoordinates.unshift({ lat: currentCity.lat, lng: currentCity.lng });
        currentCity = currentCity.previous;
    }
    console.log(pathCoordinates);
    await drawPath(pathCoordinates);
    return pathCoordinates;
}

//  function to draw a path on the map
async function drawPath(pathCoordinates) {
    // Clear existing path if any
    if (pathPolyline) {
        pathPolyline.setMap(null);
    }
    pathPolyline = new google.maps.Polyline({
        path: pathCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    pathPolyline.setMap(map);
}
function getClosestNeighbors(city, neighbors, count) {
    neighbors.sort((a, b) => {
        const distanceA = getDistance(city, a);
        const distanceB = getDistance(city, b);
        return distanceA - distanceB;
    });
    return neighbors.slice(0, count);
}
function getNeighbors(city) {
    const neighbors = [];
    cities.forEach(otherCity => {
        if (city && otherCity && city.name !== otherCity.name && isAllowedPath(city, otherCity)) {
        neighbors.push(otherCity);
        }
    });
    return neighbors;

}
function isAllowedPath(city1, city2) {
    return true; // Allow  wanted type paths between any two cities, custumisable
}
// to calculate distance cities
function getDistance(city1, city2) {
    const latDiff = Math.abs(city1.lat - city2.lat);
    const lngDiff = Math.abs(city1.lng - city2.lng);
    return Math.sqrt(latDiff * 2 + lngDiff * 2);
}
// Helper function to clear existing markers
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}
function addMarker(city) {
    const marker = new google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: map,
        title: city.name,
    });
    markers.push(marker); // Add the marker to the `markers` array
}