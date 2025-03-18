package com.so.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.so.system.model.Motorcycle;

public interface MotorcycleRepository extends JpaRepository<Motorcycle, Integer> {

}
