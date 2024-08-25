package com.example.demo;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class DijkstraAlgorithm {
    private Map<String, Map<String, Double>> graph;

    public DijkstraAlgorithm(Map<String, Map<String, Double>> graph) {
        this.graph = graph;
    }

    public List<Map<String, Object>> findShortestPathWithSteps(String start, String end) {
        Map<String, Double> distances = new HashMap<>();
        Map<String, String> previousNodes = new HashMap<>();
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingDouble(n -> n.distance));
        Set<String> visited = new HashSet<>();
        List<Map<String, Object>> steps = new ArrayList<>();

        for (String vertex : graph.keySet()) {
            distances.put(vertex, Double.POSITIVE_INFINITY);
            previousNodes.put(vertex, null);
        }
        distances.put(start, 0.0);
        pq.offer(new Node(start, 0.0));

        while (!pq.isEmpty()) {
            Node currentNode = pq.poll();
            String currentVertex = currentNode.vertex;

            if (visited.contains(currentVertex)) {
                continue;
            }
            visited.add(currentVertex);

            // Add exploration step
            steps.add(createStep("explore", currentVertex, null, new HashMap<>(distances), new HashMap<>(previousNodes)));

            if (currentVertex.equals(end)) {
                steps.add(createStep("finish", currentVertex, null, new HashMap<>(distances), new HashMap<>(previousNodes)));
                break;
            }

            for (Map.Entry<String, Double> neighbor : graph.get(currentVertex).entrySet()) {
                String neighborVertex = neighbor.getKey();
                double distance = neighbor.getValue();
                double alt = distances.get(currentVertex) + distance;

                if (alt < distances.get(neighborVertex)) {
                    distances.put(neighborVertex, alt);
                    previousNodes.put(neighborVertex, currentVertex);
                    pq.offer(new Node(neighborVertex, alt));

                    // Add update step
                    steps.add(createStep("update", currentVertex, neighborVertex, new HashMap<>(distances), new HashMap<>(previousNodes)));
                }
            }
        }

        return steps;
    }

    private Map<String, Object> createStep(String type, String current, String neighbor, Map<String, Double> distances, Map<String, String> previous) {
        Map<String, Object> step = new HashMap<>();
        step.put("type", type);
        step.put("current", current);
        step.put("neighbor", neighbor);
        step.put("distances", distances);
        step.put("previous", previous);
        return step;
    }

    private static class Node {
        String vertex;
        double distance;

        Node(String vertex, double distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
    }
}