package com.so.system.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "serviceroders")
public class ServiceOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Integer so_id;
	@JsonIgnore
	private LocalDate opendate = LocalDate.now();
	private String description;
	@ManyToOne
	@JoinColumn(name = "motorcycle_id", nullable = false)
	@JsonIgnore
	private Motorcycle motorcycle;
}
