package com.example.back_end.model.customer;

import com.example.back_end.model.laptop.Laptop;

import javax.persistence.*;

@Entity
public class HistoryBookingLaptop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private boolean isDelete;
    private String laptopBookingTime;
    private int status;
    private int price;
    private int quantity;


    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    public HistoryBookingLaptop() {
    }

    public HistoryBookingLaptop(Integer id, String name, boolean isDelete, String laptopBookingTime, int status, int price,
                                int quantity, Customer customer) {
        this.id = id;
        this.name = name;
        this.isDelete = isDelete;
        this.laptopBookingTime = laptopBookingTime;
        this.status = status;
        this.price = price;
        this.quantity = quantity;
        this.customer = customer;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
