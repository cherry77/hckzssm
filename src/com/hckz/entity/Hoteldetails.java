package com.hckz.entity;

import javax.persistence.Entity;


@Entity
public class Hoteldetails {
    private Integer id;

    private Integer hotelid;
    
    private String hoteltype;

    private String imgurl;

    private Integer imgtype;

    private String hotelintroduce;
    
  	private Hotel hotel;


    public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHotelid() {
        return hotelid;
    }

    public void setHotelid(Integer hotelid) {
        this.hotelid = hotelid;
    }

    public String getHoteltype() {
        return hoteltype;
    }

    public void setHoteltype(String hoteltype) {
        this.hoteltype = hoteltype == null ? null : hoteltype.trim();
    }

    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl == null ? null : imgurl.trim();
    }

    public Integer getImgtype() {
        return imgtype;
    }

    public void setImgtype(Integer imgtype) {
        this.imgtype = imgtype;
    }

    public String getHotelintroduce() {
        return hotelintroduce;
    }

    public void setHotelintroduce(String hotelintroduce) {
        this.hotelintroduce = hotelintroduce == null ? null : hotelintroduce.trim();
    }
}