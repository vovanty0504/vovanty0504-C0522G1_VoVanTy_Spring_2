package com.example.back_end.repository.customer;

import com.example.back_end.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Integer> {
    @Modifying
    @Transactional
    @Query(value = "insert into customer(name,email,username) values (:name, :email, :email)", nativeQuery = true)
    int saveCreateGmail(@Param("name") String name, @Param("email") String email);

    @Query(value = "select * from customer where email = :email and is_delete = 0 LIMIT 0, 1;", nativeQuery = true)
    Customer findFakeMail(@Param("email") String email);

}
