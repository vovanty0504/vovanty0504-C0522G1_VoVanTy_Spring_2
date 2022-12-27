package com.example.back_end.service.customer;

import com.example.back_end.dto.customer.ICustomerDto;
import com.example.back_end.model.customer.Customer;
import com.example.back_end.model.decentralization.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ICustomerService {

    Customer findFakeMail(String email);

    int saveCreateGmail(Customer customer);

    Customer findCustomerByUsername( String username);

}
