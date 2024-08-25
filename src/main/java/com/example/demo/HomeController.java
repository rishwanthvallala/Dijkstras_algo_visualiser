package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;


public class HomeController {
    @GetMapping("/")
    public String hello() {
        return "application is at /demo.html";
    }

    @GetMapping("/")
    public String demo() {
        return "demo"; // This will return demo.html from the templates directory
    }

    @GetMapping("/error")
    public String error() {
        return "error"; // This will return error.html from the templates directory
    }
}
