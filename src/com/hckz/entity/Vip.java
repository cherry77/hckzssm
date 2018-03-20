package com.hckz.entity;

import javax.persistence.Entity;

@Entity
public class Vip {
    private Integer vipId;

    private Integer vipCustomerid;

    private String vipDegree;

    private Long vipDiscount;

    private Integer vipScore;

    private Integer vipHotelid;

    public Integer getVipId() {
        return vipId;
    }

    public void setVipId(Integer vipId) {
        this.vipId = vipId;
    }

    public Integer getVipCustomerid() {
        return vipCustomerid;
    }

    public void setVipCustomerid(Integer vipCustomerid) {
        this.vipCustomerid = vipCustomerid;
    }

    public String getVipDegree() {
        return vipDegree;
    }

    public void setVipDegree(String vipDegree) {
        this.vipDegree = vipDegree == null ? null : vipDegree.trim();
    }

    public Long getVipDiscount() {
        return vipDiscount;
    }

    public void setVipDiscount(Long vipDiscount) {
        this.vipDiscount = vipDiscount;
    }

    public Integer getVipScore() {
        return vipScore;
    }

    public void setVipScore(Integer vipScore) {
        this.vipScore = vipScore;
    }

    public Integer getVipHotelid() {
        return vipHotelid;
    }

    public void setVipHotelid(Integer vipHotelid) {
        this.vipHotelid = vipHotelid;
    }
}