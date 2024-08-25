
# Dijkstra's Algorithm Visualizer

This project implements an interactive map that allows users to visualize Dijkstra's algorithm for finding the shortest path between selected cities. It also displays the shortest distance between the chosen cities and the length of the path, where each city can only reach to its 3 closest cities.

![Screenshot](image.png)

## Table of Contents



## Demo

Check out the live demo of the interactive map here: [Dijkstras Algorithm Visualizer](https://rishwanthvallala.github.io/Dijkstras_algo_visualiser/)


## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/rishwanthvallala/Dijkstras_algo_visualiser.git
   cd Dijkstras_algo_visualiser
   ```

2. Open the `index.html` file in a web browser to run the interactive map.

## Requiements

- **Java**: JDK 11 or later for running the Spring Boot application.
- **Maven**: For building and managing the Spring Boot project dependencies.
- **Google Maps API Key**: Required for the map interface to function.

## Usage

1. Open the project in a web browser by opening the `index.html` file.

2. Select a start city and an end city from the dropdowns.

3. Click the "Visualize" button to see the algorithm in action. The path between the cities will be drawn on the map, and the shortest distance will be displayed.

4. Experiment with different city selections to explore various paths.

## Customization

You can customize the project in the following ways:

- Modify city data in the `cities` array in the JavaScript code to add or remove cities.
- Adjust the algorithm parameters, such as the number of closest neighbors to consider, in the `calculateShortestPath` function.
- Update the map initialization options in the `initMap` function to change the initial map center and zoom level.

## Contributing

Contributions to this project are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or a pull request.











Here's the updated README with a "Requirements" section added:

---

## Features

- Interactive map interface powered by Google Maps API.
- Select two cities and visualize the shortest path between them using Dijkstra's algorithm.
- Display the shortest distance between the selected cities.
- Grey connections between cities for reference.
- Customizable parameters for path selection.
- Backend API for finding shortest paths using Spring Boot.

## Requirements

- **Java**: JDK 11 or later for running the Spring Boot application.
- **Maven**: For building and managing the Spring Boot project dependencies.
- **Node.js**: (Optional) If using any additional frontend build tools.
- **Google Maps API Key**: Required for the map interface to function.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/rishwanthvallala/Dijkstras_algo_visualiser.git
   cd Dijkstras_algo_visualiser
   ```

2. Install dependencies and build the project:
   ```sh
   ./mvn clean install
   ```

3. Run the Spring Boot application:
   ```sh
   ./mvn spring-boot:run
   ```

4. Open the `localhost:8080/demo.html` file in a web browser to run the interactive map.


## Customization

You can customize the project in the following ways:

- Modify city data in the `/cities` API in the `src/main/java/com/example/demo/DijkstrasController.java` to add or remove cities.
- Adjust the algorithm parameters in the backend Spring Boot code for different pathfinding requirements.
- Update the map initialization options in the `localhost:8080/demo.html` file to change the initial map center and zoom level.

## Contributing

Contributions to this project are welcome! If you have any suggestions, improvements, or bug fixes, please open an issue or a pull request.

---

Feel free to make any additional changes based on your project's specific needs!