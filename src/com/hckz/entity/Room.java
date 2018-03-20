package com.hckz.entity;

import javax.persistence.Entity;

@Entity
public class Room {
    private Integer roomRoomid;

    private String roomImgurl;

    private Long roomPrice;

    private Integer roomState;

    private String roomType;

    private Integer hotelid;
    
    private Hotel hotel;

    public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Integer getRoomRoomid() {
        return roomRoomid;
    }

    public void setRoomRoomid(Integer roomRoomid) {
        this.roomRoomid = roomRoomid;
    }

    public String getRoomImgurl() {
        return roomImgurl;
    }

    public void setRoomImgurl(String roomImgurl) {
        this.roomImgurl = roomImgurl == null ? null : roomImgurl.trim();
    }

    public Long getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(Long roomPrice) {
        this.roomPrice = roomPrice;
    }

    public Integer getRoomState() {
        return roomState;
    }

    public void setRoomState(Integer roomState) {
        this.roomState = roomState;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType == null ? null : roomType.trim();
    }

    public Integer getHotelid() {
        return hotelid;
    }

    public void setHotelid(Integer hotelid) {
        this.hotelid = hotelid;
    }
}