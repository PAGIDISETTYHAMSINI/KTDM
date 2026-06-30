package com.manam.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "area")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Area {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String pincode;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;
}
