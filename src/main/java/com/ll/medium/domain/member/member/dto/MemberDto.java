package com.ll.medium.domain.member.member.dto;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.post.post.entity.Post;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
  private String username;
  private List<Post> posts = new ArrayList<>();

  public MemberDto(Member member) {
    this.username = member.getUsername();
  }
}
