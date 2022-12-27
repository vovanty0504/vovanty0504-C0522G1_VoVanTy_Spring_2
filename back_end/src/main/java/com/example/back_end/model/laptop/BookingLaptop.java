package com.example.back_end.model.laptop;


import com.example.back_end.model.customer.Customer;
import com.example.back_end.model.promotion.Promotion;

import javax.persistence.*;

@Entity
public class BookingLaptop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private boolean isDelete;
    private String laptopBookingTime;
    private Integer status;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "laptop_id", referencedColumnName = "id")
    private Laptop laptop;

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    public BookingLaptop() {
    }

   public BookingLaptop(Integer id, boolean isDelete, String laptopBookingTime, Integer status, int quantity,
                         Laptop laptop, Promotion promotion, Customer customer) {
        this.id = id;
        this.isDelete = isDelete;
        this.laptopBookingTime = laptopBookingTime;
        this.status = status;
        this.quantity = quantity;
        this.laptop = laptop;
        this.customer = customer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getLaptopBookingTime() {
        return laptopBookingTime;
    }

    public void setLaptopBookingTime(String laptopBookingTime) {
        this.laptopBookingTime = laptopBookingTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Laptop getLaptop() {
        return laptop;
    }

    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }



    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
