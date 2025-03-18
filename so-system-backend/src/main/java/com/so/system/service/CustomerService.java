package com.so.system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.so.system.dtos.CustomerDTO;
import com.so.system.model.Customer;
import com.so.system.repository.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository repository;

	public Customer getCustomerById(Integer id) {
		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
	}

	public void addCustomer(Customer customer) {
		repository.save(customer);
	}

	public void disableCustomer(Integer id) {
		Customer customer = this.getCustomerById(id);
		customer.setActive(false);
		repository.save(customer);
	}

	public CustomerDTO showCustomerInfo(Integer id) {
		CustomerDTO customerDTO = new CustomerDTO(this.getCustomerById(id));
		return customerDTO;
	}

	public List<CustomerDTO> showAll() {
		List<Customer> customers = repository.findAll();
		List<CustomerDTO> customerDTOs = customers.stream().filter(c -> c.isActive()).map(c -> new CustomerDTO(c))
				.collect(Collectors.toList());

		return customerDTOs;
	}
}
