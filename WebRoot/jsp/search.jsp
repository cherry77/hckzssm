<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="baidu-site-verification" content="JJJtA3V8zr">
	<link href="css/common.css" type="text/css" rel="stylesheet">
	<script type="text/javascript" src="My97DatePicker/WdatePicker.js" ></script> 


<!--百度页头访问分析代码，请勿去掉 -->
<script type="text/javascript">
     var _bdhm_top = 0;
     var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
     var _bdhm_tim = new Image(1,1);
     _bdhm_tim.id = "bdhmPerimg";
     _bdhm_tim.src = _bdhmProtocol + "hm.baidu.com/_tt.gif?si=eac0c3863f9fda1a2681e8f1c2d552c5&amp;rnd=" + Math.round(Math.random()*2147483647);
     _bdhm_tim.onload=function(){_bdhm_top = 1;}
</script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/zh_cn.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="lang"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/chat.in.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="chatManage"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt31.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="MQTT"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt.chat.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="Connection"></script>
</head>
	</head>
	<body>
	
	  
<!--此处放头部页面 开始-->
		<jsp:include page="top.jsp"></jsp:include>   
<div id="login_htmls">
         <c:choose>
                <c:when test="${customer.customerid>0 }">
                <ul class="myhome">
	                <li><img src="imag/menghuanzhilv.jpg" width="25" height="25"></li>
					<li><em><a >${customer.customerphone }</a></em></li> 
					<li><span>|</span></li>
					<li><a>退出</a></li>
                </ul>
                </c:when>
                <c:otherwise>
                <ul class="login">
                    <li><a class="">登录</a></li>
         			<li><span>|</span><a>注册</a></li>
                </ul>
                </c:otherwise>               
             </c:choose>               		
 </div> 
