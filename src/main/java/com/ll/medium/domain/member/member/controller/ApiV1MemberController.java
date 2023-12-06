package com.ll.medium.domain.member.member.controller;

import com.ll.medium.domain.member.member.form.JoinForm;
import com.ll.medium.domain.member.member.service.MemberService;
import com.ll.medium.global.rsData.RsData;
import jakarta.validation.Valid;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class ApiV1MemberController {
  private final MemberService memberService;

  @PostMapping("")
  public RsData<?> join(@Valid @RequestBody JoinForm joinForm, BindingResult bindingResult) {
    HashMap<String, String> data = new HashMap<>();

    if (bindingResult.hasErrors()) {

      bindingResult.getFieldErrors().forEach(e -> data.put(e.getField(), e.getDefaultMessage()));
      return RsData.of("400", "Validating Fail", data);

    } else if (!joinForm.getPassword().equals(joinForm.getPasswordConfirm())) {

      data.put("passwordConfirm", "비밀번호가 일치하지 않습니다.");
      return RsData.of("400", "Validating Fail", data);
    }
    try {

      memberService.join(joinForm);

    } catch (DataIntegrityViolationException e) {

      data.put("username", "이미 존재하는 아이디입니다.");
      return RsData.of("400", "Error", data);
    }

    return RsData.of("200", "회원가입 성공", null);
  }
}
