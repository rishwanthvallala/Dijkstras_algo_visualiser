
# Dijkstra's Algorithm Visualizer

This project implements an interactive map that allows users to visualize Dijkstra's algorithm for finding the shortest path between selected cities. It also displays the shortest distance between the chosen cities.

![Screenshot](Screenshot.png)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)


## Demo

Check out the live demo of the interactive map here: [Dijkstras Algorithm Visualizer](https://rishwanthvallala.github.io/Dijkstras_algo_visualiser/)

## Features

- Interactive map interface powered by Google Maps API.
- Select two cities and visualize the shortest path between them using Dijkstra's algorithm.
- Display the shortest distance between the selected cities.
- Grey connections between cities for reference.
- Customizable parameters for path selection.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/rishwanthvallala/Dijkstras_algo_visualiser.git
   cd Dijkstras_algo_visualiser
   ```

2. Open the `index.html` file in a web browser to run the interactive map.

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



