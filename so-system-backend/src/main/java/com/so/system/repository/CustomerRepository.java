package com.so.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.so.system.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	boolean existsByCpf(String cpf);

}
