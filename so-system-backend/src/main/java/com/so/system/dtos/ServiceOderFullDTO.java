package com.so.system.dtos;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.so.system.model.Customer;
import com.so.system.model.Motorcycle;
import com.so.system.model.ServiceOrder;
import com.so.system.repository.CustomerRepository;
import com.so.system.service.MotorcycleService;

import lombok.Data;

@Data
public class ServiceOderFullDTO {
	private LocalDate opendate;
	private String descrition;
	private Motorcycle motorcycle;
	private Customer customer;
	
	@Autowired
	@JsonIgnore
	private CustomerRepository customerRepository;
	
	@Autowired
	@JsonIgnore
	private MotorcycleService motorRepository;
	
	public ServiceOderFullDTO(ServiceOrder serviceOrder) {
		this.opendate = serviceOrder.getOpendate();
		this.descrition = serviceOrder.getDescription();
		this.motorcycle = serviceOrder.getMotorcycle();
		this.customer = this.motorcycle.getOwner();
	}
}
