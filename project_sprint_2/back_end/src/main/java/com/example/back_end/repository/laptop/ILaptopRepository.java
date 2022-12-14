package com.example.back_end.repository.laptop;

import com.example.back_end.dto.laptop.IHistoryDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.laptop.Laptop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ILaptopRepository extends JpaRepository<Laptop, Integer> {

    @Query(value = "select laptop.cpu as cpu, laptop.graphics_card as graphicsCard, laptop.image as image, " +
            "laptop.name as name, laptop.price as price, laptop.quantity as quantity, laptop.ram as ram, " +
            "laptop.screen as screen, laptop.status as status,laptop.id as id, " +
            "laptop.price * (100 - ifnull(promotion.discount, 0))/100 as discountMoney  " +
            "from laptop " +
            "join promotion on  promotion.id = laptop.promotion_id " +
            "where laptop.name like %:nameSearch% and laptop.is_delete = 0  order by laptop.id desc",
            countQuery = "select count(*) from laptop " +
                    "join promotion on  promotion.id = laptop.promotion_id " +
                    "where laptop.name like %:nameSearch% and laptop.is_delete = 0 ",
            nativeQuery = true)
    Page<ILaptopDto> findAllLaptopAndSearch(Pageable pageable,
                                            @Param("nameSearch") String nameSearch);

    @Query(value = "select laptop.cpu as cpu, laptop.graphics_card as graphicsCard, laptop.image as image, " +
            "laptop.name as name, laptop.price as price, laptop.quantity as quantity, laptop.ram as ram, " +
            "laptop.screen as screen, laptop.status as status,laptop.id as id, " +
            "laptop.price * (1 - ifnull(promotion.discount, 0)/100)as discountMoney  " +
            "from laptop " +
            "join promotion on  promotion.id = laptop.promotion_id " +
            "where laptop.name like %:nameSearch% and laptop.is_delete = 0 having (discountMoney between  :startPrice and :endPrice) " +
            " order by discountMoney desc",
            countQuery = "select count(*), " +
                    "laptop.price * (1 - ifnull(promotion.discount, 0)/100)as discountMoney  " +
                    " from laptop " +
                    "join promotion on  promotion.id = laptop.promotion_id " +
                    "where laptop.name like %:nameSearch% having (discountMoney between  :startPrice and :endPrice) ",
            nativeQuery = true)
    Page<ILaptopDto> findAllLaptopAndSearchPrice(Pageable pageable,
                                                 @Param("nameSearch") String nameSearch,
                                                 @Param("startPrice") int startPrice,
                                                 @Param("endPrice") int endPrice);


    @Query(value = "select laptop.cpu as cpu, laptop.graphics_card as graphicsCard, laptop.image as image, " +
            "laptop.name as name, laptop.price as price, laptop.quantity as quantity, laptop.ram as ram, " +
            "laptop.screen as screen, laptop.status as status,laptop.id as id, " +
            "laptop.price * (1 - ifnull(promotion.discount, 0)/100)as discountMoney  " +
            "from laptop " +
            "join promotion on  promotion.id = laptop.promotion_id " +
            "where laptop.id = :id", nativeQuery = true)
    Optional<ILaptopDto> findByIdLaptop(@Param("id") Integer id);


    @Query(value = "select * from laptop where is_delete = 0 and id = :id", nativeQuery = true)
    Laptop findLaptop(@Param("id") Integer id);

    @Query(value = "select history.id as id, history.name as name , history.laptop_booking_time as dayBooking, history.status as status," +
            "history.price as price, history.quantity as quantity,history.is_delete as isDelete " +
            "from customer " +
            "join history on history.customer_id = customer.id " +
            "where customer.username = :username and (history.is_delete = 0 or history.is_delete = 2)  and (history.status between 1 and 2 ) " +
            "order by history.laptop_booking_time desc",
            countQuery = "select count(*) from customer " +
                    "join history on history.customer_id = customer.id " +
                    "where customer.username = :username and (history.is_delete = 0 or history.is_delete = 2) and (history.status between 1 and 2 )" +
                    "order by history.laptop_booking_time desc", nativeQuery = true)
    Page<IHistoryDto> getAllHistory(@Param("username") String username, Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update laptop set is_delete = 1 where id =:id", nativeQuery = true)
    void laptopDelete(@Param("id") Integer id);
}
