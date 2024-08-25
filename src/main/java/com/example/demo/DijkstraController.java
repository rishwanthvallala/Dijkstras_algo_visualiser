package com.example.demo;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
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
    
}