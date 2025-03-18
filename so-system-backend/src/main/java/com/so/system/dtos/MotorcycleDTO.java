package com.so.system.dtos;

import java.util.List;

import com.so.system.model.Motorcycle;
import com.so.system.model.ServiceOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotorcycleDTO {
	private Integer customerId;
	private Integer id;
	private String mark;
	private String plate;
	private String model;
	private String vin;
	private Integer year;
	private Long km;
	private List<ServiceOrder> os_history;

	public MotorcycleDTO(Motorcycle motorcycle) {
		this.id = motorcycle.getId();
		this.model = motorcycle.getModel();
		this.vin = motorcycle.getVin();
		this.mark = motorcycle.getMark();
		this.plate = motorcycle.getPlate();
		this.year = motorcycle.getYear();
		this.km = motorcycle.getKm();
		this.customerId = motorcycle.getOwner().getCustomerId();
		this.os_history = motorcycle.getServiceOrders();
	}
}
