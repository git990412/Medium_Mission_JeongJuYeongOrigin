package com.ll.medium.domain.member.member.entity;

import static lombok.AccessLevel.PROTECTED;

import com.ll.medium.domain.member.role.entity.Role;
import com.ll.medium.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@AllArgsConstructor(access = PROTECTED)
@NoArgsConstructor(access = PROTECTED)
@Setter
@Getter
@ToString(callSuper = true)
public class Member extends BaseEntity {
  @Column(unique = true)
  private String username;

  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "member_roles",
      joinColumns = @JoinColumn(name = "member_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();
}
