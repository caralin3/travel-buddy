package com.example.travelbuddybackend.model;

import com.example.travelbuddybackend.model.type.RoleEnum;

import javax.persistence.*;
@Entity
@Table(name="role", uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleEnum name;

    public Role() {
    }

    public Role(RoleEnum name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleEnum getName() {
        return name;
    }
    public void setName(RoleEnum name) {
        this.name = name;
    }
}
