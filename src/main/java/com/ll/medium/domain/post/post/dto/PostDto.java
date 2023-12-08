package com.ll.medium.domain.post.post.dto;

import com.ll.medium.domain.member.member.dto.MemberDto;
import com.ll.medium.domain.post.post.entity.Post;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {
  private Long id;
  private String title;
  private String body;
  private LocalDateTime createDate;
  private LocalDateTime modifyDate;
  private boolean isPublished;
  private MemberDto member;

  public PostDto(Post post) {
    this.id = post.getId();
    this.title = post.getTitle();
    this.body = post.getBody();
    this.isPublished = post.isPublished();
    this.createDate = post.getCreateDate();
    this.modifyDate = post.getModifyDate();
  }
}
