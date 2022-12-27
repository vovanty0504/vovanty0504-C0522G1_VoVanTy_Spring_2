package com.example.back_end.service.customer.impl;

import com.example.back_end.model.customer.Customer;
import com.example.back_end.repository.customer.ICustomerRepository;
import com.example.back_end.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {

    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public Customer findFakeMail(String email) {
        return customerRepository.findFakeMail(email);
    }

    public int saveCreateGmail(Customer customer) {
        return customerRepository.saveCreateGmail(customer.getName(), customer.getEmail());
    }

    @Override
    public Customer findCustomerByUsername(String username) {
        return customerRepository.findCustomerByUsername(username);
    }
}
