package com.so.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.so.system.model.ServiceOrder;

public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Integer> {

}
