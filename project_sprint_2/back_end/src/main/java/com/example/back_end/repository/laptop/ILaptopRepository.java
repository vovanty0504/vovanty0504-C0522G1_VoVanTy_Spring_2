package com.example.back_end.repository.laptop;

import com.example.back_end.dto.ILaptopDto;
import com.example.back_end.model.laptop.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface ILaptopRepository extends JpaRepository<Laptop, Integer> {

    @Query(value = "select laptop.cpu as cpu, laptop.graphics_card as graphicsCard, laptop.image as image, " +
            "laptop.name as name, laptop.price as price, laptop.quantity as quantity, laptop.ram as ram, " +
            "laptop.screen as screen, laptop.status as status, " +
            "laptop.price * (1 - ifnull(promotion.discount, 0)/100)as discountMoney  " +
            "from laptop " +
            "join promotion on  promotion.id = laptop.promotion_id " +
            "join laptop_type on  laptop_type.id = laptop.laptop_type_id " +
            "where laptop_type.name like %:nameSearch% ",
            countQuery = "select count(*) from laptop " +
                    "join promotion on  promotion.id = laptop.promotion_id " +
                    "join laptop_type on  laptop_type.id = laptop.laptop_type_id " +
                    "where laptop.name like %:nameSearch% ",
            nativeQuery = true)
    Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable,
                                            @Param("nameSearch") String nameSearch);

}
