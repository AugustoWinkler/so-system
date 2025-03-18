package com.so.system.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "motorcycles")
public class Motorcycle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Integer id;
	@JsonIgnore
	@ManyToOne
	private Customer owner;
	private String vin;
	private String mark;
	@Column(unique = true)
	private String plate;
	private String model;
	private int year;
	private long km;
	@JsonIgnore
	@OneToMany(mappedBy = "motorcycle")
	private List<ServiceOrder> serviceOrders = new ArrayList<>();
	@JsonIgnore
	private boolean isActive = true;
}
