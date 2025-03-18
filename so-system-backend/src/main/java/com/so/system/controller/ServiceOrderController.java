package com.so.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.so.system.dtos.ServiceOderFullDTO;
import com.so.system.model.ServiceOrder;
import com.so.system.service.ServiceOrderService;


@RestController
public class ServiceOrderController {

	@Autowired
	ServiceOrderService service;

	@PostMapping("/create/{motorcycle_id}")
	@CrossOrigin
	public void createOS(@PathVariable Integer motorcycle_id, @RequestBody ServiceOrder serviceOder) {
		System.out.println(serviceOder);
		service.createSO(motorcycle_id, serviceOder);
	}
	
	@GetMapping("/show/{os_id}")
	@CrossOrigin
	public ServiceOderFullDTO showOs(@PathVariable Integer os_id){
		return service.showOs(os_id);
	}
}
