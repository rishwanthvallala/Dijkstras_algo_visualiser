package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class HomeController {


    @GetMapping("/")
    public String demo() {
        return "demo"; 
    }
}
