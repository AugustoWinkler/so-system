package com.so.system.dtos;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.so.system.model.Customer;

import lombok.Data;

@Data
public class CustomerDTO {
	private Integer customerId;
	private String customerName;
	private String customerTel;
	private String customerEmail;
	private String customerCpf;
	private String CustomerRg;
	private List<MotorcycleDTO> motorcycles = new ArrayList<>();

	public CustomerDTO(Customer customer) {
		this.customerId = customer.getCustomerId();
		this.customerName = customer.getCustomerName();
		this.customerTel = customer.getCustomerTel();
		this.customerCpf = customer.getCpf();
		this.CustomerRg = customer.getRg();
		this.customerEmail = customer.getEmail();
		this.motorcycles = customer.getMotorcycles().stream().map(MotorcycleDTO::new).collect(Collectors.toList());
	}

}
