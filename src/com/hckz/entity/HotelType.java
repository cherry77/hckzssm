package com.hckz.entity;

import javax.persistence.Entity;

@Entity
public class HotelType {
    private Integer hoteltypeHotelid;

    private String hoteltype;

    public Integer getHoteltypeHotelid() {
        return hoteltypeHotelid;
    }

    public void setHoteltypeHotelid(Integer hoteltypeHotelid) {
        this.hoteltypeHotelid = hoteltypeHotelid;
    }

    public String getHoteltype() {
        return hoteltype;
    }

    public void setHoteltype(String hoteltype) {
        this.hoteltype = hoteltype == null ? null : hoteltype.trim();
    }
}