<!--此处放头部页面 结束-->
		<!-- <div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;"></div><div class="head">
 -->
 <div class="container">
	<!--顶部搜索框banner start-->
	<div class="index_bannerbox mt_25">
    	<div class="index_bannerbg">
        	<div class="index_bannerpic">
            	<ul id="slides_container">
                    <li class="slide" style="display: list-item;">
                    	<a href="#" target="_blank"><div class="banner_pic" style="background:url(imag/beiwei18.jpg) center center no-repeat;"></div></a>
		             <div class="index_bannerri">
                            <ul>
                                <li><a href="#" target="_blank"><img src="imag/xingzoudechengshi.jpg" width="180" height="175"></a></li>
                                <li><a href="#" target="_blank"><img src="imag/dishining.jpg" width="180" height="175"></a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="slide" style="display: none;">
                    	<a href="#" target="_blank"><div class="banner_pic" style="background:url(imag/kezhanzuifengfengkuang.jpg) center center no-repeat;"></div></a>
                        <div class="index_bannerri">
                            <ul>
                                <li><a href="#" target="_blank"><img src="imag/kaochangzhoubian.jpg" width="180" height="175"></a></li>
                                <li><a href="#" target="_blank"><img src="imag/quanjiazongdongyuan.jpg" width="180" height="175"></a></li>
                            </ul>
                        </div>
                    </li>
                    
                    
                    
                </ul>
            </div> 
            <div class="index_banner">
            	<div class="index_bannercon">
                	<div class="index_seabgbox">
                    	<div class="index_seabg"></div>
                    	<div class="index_sea">
                        	<div class="index_seatitle">
                            	<h1>酒店预订</h1>
                                <!-- <span>实时搜索<i>915</i>个城市，<i id="zn_hotel_total_num">152051</i>家酒店报价信息</span> -->
                            </div>
                            <ul>
                            <form action="#" method="post" name="aForm" id="aForm">
                                <li>
                                    <label>目的地</label>
                                    <div class="inputbox">
                                        <input type="text" value="北京" name="cityname" class="text ued_city_input city_target" id="city" autocomplete="Off">
                                       	<input value="0101" name="ecityid" type="hidden" id="cityId">
		                                <input id="w_hid" type="hidden" name="hid">
		                                <input id="w_mapbarid" type="hidden" name="mapbarid">
		                                <input id="bid" type="hidden" name="cbdid">
		                                
		                                <input id="canton" type="hidden" name="areaid">
                                        <span class="city_ico"></span>
                                    </div>
                                </li>
   <li>
       <label>日  &nbsp;&nbsp;&nbsp;期</label>
       <!-- 	<div class="datebox" id="ued_datePicker_view"> -->
       <div class="datebox" >
               <div class="inputdate">
                   <div class="in">
                   	<span>入住</span>
                      <!--  <input type="text" name="tm1" value="2017-08-10" id="ued_datePicker_start" class="ued_datePicker_start date" autocomplete="Off" thismseconds="1502294400000"> -->
                    <input type="text" id="start" name="tm1"  class="date Wdate"  onclick="WdatePicker()">
                   </div>
                   <p class="line">—</p>
                   <div class="out">
                   	<span>离店</span>
                      <!--  <input type="text" name="tm2" id="ued_datePicker_end" class="ued_datePicker_end date Wdate"  onclick="WdatePicker()" value="2017-08-11" autocomplete="Off" thismseconds="1502380800000"> -->
                       <input type="text" id="end" name="tm2" class="date Wdate"  onclick="WdatePicker()">
                   </div>
               </div>
               <strong>
                  	<i id="how_day"></i>
               </strong>
           </div>
   </li>
   <script type="text/javascript">
       var sDom=document.getElementById("start");
       var eDom=document.getElementById("end");
	   var resultDom=document.getElementById("how_day");
       var num;
	   eDom.onblur=function(){
	      var value1=sDom.value;
		  var value2=eDom.value;
		  var arr=[];
		  var brr=[];
		    arr=value1.split("-");
			brr=value2.split("-");
		 
		      num =(brr[1]-arr[1])*30+(brr[2]-arr[2])*1;
		  		resultDom.innerHTML="共&nbsp;"+num+"&nbsp;晚";
	   
	   }
	   </script>
                                <li>
                                    <label>关键词</label>
                                    <div class="inputbox">
                                        <input type="text" value="酒店名称 / 品牌 / 位置" class="text hot_key_target" name="q" id="key" autocomplete="Off">
                                    </div>
                                </li>
                                <li class="input_but">
                                    <strong id="find_hotel"></strong>
                                    <input type="submit" value="立即搜索" class="but" id="home_search_button" style="width:70px; height:26px; line-height:26px; background:#f90; font-size:12px; color:#FFF; cursor:pointer; float:left; margin-left:10px; font-size:14px;">
                                </li>
                               </form>
                            </ul>
                        </div>
                    </div>                     
                    
                </div>
                <div class="banner_focus">
                    <ol class="slidetablist">
                        <li class="cur"></li>
                        <li class=""></li>
                    </ol>
                </div>  
            </div>     
        </div>      
    </div>
    <!--顶部搜索框banner end-->
    <div class="index_main">
    	<!--左侧stat-->
    	<div class="indexmain_le">
            <!--猜您喜欢start-->
            <div class="like_hotel mt_30">
            	<div class="like_title">
                	<h3>猜您喜欢</h3>
                    <a href="#"></a>
                </div>
                <div class="like_list">
                <c:forEach items="${list}" var="hotel">
                	<dl>
                    	<dt><a href="#"><img src="${hotel.hotelimgurl }" width="210" height="158"></a></dt>
                        <dd><a href="#">${hotel.hotelname }</a></dd>
                        <dd><span class="adderss">${hotel.hotelposition } </span></dd>
                        <dd><p><i>￥</i><em>${hotel.lowprice }</em><strong>起</strong></p><a href="hotelDetails?hotelid=${hotel.hotelid}" class="but">去看看</a></dd>
                    </dl>  
                  </c:forEach>       
                </div>
            </div>
            <!--热门酒店start-->
            <div class="hot_hotel mt_30">
                <div class="hot_hoteltitle">
                    <h3>精选酒店</h3>
                    <ul id="hot_city_hotel">
                        <li class="cur" _c="BJ"><a href="javascript:void(0);">北京</a></li>
                        <li _c="SH"><a href="javascript:void(0);">上海</a></li>
                        <li _c="GZ"><a href="javascript:void(0);">广州</a></li>
                        <li _c="SZ"><a href="javascript:void(0);">深圳</a></li>
                        <li _c="CD"><a href="javascript:void(0);">成都</a></li>         
                    </ul>
                    <span><a target="_blank" href="#">更多》</a></span>
                </div>
                
                <div class="hot_hotellist">
                    <div class="hotellist_le">
                        <a href="#" target="_blank" class="spe"><img src="imag/menghuanzhilv.jpg" width="240" height="330"></a>
                    </div>
                        <div class="hotellist_ri ">
                                                                                    
                            <ul class="hot_city_hotel" id="hotel_city_BJ">
                            
                            <c:forEach items="${listBJ}" var="hotel">
                               <li>
                                    <div class="pic">
                                        <a target="_blank" title="${hotel.hotelname }" href="#">
                                        <img src="${hotel.hotelimgurl }">
                                        </a>
                                    </div>
                                    <div class="hot_text">
                                        <span>
                                        	<a target="_blank" title="${hotel.hotelname }" href="#">${hotel.hotelname }</a>
                                        </span>
                                        <p>
                                            <i>￥</i>
                                            <em>${hotel.lowprice }</em>
                                            <strong>起</strong>
                                        </p>
                                    </div>
                                </li>
                                </c:forEach>  
                                
                              </ul>
                                <ul class="hot_city_hotel" id="hotel_city_SH" style="display:none">
                                 <c:forEach items="${listSH}" var="hotel">
                                   <li>        
                                    <div class="pic">
                                        <a target="_blank" title="${hotel.hotelname }" href="#">
                                        <img src="${hotel.hotelimgurl }">
                                        </a>
                                    </div>
                                    <div class="hot_text">
                                        <span>
                                        	<a target="_blank" title="${hotel.hotelname }" href="#">${hotel.hotelname }</a>
                                        </span>
                                        <p>
                                            <i>￥</i>
                                            <em>${hotel.lowprice }</em>
                                            <strong>起</strong>
                                        </p>
                                    </div>
                                </li> 
                                 </c:forEach>      
                                 </ul>
                                 <ul class="hot_city_hotel" id="hotel_city_GZ" style="display:none">
                                  <c:forEach items="${listGZ}" var="hotel">
                                    <li>
                                  
                                    <div class="pic">
                                        <a target="_blank" title="${hotel.hotelname }" href="#">
                                        <img src="${hotel.hotelimgurl }">
                                        </a>
                                    </div>
                                    <div class="hot_text">
                                        <span>
                                        	<a target="_blank" title="${hotel.hotelname }" href="#">${hotel.hotelname }</a>
                                        </span>
                                        <p>
                                            <i>￥</i>
                                            <em>${hotel.lowprice }</em>
                                            <strong>起</strong>
                                        </p>
                                    </div>
                                </li>
                                </c:forEach>                                                                
                                </ul>
                   		<ul class="hot_city_hotel" id="hotel_city_SZ" style="display:none">
                          <c:forEach items="${listSZ}" var="hotel">         
						<li>
                                    <div class="pic">
                                        <a target="_blank" title="${hotel.hotelname }" href="#">
                                        <img src="${hotel.hotelimgurl }">
                                        </a>
                                    </div>
                                    <div class="hot_text">
                                        <span>
                                        	<a target="_blank" title="${hotel.hotelname }" href="#">${hotel.hotelname }</a>
                                        </span>
                                        <p>
                                            <i>￥</i>
                                            <em>${hotel.lowprice }</em>
                                            <strong>起</strong>
                                        </p>
                                    </div>
                                </li>
                                   </c:forEach>                               
                                  </ul>
                                  
                                    <ul class="hot_city_hotel" id="hotel_city_CD" style="display:none">
                                    <c:forEach items="${listCD}" var="hotel">   
                                     <li>
                                    <div class="pic">
                                        <a target="_blank" title="${hotel.hotelname }" href="#">
                                        <img src="${hotel.hotelimgurl }">
                                        </a>
                                    </div>
                                    <div class="hot_text">
                                        <span>
                                        	<a target="_blank" title="${hotel.hotelname }" href="#">${hotel.hotelname }</a>
                                        </span>
                                        <p>
                                            <i>￥</i>
                                            <em>${hotel.lowprice }</em>
                                            <strong>起</strong>
                                        </p>
                                    </div>
                                </li>
                            </c:forEach>                                    
                         </ul>       
                    </div>                    
                </div>
            </div>
            <!--热门酒店end-->
            
            <!--特色客栈start-->
            <div class="item_hotel mt_30">
                <div class="item_hoteltitle">
                    <h3>特色客栈</h3>
                    <ul id="kezhan_menu">
                        <li class="cur" _c="LJ"><a href="javascript:void(0);">丽江</a></li>
                        <li _c="WZ"><a href="javascript:void(0);">乌镇</a></li>
                        <li _c="XT"><a href="javascript:void(0);">西塘</a></li>
                        <li _c="FH"><a href="javascript:void(0);">凤凰</a></li>
                        <li _c="YS"><a href="javascript:void(0);">阳朔</a></li>
                    </ul>
                    <span><a target="_blank" href="#">更多》</a></span>
                </div>
                <div class="hot_hotellist">
                    <div class="hotellist_le">
                        <a href="#" target="_blank" class="spe"><img src="imag/hot_kezhan.jpg" width="210" height="330"></a>
                    </div>
                    <div class="hotellist_ri">
                        <ul class="kezhan_list" id="kezhan_city_LJ">
                        
                         <c:forEach items="${listLJ}" var="hotel">
                            <li>
                                <div class="pic"> 
                                	<a target="_blank" href="#"> <img src="${hotel.hotelimgurl }"> </a> 
                                </div>
                                <div class="hot_text"> 
                                	<span><a target="_blank" href="#" title="${hotel.hotelname }">${hotel.hotelname }</a></span>
                                	<p><i>￥</i><em>${hotel.lowprice }</em><strong>起</strong></p>
                                </div>
                            </li>
                            </c:forEach>
                           
                        </ul>
					    <ul class="kezhan_list" id="kezhan_city_WZ" style="display: none;">
					     <c:forEach items="${listWZ}" var="hotel">
                            <li>
                                <div class="pic"> 
                                	<a target="_blank" href="#"> <img src="${hotel.hotelimgurl }"> </a> 
                                </div>
                                <div class="hot_text"> 
                                	<span><a target="_blank" href="http://kezhan.zhuna.cn/room/29198" title="${hotel.hotelname }">${hotel.hotelname }</a></span>
                                	<p><i>￥</i><em>${hotel.lowprice }</em><strong>起</strong></p>
                                </div>
                            </li>
                            </c:forEach>
                           
                        </ul>
                   </div>
                </div>
            </div>
            <!--特色客栈end-->
            
            <!--微出行start-->
            <div class="period_special">
            	<div class="special_title">
                	<h3>微出行</h3>
                </div>
            	<div class="special_list">
                	<ul>
                    	<li><a href="#" target="_blank"><img src="imag/special_pic1.jpg"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/special_pic2.jpg"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/special_pic3.jpg"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/special_pic4.jpg"></a></li>
                    </ul>
                </div>
            </div>
            <!--往期专题end-->  
        </div>
        <!--左侧end-->

        <!--右侧stat-->
        <div class="indexmain_ri">
        	<!--手机住哪儿start-->
            <div class="app_des mt_30">
            	<div class="app_title">
                	<h3>红尘客栈</h3>
                    <span>比官网多返8-15元</span>
                </div>
                <div class="app_list">
                	<ul id="app_list_nav">
                    	<li app_url="#" class="android"></li>
                        <li app_url="#" class="app"></li>
                        <li class="message"></li>
                    </ul>
                </div>
            </div>
            <!--手机住哪儿end-->
        	<!--为您推荐start-->
            <div class="recommend mt_30">
            	<div class="recom_title">
                	<h3>为您推荐</h3>
                    <span id="recommend_menu">换一批</span>
                </div>
                <div class="recom_list">
                	<ul id="recommend_list">
                    	<li><a href="#" target="_blank"><img src="imag/recom_pic1.jpg" width="280" height="80"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/recom_pic2.jpg" width="280" height="80"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/recom_pic3.jpg" width="280" height="80"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/recom_pic4.jpg" width="280" height="80"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/recom_pic5.jpg" width="280" height="80"></a></li>
                        <li><a href="#" target="_blank"><img src="imag/recom_pic6.jpg" width="280" height="80"></a></li>
                    </ul>
                </div>
            </div>
            <!--为您推荐end-->
        	<!--品牌连锁start--> 
            <!-- <div class="brand_chain mt_30" id="index_tab_liansuo_content">
            	<div class="brand_title">
                	<h3>品牌连锁</h3>
                    <ul id="index_tab_liansuo_menu">
                    	<li class="cur" liansuo="jj"><a href="javascript:void(0);">经济</a></li>
                        <li liansuo="ss"><a href="javascript:void(0);">舒适</a></li>
                        <li liansuo="gd"><a href="javascript:void(0);">高档</a></li>
                        <li liansuo="hh"><a href="javascript:void(0);">豪华</a></li>
                    </ul>
                </div>
                <div class="brand_list pinpai_liansuo" id="brand_jj">
                	 <dl t="1" class="">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/1.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">如家快捷</a></li>
                                <li><i>1860</i>家酒店</li>
                                <li><em>37%</em>的用户选择预订如家</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl t="5">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/5.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">汉庭快捷</a></li>
                                <li><i>1319</i>家酒店</li>
                                <li><em>29%</em>的用户选择预订汉庭</li>
                            </ul>
                        </dd>
                    </dl>
                	<dl t="3">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/3.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">七天连锁</a></li>
                                <li><i>1635</i>家酒店</li>
                                <li><em>14%</em>的用户选择预订七天</li>
                            </ul>
                        </dd>
                    </dl>
                   
                    
                    
                    <dl t="4">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/4.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">速8</a></li>
                                <li><i>591</i>家酒店</li>
                                <li><em>8%</em>的用户选择预订速8</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div class="brand_list pinpai_liansuo" id="brand_ss">
                	<dl t="136">
	                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/136.gif" width="78" height="58"></a></dt>
	                        <dd>
	                        	<ul>
	                            	<li><a href="javascript:void(0);">智选假日酒店</a></li>
	                                <li><i>37</i>家酒店</li>
	                                <li><em>28%</em>的用户选择预智选假日</li>
	                            </ul>
	                        </dd>
	                </dl>
                    <dl t="85">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/85.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">宜必思酒店</a></li>
                                <li><i>72</i>家酒店</li>
                                <li><em>21%</em>的用户选择预订宜必思</li>
                            </ul>
                        </dd>
                    </dl>
                    
                    <dl t="36">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/36.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">神舟商旅</a></li>
                                <li><i>8</i>家酒店</li>
                                <li><em>22%</em>的用户选择预神舟商旅</li>
                            </ul>
                        </dd>
                    </dl>
                    
                    <dl t="29">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/29.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">山水时尚酒店</a></li>
                                <li><i>33</i>家酒店</li>
                                <li><em>19%</em>的用户选择预假日酒店</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div class="brand_list pinpai_liansuo" id="brand_gd">
                   <dl t="275">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/275.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">远景国际公寓</a></li>
                                <li><i>21</i>家酒店</li>
                                <li><em>34%</em>的用户选择预订远景国际</li>
                            </ul>
                        </dd>
                    </dl>
	                <dl t="126">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/126.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">假日酒店</a></li>
                                <li><i>59</i>家酒店</li>
                                <li><em>26%</em>的用户选择预订假日酒店</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl t="137">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/137.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">诺富特</a></li>
                                <li><i>34</i>家酒店</li>
                                <li><em>22%</em>的用户选择预订诺富特</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl t="84">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/84.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">戴斯酒店</a></li>
                                <li><i>60</i>家酒店</li>
                                <li><em>9%</em>的用户选择预订戴斯酒店</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div class="brand_list pinpai_liansuo" id="brand_hh">
                	<dl t="123">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/123.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">希尔顿酒店</a></li>
                                <li><i>22</i>家酒店</li>
                                <li><em>23%</em>的用户选择预订希尔顿</li>
                            </ul>
                        </dd>
                    </dl>
                    
                    <dl t="474">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/140.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">维景国际大酒店</a></li>
                                <li><i>22</i>家酒店</li>
                                <li><em>34%</em>的用户选择预订维景国际</li>
                            </ul>
                        </dd>
                    </dl>
                    
                    <dl t="295">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/295.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">首旅建国酒店</a></li>
                                <li><i>43</i>家酒店</li>
                                <li><em>23%</em>的用户选择预订首旅建国</li>
                            </ul>
                        </dd>
                    </dl>
                    <dl t="257">
                    	<dt><a href="javascript:void(0);"><img src="http://tp1.znimg.com/images/liansuo/200/257.gif" width="78" height="58"></a></dt>
                        <dd>
                        	<ul>
                            	<li><a href="javascript:void(0);">万豪行政公寓</a></li>
                                <li><i>4</i>家酒店</li>
                                <li><em>8%</em>的用户选择预订万豪行政</li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                
                
            </div> -->
            <!--品牌连锁end-->         
        	<!--主题客栈start--> 
            <div class="theme_hotel mt_30">
            	<div class="theme_title">
                	<h3>主题客栈</h3>
                </div>
                <div class="theme_list" id="kezhan_theme_list">
                	<dl>
                    	<dt>小资情结</dt>
                        <dd>
                        	<ul style="_width:250px;">   
                            	<li><span><a href="#">推窗观景</a></span><em>|</em></li>
                                <li><span><a href="#">夜生活丰富</a></span><em>|</em></li>
                                <li><span><a href="#">双桥逢源</a></span><em></em></li>
                                <li><span><a href="#">夜寐古宅</a></span><em>|</em></li>
                                <li><span><a href="#">烟雨漓江</a></span><em>|</em></li>
                                <li><span><a href="#">醉西洋</a><i></i></span></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>   
                    	<dt>文艺范儿</dt>
                        <dd>
                        	<ul>   
                            	<li><span><a href="#">品位纳西文化</a><i></i></span><em>|</em></li>
                                <li><span><a href="#">体验民间艺术</a></span><em>|</em></li>
                                <li><span><a href="#">洱海听夜</a><i></i></span></li>
                                <li><span><a href="#">漫步烟雨长廊</a></span><em>|</em></li>
                                <li><span><a href="#">酒吧邂逅</a></span><em>|</em></li>
                                <li><span><a href="#">古城街巷</a></span></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                    	<dt>远离喧嚣</dt>
                        <dd>
                        	<ul style="_width:240px;">    
                            	<li><span><a href="#">老街长长</a></span><em>|</em></li>
                                <li><span><a href="#">效仿陶渊明</a></span><em>|</em></li>
                                <li><span><a href="#">体验民宿</a></span><em></em></li>
                                <li><span><a href="#">农家乐</a></span><em>|</em></li>
                                <li><span><a href="#">背包客推崇</a><i></i></span><em>|</em></li>
                                <li><span><a href="#">徜徉竹海</a></span></li>
                            </ul>
                        </dd>
                    </dl>
                </div>
            </div>
            <!--主题客栈end--> 
        	<!--住哪工具箱start-->  
            <div class="toolbox">
                <div class="toolbox_title">
                	<h3>住哪工具箱</h3>
                </div>
                <div class="toolbox_list">
                    <ul>
                        <li class="zool_a">
                        	<a href="#" target="_blank">地铁线路</a>
                        </li>
                        <li class="zool_b">
                        	<a href="#" target="_blank">火车查询</a>
                        </li>
                        <li class="zool_c">
                        	<a href="#" target="_blank">住哪公交</a>
                        </li>
                        <li class="zool_d">
                        	<a href="#" target="_blank">天气预报</a>
                        </li>
                        <li class="zool_e">
                        	<a href="#" target="_blank">酒店问答</a>
                        </li>
                        <li class="zool_f">
                        	<a href="#" target="_blank">住宿指南</a>
                        </li> 
                    </ul>
                </div>
            </div>
            <!--住哪工具箱end-->           
        </div>
        <!--右侧end-->
    </div>
	<div style="text-align: center;margin: -5px 0px 10px 0px;"><a target="_blank" href="#" title=""><img src="" style="width:1180px color:red" alt=""></a></div>
