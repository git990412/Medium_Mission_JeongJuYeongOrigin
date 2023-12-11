package com.ll.medium.domain.post.post.controller;

import java.util.HashMap;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ll.medium.domain.post.post.form.WriteForm;
import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.rq.Rq;
import com.ll.medium.global.rsData.RsData;

import jakarta.validation.Valid;
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

  @PreAuthorize("isAuthenticated()")
  @PostMapping("/write")
  public RsData<?> writePost(@Valid @RequestBody WriteForm form, BindingResult bindingResult) {
    HashMap<String, String> errors = new HashMap<>();
    if (bindingResult.hasErrors()) {
      bindingResult.getFieldErrors().forEach(e -> {
        errors.put(e.getField(), e.getDefaultMessage());
      });
      return RsData.of("400", "fail", errors);
    }

    postService.writePost(form, rq.getUserDetails().getId());

    return RsData.of("200", "success", null);
  }

}