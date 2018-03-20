package com.hckz.entity;

import java.util.Date;

import javax.persistence.Entity;
@Entity
public class Orderitem {
    private Integer id;

    private Date hoteltid;

    private Integer hotelname;

    private Long roomprice;

    private Integer roomnum;

    private Integer orderid;
    
    private Order order;//所属订单
    
    

    public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getHoteltid() {
        return hoteltid;
    }

    public void setHoteltid(Date hoteltid) {
        this.hoteltid = hoteltid;
    }

    public Integer getHotelname() {
        return hotelname;
    }

    public void setHotelname(Integer hotelname) {
        this.hotelname = hotelname;
    }

    public Long getRoomprice() {
        return roomprice;
    }

    public void setRoomprice(Long roomprice) {
        this.roomprice = roomprice;
    }

    public Integer getRoomnum() {
        return roomnum;
    }

    public void setRoomnum(Integer roomnum) {
        this.roomnum = roomnum;
    }

    public Integer getOrderid() {
        return orderid;
    }

    public void setOrderid(Integer orderid) {
        this.orderid = orderid;
    }
}