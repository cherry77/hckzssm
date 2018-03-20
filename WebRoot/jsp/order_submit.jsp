<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link href="http://public.kezhan.znimg.com/www/default/css/??base.css,head.css,window.css,order.css" type="text/css" rel="stylesheet">
	<link rel="shortcut icon" href="#">
</head>
<body>
<div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;"></div><div class="order_head">
   <div class="o_main">
  
    <div class="o_login">
    <c:choose>
    	 <c:when test="${customer.customerid>0 }">
    	 <div id="login_html"><p class=" f_right">
    	 <img src="imag/menghuanzhilv.jpg" width="25" height="25">
    	 <a class="cursor" id="header_login">${customer.customerphone }</a><span>|</span><a href="#">退出</a></p></div>
    	 </c:when>
    	 <c:otherwise>
    	 	<div id="login_html">
    	 	<p class=" f_right"><a class="cursor" id="header_login">登录</a><span>|</span><a href="#">注册</a></p></div>
    	 </c:otherwise>
    </c:choose>
        </div>
       </div>
    <div class="logo"> <a href="#"><img src="#" width="160" height="64"></a> </div>
  </div>

<!--订单成功提交页面-->
<div class="orderbox">
  <div class="o_list">
    <div class="o_listbox">
    <div class="o_suessedbox">
    
      <div class="o_suessed"> 
       
        <!--成功提交页面-->
        <h3>您的预订提交成功</h3>
        <p class="suess_a"><em>张宇</em> 先生/女士：感谢您选择住哪网，稍后您将收到订单确认短信</p>
        <p class="suess_b"><a href="javascript:;;">
        <i class="sq" id="order_more"></i></a>注意事项：为保证您的顺利入住，请到达酒店时，报预订时填写的入住人姓名，并持有效证件办理入住。</p>
      </div>   
      <div class="roomtips" style="">
       <h4>
        注意事项     
            如您选择的房间保留时间超过<strong>18点</strong>，建议您在入住日<strong>18点前</strong>与酒店联系确认房间保留时间
            如果您的旅行计划有变动请致电 <strong>400-888-8888</strong> 转 2 修改或取消订单
            如果您需要延住酒店，请致电 <strong>400-888-8888</strong> 转 1 延长订单
        </h4>
        </div>
	</div>
   
      <div class="o_note o_notelist">
        <dl>
          <dt>订单编号：</dt>
          <dd> <strong class="bianhao">11111111</strong> </dd>
        </dl>
        <dl class="message_a">
          <dt>酒店前台付款：</dt>
          <dd> <span class="room_pricetips"> <sub>￥</sub> <strong>436</strong> </span> </dd>
        </dl>
        <!-- <dl class="message_b">
          <dt>入住奖赏：</dt>
          <dd>
            <ul class="inbox">
                          <li>
                <div class="in_tips"> 照片奖金 </div>
                <div class="in_note">手机上传酒店照片通过审核后，可以获得最高 <span class="f_f00">9</span> 元的照片奖金。</div>
              </li>
            </ul>
          </dd>
        </dl> -->
        <dl>
          <dt>其他操作：</dt>
          <dd>
            <p class="other_note"><a id="check_order" href="selectOrder?customerid=${user.customerid }">查看订单</a></p>
            <p class="other_note"><a id="check_order" href="#">修改订单</a></p>
            <p class="other_note"><a id="check_order" href="#">取消订单</a></p>
            <p class="other_note"><a href="#">打印订单</a></p>
          </dd>
        </dl>
      </div>
  
      <div class="clearfloat"></div>
           <!--  <div class="o_nav">接下来您还可以 </div> -->

      <div class="otips">
       <!-- <div class="o_talk f_right">
                <a href="http://www.itouchchina.com/products/ditietong" target="_blank">
                	<img src="http://public.kezhan.znimg.com/www/default/images/demob.jpg" width="380" height="200"></a>

        </div>
        <div class="o_talk f_left">
                <a href="http://m.zhuna.cn/special/mobile/iphone.html" target="_blank">
                	<img src="http://public.kezhan.znimg.com/www/default/images/demoa.jpg" width="380" height="200"></a>

        </div> -->
      </div>
    </div> 
  </div>  
  <div class="o_side">
   <%-- <c:forEach items="${selectSubmit }" var="item1">
   <c:forEach items="${item1.rooms }" var="item2"> --%>
    <div class="side_name">
      <dl>
        <dt><img src="http://tp1.znimg.com//hotel_images/7269/160x120_20101401_0_8_1018_1.jpg" alt="床[客人实拍]" height="75" width="100"></dt>
        <dd>
          <h3><a href="#" target="_blank">${item1.hotel.hotelname }</a></h3>
          <p>${item1.hotel.hotelposition }</p>
        </dd>
      </dl>
    </div>
    <div class="side_note">
      <h3 id="rid_pid"></h3>
      <ul id="roomDescription">
        <li>房型：${item2.roomType }</li>
        <li>加床：不提供加床服务</li>
        <li>楼层：1-8层</li>
        <li class="last_li">宽带：有(收费)</li>
      </ul>
    </div>
   <%--  </c:forEach>
    </c:forEach> --%>
    <div class="order_help">
      <h3>需要帮助?</h3>
      <ul>
        <li><a href="javascript:;;" class="tips_a" id="help">常见问题<img src="http://tp1.znimg.com/images/blank.gif" height="1" width="1"></a></li>
        <li class="ques_tips" style="display:none;">
          <div class="ques_list">
            <h3><span>问：</span>我不是住哪网会员能预订吗？ </h3>
            <h4><span>答：</span><font>可以的。填好入住信息并点击'提交订单'就可以了。</font></h4>
          </div>
          <div class="ques_list">
            <h3><span>问：</span>我不是住哪网会员能获得返现吗？ </h3>
            <h4><span>答：</span><font>可以的。提交订单后，我们将自动为您创建现金账户
   （预订后密码会发送到您的手机上），并返还相应现金。</font></h4>
          </div>
          <div class="ques_list">
            <h3><span>问：</span>我不是住哪网会员能预订吗？ </h3>
            <h4><span>答：</span><font>可以的。请您注意在填写预订单时，填写实际入住
    的客人姓名。</font></h4>
          </div>
          <div class="ques_list">
            <h3><span>问：</span>我不是住哪网会员能预订吗？ </h3>
            <h4><span>答：</span><font>请在提交订单后致电400-666-5511，视酒店情况安排。</font></h4>
          </div>
        </li>
        <li><a href="javascript:;;" id="order_service" class="tips_b">在线客服</a></li>
        <li>
          <p class="tips_c">400-666-5511</p>
        </li>
      </ul>
    </div>
  </div></div>

