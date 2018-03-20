<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link href="http://public.kezhan.znimg.com/www/default/css/??base.css,head.css,window.css" type="text/css" rel="stylesheet">
<style>
.search{
width:70px; height:26px; line-height:26px; background:#f90; font-size:12px; color:#FFF; cursor:pointer; float:left; margin-left:10px; font-size:14px;
}
</style>

<div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;">
</div>
		<div class="head">
    <div class="son_head main">
        <div class="phone_400">
            <dl>
                <dt> <a target="_blank" href="#" class="phone"><img src="http://public.kezhan.znimg.com/www/default/images/blank.gif" width="1" height="1">手机版</a> </dt>
                <dt> <a class=""><img src="http://public.kezhan.znimg.com/www/default/images/blank.gif" width="1" height="1">微信版</a> </dt>
                <dd>
                    <span>400-888-8888</span>
                    <p>24小时预订热线</p>
                </dd>
                <div style="display:none;left:12px;top: 56px;" class="quickmark  " id="showweixin">
				<img width="190" height="190" src="http://public.kezhan.znimg.com/www/default/images/weixin_pic.jpg" alt="">
				<dl><dt>您的随身酒店预订专家</dt>
					<dd>扫描上方二维码关注住哪微信</dd>
				</dl>
				<span class="quickmark_jt2"></span></div>
            </dl>
        </div>
        <div class="searchbox">
            <div class="topsearch">
           <form:form action="selectHotel" modelAttribute="hotel"  id="searchResult_form" method="post">
                <input name="" type="button" id="head_searchResult" class="searchbtu">
                <input name="hotelname" type="text" id="head_query" autocomplete="off" class="searchtext city_target"  value="城市、酒店名称">
                <input  type="submit" value="搜索" class="search"/>
            </form:form>
       </div>
            <input id="head_search_flag" value="0" type="hidden">
            <input id="head_ecity_id" value="0" type="hidden">
            <input id="head_source_id" value="0" type="hidden">
            <input id="head_type_id" value="0" type="hidden">
            
            <div class="logo"> <a href="#"><img src="红尘客栈logo" width="160" height="64">红尘客栈</a> </div>
        </div>
    </div>
    <div class="navbox">
        <div class="main">
            <div class="mylogin ">
                <div class="f_right myorder"> <a class="my_header cursor">我的订单<img src="http://tp1.znimg.com/v5/images/blank.gif" height="1" width="1"></a>
                    <div class="myorder_list" style="display:none">
                        <ul>
                            <li class="order_a"> <a tourl="#" href="javascript:void(0);" rel="nofollow">国内酒店订单</a> </li>
                            <li class="order_c"> <a tourl="#" href="javascript:void(0);" rel="nofollow">短租公寓订单</a> </li>
                            <li class="order_d"> <a tourl="#" href="javascript:void(0);" rel="nofollow">民宿客栈订单</a> </li>
                            <li class="order_e"> <a tourl="#" href="javascript:void(0);" rel="nofollow">度假优选订单</a> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li><a href="/" class="nav_url">首页</a></li>
                    <li><a class="nav_url" href="/hotel/">国内酒店 </a></li>
                    <li><a class="nav_url" href="#">连锁品牌</a></li>
                    <li><a class="nav_url" href="#">民宿客栈</a></li>
		    <li><a class="nav_url" href="#" target="_blank">客户端</a></li>
		    <li><a class="nav_url" href="#">订酒店返现金</a>
       <img src="http://public.kezhan.znimg.com/www/default/images/new_tips.gif" width="22" height="14" class="new_tips"></li> 
                </ul>
            </div>
        </div>
    </div>
</div>

