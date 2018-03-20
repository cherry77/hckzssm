<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <link type="text/css" rel="stylesheet" href="http://js2.znimg.com/c/??bass.css?20140606">
<link href="http://js2.znimg.com/c/u/??userbass.css,noteuser.css,hoteluse.css,jquery-ui-1.10.4.min.css?20140606" rel="stylesheet" type="text/css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/base.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/head.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/window.css">
    
    
  </head>
  
  <body>
   <div class="userside">
    <div class="usernav" id="order_usernav">
      <div class="navmain"><a class="" href="/user/">会员中心首页</a></div>
      
      <dl class="" id="menu_item_a">
        <dt class=""><p>酒店订单</p></dt>
        <!-- <dd>
          <ul>
            <li class="" id="menu_li_a1" sid="order_hotel_list"> <a href="/user/order/list_hotel.html">酒店订单</a></li>
            <li class="" id="menu_li_a3" sid="comment_index"><a href="/user/comment.html">酒店点评</a></li>
            <li class="" id="menu_li_a4" sid="member_myphoto"><a href="/user/myphoto.html">酒店照片</a></li>
            <li class="" id="menu_li_a5" sid="question_index"><a href="/user/question.html">酒店问答</a></li>
            <li class="" id="menu_li_a6" sid="member_myhotel"><a href="/user/myhotel.html">常住酒店</a></li>
          </ul>
        </dd> -->
      </dl>
	  <!-- <dl id="menu_item_a">
        <dt class=""><p>度假订单</p></dt>
        <dd>
          <ul>
            <li class="" id="menu_li_a2"><a href="http://dujia.zhuna.cn/myorder.html">订单列表</a></li>
			<li class="" id="menu_li_a2"><a href="http://dujia.zhuna.cn/mycoupon.html">我的优惠券</a></li>
			<li class="" id="menu_li_a2"><a href="http://dujia.zhuna.cn/mycomment.html">我的评论</a></li>
          </ul>
        </dd>
      </dl> -->
     <!--  <dl class="" id="menu_item_b">
        <dt class=""><p>其他订单</p></dt>
        <dd>
          <ul>
            <li class="menu_li" id="menu_li_b1" sid="manage_myorders"> <a href="http://guoji.zhuna.cn/manage/myorders">国际酒店</a></li>
            <li class="" id="menu_li_b2" sid="order_kezhan_list"><a href="/user/order/list_kezhan.html">客栈订单</a></li>
            <li class="menu_li" id="menu_li_b3"><a href="http://duanzu.zhuna.cn/index.php?m=accounts.order">短租订单</a></li>
          </ul>
        </dd>
      </dl> -->
      <dl class="" id="menu_item_c">
        <dt class=""><p>账户信息</p></dt> 
        <dd>
          <ul>
            <li class="" id="menu_li_c1" sid="member_moneydetails"><a href="/user/money/details.html">账户明细</a></li>
            <li class="" id="menu_li_c2" sid="member_coupondetails"><a href="/user/coupon/list.html">消费劵明细</a></li>
            <li class="" id="menu_li_c3" sid="member_applycash"><a href="/user/applycash.html">申请提现</a></li>
            <li class="" id="menu_li_c4" sid="member_moneylist"><a href="/user/money/list.html">提现记录</a></li>
          </ul>
        </dd>
      </dl>
      <dl class="" id="menu_item_d">
      <dt class=""><p>个人信息</p></dt>
      <dd>
          <ul>
            <li class="" id="menu_li_d2" sid="password_modify"><a href="/user/passwd/modify.html">修改密码</a></li>
            <li class="" id="menu_li_d3" sid="member_modinfo"><a href="/user/modinfo.html">修改资料</a></li>
            <li class="" id="menu_li_d5" sid="member_modtel"><a href="/user/modtel.html">修改手机号</a></li>
            <li class="" id="menu_li_d4"><a href="/user/logout.html">退出</a></li>

          </ul>
        </dd>
    </dl>
    </div>
    <div class="left_note">
      <ul>
        <li><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="img_a"></li>
        <li id="bottom_float_service" t="1">
            <a href="javascript:void(0);"><img src="http://tp1.znimg.com/v5/images/blank.gif" width="1" height="1" class="img_b"></a>
        </li>
      </ul>
    </div>
  </div>
  </body>
</html>
