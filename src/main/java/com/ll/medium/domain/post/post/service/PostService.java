package com.ll.medium.domain.post.post.service;

import com.ll.medium.domain.post.post.dto.PostDto;
import com.ll.medium.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;

  public Page<PostDto> getLatest30() {
    Pageable pageable = PageRequest.of(0, 30);
    return postRepository.findByIsPublishedTrueOrderByIdDesc(pageable).map(PostDto::new);
  }

  public Page<PostDto> getList(int page) {
    Pageable pageable = PageRequest.of(page, 10);
    return postRepository.findByIsPublishedTrueOrderByIdDesc(pageable).map(PostDto::new);
  }
}
