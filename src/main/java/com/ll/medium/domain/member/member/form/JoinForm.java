package com.ll.medium.domain.member.member.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinForm {
  @NotBlank private String username;
  @NotBlank private String password;
  @NotBlank private String passwordConfirm;
}
