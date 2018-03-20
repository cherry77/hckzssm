package com.hckz.entity;

import java.util.Date;

import javax.persistence.Entity;

@Entity
public class Comment {
    private Integer commentid;

    private Integer commentHotelid;

    private Integer commentCustomerid;

    private Integer commentRoomid;

    private String commentContent;

    private Date commentDate;

    public Integer getCommentid() {
        return commentid;
    }

    public void setCommentid(Integer commentid) {
        this.commentid = commentid;
    }

    public Integer getCommentHotelid() {
        return commentHotelid;
    }

    public void setCommentHotelid(Integer commentHotelid) {
        this.commentHotelid = commentHotelid;
    }

    public Integer getCommentCustomerid() {
        return commentCustomerid;
    }

    public void setCommentCustomerid(Integer commentCustomerid) {
        this.commentCustomerid = commentCustomerid;
    }

    public Integer getCommentRoomid() {
        return commentRoomid;
    }

    public void setCommentRoomid(Integer commentRoomid) {
        this.commentRoomid = commentRoomid;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent == null ? null : commentContent.trim();
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }
}