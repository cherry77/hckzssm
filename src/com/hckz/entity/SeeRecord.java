package com.hckz.entity;

import javax.persistence.Entity;


@Entity
public class SeeRecord {

	 /*当前产品名称*/
    private String hotelname;

    /*分页对象*/
   private Page page;

   
	public String getHotelname() {
	return hotelname;
	}

	public void setHotelname(String hotelname) {
	this.hotelname = hotelname;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}


}