<!-- 百度访问分析代码，请勿去掉-->
<!-- <script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Feac0c3863f9fda1a2681e8f1c2d552c5' type='text/javascript'%3E%3C/script%3E"));
</script><script src=" http://hm.baidu.com/h.js?eac0c3863f9fda1a2681e8f1c2d552c5" type="text/javascript"></script>

 -->

<!-- <script language="javascript">document.domain="zhuna.cn";</script>
<script type="text/javascript">
var index_url='http://www.zhuna.cn/';
var static_url ="http://public.kezhan.znimg.com/";
var header_index_url='http://www.zhuna.cn/';
var header_static_url  = 'http://public.kezhan.znimg.com/';
</script>
<script src="http://public.kezhan.znimg.com/??common/js/jquery-1.8.2.js,js/jquery-plugin/ui/minified/jquery.cookie-min.js,js/jquery-plugin/jquery.pagination-min.js,common/js/ued-core.js,common/js/ued-main.js,www/default/js/dialog_login.js,www/default/js/header.js,www/default/js/ntalker.js,www/default/js/footer.js,common/html/cityPicker/data.js" type="text/javascript"></script>
<script src="http://public.kezhan.znimg.com/order/??default/js/order_result.js" type="text/javascript"></script>
<script>
	order_result.init();
</script> -->

<!--百分点代码：购买成功页-->
﻿<!-- <script type="text/javascript">
	var user_id = $.cookie('ZhuNaUserID');  
	if(user_id ==null){
		user_id=0;
	}
	window["_BFD"] = window["_BFD"] || {};
	_BFD.BFD_INFO = {
		"order_id" : "244722205",   //当前订单号，如果有拆单等特殊情况现象（一次购买中出现多个订单号）此页面代码不可用，请联系我修改；
		"order_items" : [["7269",436,1]],   //同购物车页
		"total" : "436",   //用户实际支付的价格
		"user_id" : user_id, //网站当前用户id，如果未登录就为0或空字符串
		"page_type" : "order" //当前页面全称，请勿修改
	};	
	</script> -->
</html>