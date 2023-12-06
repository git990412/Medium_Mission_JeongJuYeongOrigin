package com.ll.medium.global.security.service;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  private final MemberRepository memberRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Member> member = memberRepository.findByUsername(username);

    if (member.isEmpty()) {
      throw new UsernameNotFoundException(username);
    }

    Member getMember = member.get();

    return UserDetailsImpl.builder()
        .id(getMember.getId())
        .username(getMember.getUsername())
        .password(getMember.getPassword())
        .roles(getMember.getRoles())
        .build();
  }
}
