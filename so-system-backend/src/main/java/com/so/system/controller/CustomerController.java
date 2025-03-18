package com.so.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.so.system.dtos.CustomerDTO;
import com.so.system.model.Customer;
import com.so.system.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	CustomerService service;

	@PostMapping("/add")
	@CrossOrigin
	public void addCustomer(@RequestBody Customer customer) {
		service.addCustomer(customer);
	}

	@PostMapping("/disable/{id}")
	@CrossOrigin
	public void disableCustomer(@PathVariable Integer id) {
		service.disableCustomer(id);
	}

	@GetMapping("/customer/{id}")
	@CrossOrigin
	public CustomerDTO showCustomerInfo(@PathVariable Integer id) {
		return service.showCustomerInfo(id);
	}
	
	@GetMapping("/show")
	@CrossOrigin
	public List<CustomerDTO> showAll() {
		return service.showAll();
		
	}

}
