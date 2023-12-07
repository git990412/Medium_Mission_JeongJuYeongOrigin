package com.ll.medium.global.initData;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import com.ll.medium.domain.member.role.ERole;
import com.ll.medium.domain.member.role.entity.Role;
import com.ll.medium.domain.member.role.repository.RoleRepository;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.IntStream;

@Configuration
@RequiredArgsConstructor
public class notProd {
    @Autowired
    @Lazy
    private notProd self;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;

    @Bean
    public ApplicationRunner initPostData() {
        return args -> {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_USER));

            if(memberRepository.count() == 0){
                IntStream.rangeClosed(1, 3).forEach(i -> {
                    memberRepository.save(
                            Member.builder()
                                    .username("name" + i)
                                    .password("1234")
                                    .roles(roles)
                                    .build()
                    );
                });
            }

            if (postRepository.count() == 0) {
                IntStream.rangeClosed(1, 300).forEach(i -> {
                    if(i <= 100){
                        postRepository.save(
                                Post.builder()
                                        .title("title" + i)
                                        .body("content" + i)
                                        .member(memberRepository.findById(1L).get())
                                        .build()
                        );
                    }
                    else if(i <= 200){
                        postRepository.save(
                                Post.builder()
                                        .title("title" + i)
                                        .body("content" + i)
                                        .member(memberRepository.findById(2L).get())
                                        .build()
                        );
                    }
                    else{
                        postRepository.save(
                                Post.builder()
                                        .title("title" + i)
                                        .body("content" + i)
                                        .member(memberRepository.findById(3L).get())
                                        .build()
                        );
                    }
                });
            }
        };
    }
}
