package com.so.system.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	private Integer customerId;
	@Column(length = 30, name = "c_name")
	@Nonnull
	private String customerName;
	@Column(length = 15, name = "c_tel")
	@Nonnull
	private String customerTel;
	@Column(length = 30, name = "c_mail")
	@Nonnull
	private String email;
	@Column(length = 15, name = "c_cpf", unique = true)
	@Nonnull
	private String cpf;
	@Column(length = 20, name = "c_rg")
	@Nonnull
	private String rg;
	@OneToMany(mappedBy = "owner")
	@JsonIgnore
	private List<Motorcycle> motorcycles = new ArrayList<>();
	@JsonIgnore
	private boolean isActive = true;

}
