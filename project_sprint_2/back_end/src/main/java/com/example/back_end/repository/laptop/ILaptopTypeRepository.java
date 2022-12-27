package com.example.back_end.repository.laptop;

import com.example.back_end.model.laptop.LaptopType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILaptopTypeRepository extends JpaRepository<LaptopType,Integer> {
}
