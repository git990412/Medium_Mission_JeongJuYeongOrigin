package com.ll.medium.domain.home.home.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ApiV1HomeController {
  @GetMapping("/")
  public String Home() {
    return "home";
  }
}
