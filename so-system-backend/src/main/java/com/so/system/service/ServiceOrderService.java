package com.so.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.so.system.dtos.ServiceOderFullDTO;
import com.so.system.model.Motorcycle;
import com.so.system.model.ServiceOrder;
import com.so.system.repository.MotorcycleRepository;
import com.so.system.repository.ServiceOrderRepository;

@Service
public class ServiceOrderService {
	@Autowired
	ServiceOrderRepository soRepository;

	@Autowired
	MotorcycleRepository motorRepository;
	@Autowired
	MotorcycleService motorService;
	
	public ServiceOrder getOSById(Integer id) {
		return soRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Motorcycle not found"));
	}

	public void createSO(Integer id, ServiceOrder serviceOder) {
		ServiceOrder soOder = serviceOder;
		Motorcycle motorcycle = motorService.getMotorById(id);
		soOder.setMotorcycle(motorService.getMotorById(id));
		motorcycle.getServiceOrders().add(soOder);
		motorRepository.save(motorcycle);
		soRepository.save(soOder);
	}
	
	public ServiceOderFullDTO showOs(Integer id) {
		ServiceOderFullDTO serviceOderDTO = new ServiceOderFullDTO(this.getOSById(id));
		return serviceOderDTO;
	}
}
