package com.so.system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.so.system.dtos.MotorcycleDTO;
import com.so.system.dtos.ServiceOrderDTO;
import com.so.system.model.Customer;
import com.so.system.model.Motorcycle;
import com.so.system.repository.CustomerRepository;
import com.so.system.repository.MotorcycleRepository;

@Service
public class MotorcycleService {
	@Autowired
	private MotorcycleRepository motorcycleRepository;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CustomerService customerService;

	public Motorcycle getMotorById(Integer id) {
		return motorcycleRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Motorcycle not found"));
	}

	public void addMotorcycle(Integer id, Motorcycle motorcycle) {
		Customer customer = customerService.getCustomerById(id);
		motorcycle.setOwner(customer);
		motorcycleRepository.save(motorcycle);
		customer.getMotorcycles().add(motorcycle);
		customerRepository.save(customer);
	}

	public MotorcycleDTO showMotorcycleInfo(Integer id) {
		Motorcycle motorcycle = this.getMotorById(id);
		return new MotorcycleDTO(motorcycle);
	}

	public void disableMotorcycle(Integer id) {
		Motorcycle motorcycle = this.getMotorById(id);
		motorcycle.setActive(false);
		motorcycleRepository.save(motorcycle);
	}

	public List<ServiceOrderDTO> showAllOs(Integer id) {
		Motorcycle motorcycle = this.getMotorById(id);

		return motorcycle.getServiceOrders().stream().map(ServiceOrderDTO::new).collect(Collectors.toList());
	}

}
