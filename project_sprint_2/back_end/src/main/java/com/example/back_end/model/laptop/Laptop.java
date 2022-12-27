package com.example.back_end.model.laptop;

import com.example.back_end.model.customer.Customer;
import com.example.back_end.model.employee.Employee;
import com.example.back_end.model.promotion.Promotion;

import javax.persistence.*;

@Entity
public class Laptop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String cpu;
    private String screen;
    private String graphicsCard;
    @Column(columnDefinition = "TEXT")
    private String image;
    private String ram;
    private int quantity;
    private int price;
    private boolean isDelete;
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "laptop_type_id", referencedColumnName = "id")
    private LaptopType laptopType;

    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;

    public Laptop() {
    }

    public Laptop(Integer id, String name, String cpu, String screen, String graphicsCard,
                  String image, String ram, int quantity, int price, boolean isDelete,
                  boolean status, Employee employee, LaptopType laptopType, Promotion promotion) {
        this.id = id;
        this.name = name;
        this.cpu = cpu;
        this.screen = screen;
        this.graphicsCard = graphicsCard;
        this.image = image;
        this.ram = ram;
        this.quantity = quantity;
        this.price = price;
        this.isDelete = isDelete;
        this.status = status;
        this.employee = employee;
        this.laptopType = laptopType;
        this.promotion = promotion;
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

    public String getCpu() {
        return cpu;
    }

    public void setCpu(String cpu) {
        this.cpu = cpu;
    }

    public String getScreen() {
        return screen;
    }

    public void setScreen(String screen) {
        this.screen = screen;
    }

    public String getGraphicsCard() {
        return graphicsCard;
    }

    public void setGraphicsCard(String graphicsCard) {
        this.graphicsCard = graphicsCard;
    }


    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LaptopType getLaptopType() {
        return laptopType;
    }

    public void setLaptopType(LaptopType laptopType) {
        this.laptopType = laptopType;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
    }
}
