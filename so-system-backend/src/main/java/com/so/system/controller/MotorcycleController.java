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

import com.so.system.dtos.MotorcycleDTO;
import com.so.system.dtos.ServiceOrderDTO;
import com.so.system.model.Motorcycle;
import com.so.system.service.MotorcycleService;

@RestController
@RequestMapping("/motorcycle")
public class MotorcycleController {

	@Autowired
	private MotorcycleService motorcycleService;

	@PostMapping("/{customerId}")
	@CrossOrigin
	public void addMotorcycle(@PathVariable Integer customerId, @RequestBody Motorcycle motorcycle) {
		motorcycleService.addMotorcycle(customerId, motorcycle);
	}

	@GetMapping("/show/{motorcycleId}")
	@CrossOrigin
	public MotorcycleDTO showMotorcycle(@PathVariable Integer motorcycleId) {
		return motorcycleService.showMotorcycleInfo(motorcycleId);
	}
	
	@GetMapping("/showos/{motorcycleId}")
	@CrossOrigin
	public List<ServiceOrderDTO> showAllOsByMotorId(@PathVariable Integer motorcycleId) {
		return motorcycleService.showAllOs(motorcycleId);
	}

}