</div>
<!--选择日期超过28天-->
<div class="date_note" style="display:none;">
	<span></span>
	<strong>如果您需要在酒店入住28晚以上，请致电<i>400-888-8888</i>红尘客栈竭诚为您服务。</strong>
</div>
<!--选择日期超过28天-->
 <jsp:include page="foot.jsp"></jsp:include>
</div> 
<!-- 百度访问分析代码，请勿去掉-->
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Feac0c3863f9fda1a2681e8f1c2d552c5' type='text/javascript'%3E%3C/script%3E"));
</script><script src=" http://hm.baidu.com/h.js?eac0c3863f9fda1a2681e8f1c2d552c5" type="text/javascript"></script>



<script type="text/javascript">
var php_self='index.php';
var base='http://public.kezhan.znimg.com/';
var base_v='http://public.kezhan.znimg.com/www/default/';
var index_url='http://www.zhuna.cn/';
var header_index_url='http://www.zhuna.cn/';
var thumb_url = 'http://img.klz.znimg.com/uploads/thumb/';
var static_url = 'http://public.kezhan.znimg.com/';
var header_static_url  = 'http://public.kezhan.znimg.com/';
</script>
<script src="http://public.kezhan.znimg.com/??common/js/jquery-1.8.2.js,js/jquery-plugin/ui/minified/jquery.cookie-min.js,js/jquery-plugin/jquery.pagination-min.js,common/js/ued-core.js,common/js/ued-main-min.js,www/default/js/dialog_login.js,www/default/js/header.js,www/default/js/ntalker.js,www/default/js/footer.js,common/html/cityPicker/data.js" type="text/javascript"></script><div class="w_placemain" id="city_input_searchtext" style="z-index: 100000; border: 1px solid rgb(232, 232, 232); display: none; width: 447px;"></div>
<script src="http://public.kezhan.znimg.com/www/default/js/??index.js,slide.js" type="text/javascript"></script>


<script type="text/javascript">
	zn_index.init();
</script>
<script type="text/javascript">
var ZhuNaUserID = $.cookie('ZhuNaUserID') ? $.cookie('ZhuNaUserID') : '';
	window["_BFD"] = window["_BFD"] || {};
	_BFD.BFD_INFO = {
	"user_id" : ZhuNaUserID, //网站当前用户id，如果未登录就为0或空字符串
	"page_type" : "homepage" //当前页面全称，请勿修改!!
	};
</script>
</html>
