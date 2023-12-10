package com.ll.medium.domain.post.post.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.rq.Rq;
import com.ll.medium.global.rsData.RsData;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class ApiV1PostController {
  private final PostService postService;
  private final Rq rq;

  @GetMapping("/latest")
  public RsData<?> getLatest30() {
    return RsData.of("200", "success", postService.getLatest30());
  }

  @GetMapping("/list")
  public RsData<?> getList(@RequestParam(value = "page", defaultValue = "0") int page) {
    return RsData.of("200", "success", postService.getList(page));
  }

  @PreAuthorize("isAuthenticated()")
  @GetMapping("/myList")
  public RsData<?> getMyList(@RequestParam(value = "page", defaultValue = "0") int page) {
    long userId = rq.getUserDetails().getId();

    return RsData.of("200", "success", postService.getMyList(page, userId));
  }

  @GetMapping("/{id}")
  public RsData<?> getOne(@PathVariable("id") long id) {
    return RsData.of("200", "success", postService.getOne(id));
  }
}
