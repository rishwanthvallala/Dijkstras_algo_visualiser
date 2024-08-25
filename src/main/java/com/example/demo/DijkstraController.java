package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/dijkstra")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class DijkstraController {

    @PostMapping("/shortestpath")
    public List<Map<String, Object>> findShortestPath(@RequestBody Map<String, Object> request) {
        String start = (String) request.get("start");
        String end = (String) request.get("end");
        Map<String, Map<String, Double>> graph = (Map<String, Map<String, Double>>) request.get("graph");

        DijkstraAlgorithm dijkstra = new DijkstraAlgorithm(graph);
        return dijkstra.findShortestPathWithSteps(start, end);
    }
    /*
    const cities = [
        { name: "Mumbai", latitude: 19.0760, longitude: 72.8777 },  // Maharashtra
        { name: "Delhi", latitude: 28.7041, longitude: 77.1025 },  // Delhi (Capital of India)
        { name: "Bangalore", latitude: 12.9716, longitude: 77.5946 },  // Karnataka
        { name: "Hyderabad", latitude: 17.3850, longitude: 78.4867 },  // Telangana
        { name: "Ahmedabad", latitude: 23.0225, longitude: 72.5714 },  // Gujarat
        { name: "Chennai", latitude: 13.0827, longitude: 80.2707 },  // Tamil Nadu
        { name: "Kolkata", latitude: 22.5726, longitude: 88.3639 },  // West Bengal
        { name: "Surat", latitude: 21.1702, longitude: 72.8311 },  // Gujarat
        { name: "Pune", latitude: 18.5204, longitude: 73.8567 },  // Maharashtra
        { name: "Jaipur", latitude: 26.9124, longitude: 75.7873 },  // Rajasthan
        { name: "Lucknow", latitude: 26.8467, longitude: 80.9462 },  // Uttar Pradesh
        { name: "Kanpur", latitude: 26.4499, longitude: 80.3319 },  // Uttar Pradesh
        { name: "Nagpur", latitude: 21.1458, longitude: 79.0882 },  // Maharashtra
        { name: "Indore", latitude: 22.7196, longitude: 75.8577 },  // Madhya Pradesh
        { name: "Thane", latitude: 19.2183, longitude: 72.9781 },  // Maharashtra
        { name: "Bhopal", latitude: 23.2599, longitude: 77.4126 },  // Madhya Pradesh
        { name: "Visakhapatnam", latitude: 17.6868, longitude: 83.2185 },  // Andhra Pradesh
        { name: "Pimpri-Chinchwad", latitude: 18.6298, longitude: 73.7997 },  // Maharashtra
        { name: "Patna", latitude: 25.5941, longitude: 85.1376 },  // Bihar
        { name: "Vadodara", latitude: 22.3072, longitude: 73.1812 },  // Gujarat
        { name: "Guwahati", latitude: 26.1445, longitude: 91.7362 },  // Assam
        { name: "Ranchi", latitude: 23.3441, longitude: 85.3096 },  // Jharkhand
        { name: "Shimla", latitude: 31.1048, longitude: 77.1734 },  // Himachal Pradesh
        { name: "Dehradun", latitude: 30.3165, longitude: 78.0322 },  // Uttarakhand
        { name: "Thiruvananthapuram", latitude: 8.5241, longitude: 76.9366 },  // Kerala
        { name: "Gandhinagar", latitude: 23.2156, longitude: 72.6369 },  // Gujarat
        { name: "Raipur", latitude: 21.2514, longitude: 81.6296 },  // Chhattisgarh
        { name: "Panaji", latitude: 15.4909, longitude: 73.8278 },  // Goa
        { name: "Imphal", latitude: 24.8170, longitude: 93.9368 },  // Manipur
        { name: "Shillong", latitude: 25.5788, longitude: 91.8933 },  // Meghalaya
        { name: "Aizawl", latitude: 23.7271, longitude: 92.7176 },  // Mizoram
        { name: "Kohima", latitude: 25.6751, longitude: 94.1077 },  // Nagaland
        { name: "Bhubaneswar", latitude: 20.2961, longitude: 85.8245 },  // Odisha
        { name: "Gangtok", latitude: 27.3314, longitude: 88.6138 },  // Sikkim
        { name: "Agartala", latitude: 23.8315, longitude: 91.2868 },  // Tripura
        { name: "Itanagar", latitude: 27.0844, longitude: 93.6053 },  // Arunachal Pradesh
        { name: "Dispur", latitude: 26.1433, longitude: 91.7898 },  // Assam
        { name: "Amaravati", latitude: 16.5412, longitude: 80.5173 },  // Andhra Pradesh
        { name: "Chandigarh", latitude: 30.7333, longitude: 76.7794 },  // Punjab & Haryana
    ];*/

    @GetMapping("/cities")
    public List<Map<String, Object>> getCities() {
        List<Map<String, Object>> cities = List.of(
            Map.of("name", "Mumbai", "latitude", 19.0760, "longitude", 72.8777),
            Map.of("name", "Delhi", "latitude", 28.7041, "longitude", 77.1025),
            Map.of("name", "Bangalore", "latitude", 12.9716, "longitude", 77.5946),
            Map.of("name", "Hyderabad", "latitude", 17.3850, "longitude", 78.4867),
            Map.of("name", "Ahmedabad", "latitude", 23.0225, "longitude", 72.5714),
            Map.of("name", "Chennai", "latitude", 13.0827, "longitude", 80.2707),
            Map.of("name", "Kolkata", "latitude", 22.5726, "longitude", 88.3639),
            Map.of("name", "Surat", "latitude", 21.1702, "longitude", 72.8311),
            Map.of("name", "Pune", "latitude", 18.5204, "longitude", 73.8567),
            Map.of("name", "Jaipur", "latitude", 26.9124, "longitude", 75.7873),
            Map.of("name", "Lucknow", "latitude", 26.8467, "longitude", 80.9462),
            Map.of("name", "Kanpur", "latitude", 26.4499, "longitude", 80.3319),
            Map.of("name", "Nagpur", "latitude", 21.1458, "longitude", 79.0882),
            Map.of("name", "Indore", "latitude", 22.7196, "longitude", 75.8577),
            Map.of("name", "Thane", "latitude", 19.2183, "longitude", 72.9781),
            Map.of("name", "Bhopal", "latitude", 23.2599, "longitude", 77.4126),
            Map.of("name", "Visakhapatnam", "latitude", 17.6868, "longitude", 83.2185),
            Map.of("name", "Pimpri-Chinchwad", "latitude", 18.6298, "longitude", 73.7997),
            Map.of("name", "Patna", "latitude", 25.5941, "longitude", 85.1376),
            Map.of("name", "Vadodara", "latitude", 22.3072, "longitude", 73.1812),
            Map.of("name", "Guwahati", "latitude", 26.1445, "longitude", 91.7362),
            Map.of("name", "Ranchi", "latitude", 23.3441, "longitude", 85.3096),
            Map.of("name", "Shimla", "latitude", 31.1048, "longitude", 77.1734),
            Map.of("name", "Dehradun", "latitude", 30.3165, "longitude", 78.0322),
            Map.of("name", "Thiruvananthapuram", "latitude", 8.5241, "longitude", 76.9366),
            Map.of("name", "Gandhinagar", "latitude", 23.2156, "longitude", 72.6369),
            Map.of("name", "Raipur", "latitude", 21.2514, "longitude", 81.6296),
            Map.of("name", "Panaji", "latitude", 15.4909, "longitude", 73.8278),
            Map.of("name", "Imphal", "latitude", 24.8170, "longitude", 93.9368),
            Map.of("name", "Shillong", "latitude", 25.5788, "longitude", 91.8933),
            Map.of("name", "Aizawl", "latitude", 23.7271, "longitude", 92.7176),
            Map.of("name", "Kohima", "latitude", 25.6751, "longitude", 94.1077),
            Map.of("name", "Bhubaneswar", "latitude", 20.2961, "longitude", 85.8245),
            Map.of("name", "Gangtok", "latitude", 27.3314, "longitude", 88.6138),
            Map.of("name", "Agartala", "latitude", 23.8315, "longitude", 91.2868),
            Map.of("name", "Itanagar", "latitude", 27.0844, "longitude", 93.6053),
            Map.of("name", "Dispur", "latitude", 26.1433, "longitude", 91.7898),
            Map.of("name", "Amaravati", "latitude", 16.5412, "longitude", 80.5173),
            Map.of("name", "Chandigarh", "latitude", 30.7333, "longitude", 76.7794)
        );

        return cities;
    }
}