package com.example.back_end.repository.laptop;

import com.example.back_end.dto.laptop.IBookingLaptopDto;
import com.example.back_end.dto.laptop.ILaptopDto;
import com.example.back_end.model.laptop.BookingLaptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IBookingLaptopRepository extends JpaRepository<BookingLaptop, Integer> {


    @Query(value = "select * from booking_laptop where status = 0 and is_delete = 0 and customer_id = :customerId " +
            "and laptop_id = :laptopId", nativeQuery = true)
    Optional<BookingLaptop> getBookingLaptopCart(@Param("customerId") Integer customerId,
                                                 @Param("laptopId") Integer laptopId);

    @Modifying
    @Query(value = "insert into booking_laptop (laptop_booking_time , quantity, customer_id,laptop_id) " +
            "value (now(),:quantity,:customerId,:laptopId) ", nativeQuery = true)
    void addLaptop(@Param("quantity") Integer quantity,
                   @Param("customerId") Integer customerId,
                   @Param("laptopId") Integer laptopId);

    @Modifying
    @Query(value = "update booking_laptop set quantity = :quantity where status = 0 and customer_id = :customerId " +
            "and laptop_id = :laptopId", nativeQuery = true)
    void setQuantityLaptop(@Param("quantity") Integer quantity,
                           @Param("customerId") Integer customerId,
                           @Param("laptopId") Integer laptopId);

    @Query(value = "select booking_laptop.id as id, laptop.price as price, promotion.discount as discount, " +
            "booking_laptop.quantity as quantity, laptop.image as image, laptop.name as name " +
            "from booking_laptop " +
            "join customer on customer.id = booking_laptop.customer_id " +
            "join laptop on laptop.id = booking_laptop.laptop_id " +
            "join promotion on promotion.id = laptop.promotion_id " +
            "where booking_laptop.is_delete = 0 and booking_laptop.status = 0 and booking_laptop.quantity > 0 " +
            "and booking_laptop.customer_id = :id ", nativeQuery = true)
    List<ILaptopDto> findCartByUser(@Param("id") Integer id);

    @Modifying
    @Query(value = "update booking_laptop set quantity = (quantity + 1) where id = :id and status = 0", nativeQuery = true)
    void ascQuantity(@Param("id") Integer id);

    @Modifying
    @Query(value = "update booking_laptop set quantity = (quantity - 1) where id = :id and status = 0", nativeQuery = true)
    void descQuantity(@Param("id") Integer id);


    @Modifying
    @Query(value = "update booking_laptop set is_delete = 1 where id = :id ", nativeQuery = true)
    void deleteCart(@Param("id") Integer id);

    @Modifying
    @Query(value = "update booking_laptop set booking_laptop.status = 1 where booking_laptop.customer_id = :id " +
            "and is_delete = 0 and booking_laptop.status = 0 ", nativeQuery = true)
    void payBookingLaptop(@Param("id") Integer id);

    @Query(value = "select count(id) as cartCount from booking_laptop " +
            "where booking_laptop.customer_id= :id and  booking_laptop.is_delete = 0  and booking_laptop.status = 0", nativeQuery = true)
    Optional<IBookingLaptopDto> getCartCount(@Param("id") Integer id);



}
