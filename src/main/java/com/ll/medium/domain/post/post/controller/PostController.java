package com.ll.medium.domain.post.post.controller;

import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController {
  private final PostService postService;

  @GetMapping("/latest")
  public RsData<?> getLatest30() {
    return RsData.of("200", "success", postService.getLatest30());
  }

  @GetMapping("/list")
  public RsData<?> getList(@RequestParam(value = "page", defaultValue = "0") int page) {
    return RsData.of("200", "success", postService.getList(page));
  }
}
