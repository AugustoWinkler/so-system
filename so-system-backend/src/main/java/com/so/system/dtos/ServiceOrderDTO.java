package com.so.system.dtos;

import java.time.LocalDate;

import com.so.system.model.ServiceOrder;

import lombok.Data;

@Data
public class ServiceOrderDTO {
	private LocalDate date;
	private String description;

	public ServiceOrderDTO(ServiceOrder so) {
		this.date = so.getOpendate();
		this.description = so.getDescription();
	}
}
