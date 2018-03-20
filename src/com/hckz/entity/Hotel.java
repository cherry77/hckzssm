package com.hckz.entity;

import java.util.List;

public class Hotel {
    private Integer hotelid;

    private String hotelname;

    private String hotelphone;

    private String hotelposition;

    private String hotelimgurl;

    private Long lowprice;

    private Integer positionid;

    private String hoteltype;

    private String cityname;

    private Boolean commend;

    private Integer clickcount;

    private Long baseprice;

    private Long sellprice;

    private String description;

    private Integer sellcount;

    private Integer uploadfile;
    
    private List<Hoteldetails> hoteldetails;
    
    private List<Room> rooms;
    
    

    public List<Hoteldetails> getHoteldetails() {
		return hoteldetails;
	}

	public void setHoteldetails(List<Hoteldetails> hoteldetails) {
		this.hoteldetails = hoteldetails;
	}

	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	public Integer getHotelid() {
        return hotelid;
    }

    public void setHotelid(Integer hotelid) {
        this.hotelid = hotelid;
    }

    public String getHotelname() {
        return hotelname;
    }

    public void setHotelname(String hotelname) {
        this.hotelname = hotelname == null ? null : hotelname.trim();
    }

    public String getHotelphone() {
        return hotelphone;
    }

    public void setHotelphone(String hotelphone) {
        this.hotelphone = hotelphone == null ? null : hotelphone.trim();
    }

    public String getHotelposition() {
        return hotelposition;
    }

    public void setHotelposition(String hotelposition) {
        this.hotelposition = hotelposition == null ? null : hotelposition.trim();
    }

    public String getHotelimgurl() {
        return hotelimgurl;
    }

    public void setHotelimgurl(String hotelimgurl) {
        this.hotelimgurl = hotelimgurl == null ? null : hotelimgurl.trim();
    }

    public Long getLowprice() {
        return lowprice;
    }

    public void setLowprice(Long lowprice) {
        this.lowprice = lowprice;
    }

    public Integer getPositionid() {
        return positionid;
    }

    public void setPositionid(Integer positionid) {
        this.positionid = positionid;
    }

    public String getHoteltype() {
        return hoteltype;
    }

    public void setHoteltype(String hoteltype) {
        this.hoteltype = hoteltype == null ? null : hoteltype.trim();
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname == null ? null : cityname.trim();
    }

    public Boolean getCommend() {
        return commend;
    }

    public void setCommend(Boolean commend) {
        this.commend = commend;
    }

    public Integer getClickcount() {
        return clickcount;
    }

    public void setClickcount(Integer clickcount) {
        this.clickcount = clickcount;
    }

    public Long getBaseprice() {
        return baseprice;
    }

    public void setBaseprice(Long baseprice) {
        this.baseprice = baseprice;
    }

    public Long getSellprice() {
        return sellprice;
    }

    public void setSellprice(Long sellprice) {
        this.sellprice = sellprice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getSellcount() {
        return sellcount;
    }

    public void setSellcount(Integer sellcount) {
        this.sellcount = sellcount;
    }

    public Integer getUploadfile() {
        return uploadfile;
    }

    public void setUploadfile(Integer uploadfile) {
        this.uploadfile = uploadfile;
    }
}