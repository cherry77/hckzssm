<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="http://js2.znimg.com/c/??bass.css?20140606">
<link type="text/css" rel="stylesheet" href="http://js2.znimg.com/c/u/??userbass.css,hoteluse.css?20140606">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/base.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/head.css">
<link type="text/css" rel="stylesheet" href="http://public.kezhan.znimg.com/www/default/css/window.css">
<script type="text/javascript" charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript"  charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript" id="seajsnode" src="http://js2.znimg.com/j/??sea.js,g/core/plugin-combo.js,g/core/plugin-flush.js,g/core/plugin-shim.js,g/core/plugin-text.js,g/lib/jquery-1.9.1.min.js,g/plug/cookies.js"></script>
<script type="text/javascript" src="http://tp1.znimg.com/javascript/thickbox-global.js"></script>
<script type="text/javascript" src="http://tp1.znimg.com/javascript/thickbox.js"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/zh_cn.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_013021" data-requiremodule="lang"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/chat.in.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_013021" data-requiremodule="chatManage"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt31.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_013021" data-requiremodule="MQTT"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt.chat.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_013021" data-requiremodule="Connection"></script>
</head>

<body>
<jsp:include page="top.jsp"></jsp:include> 
 <!--代码开始-->
<div class="userbody">
    <div class="hw_breadcrumb clear">
        <div id="breadCrumb">
            <div id="breadCrumb1">
                <a href="http://www.zhuna.cn/">首页</a>
                <span>/</span>
                <a href="/user/">我的会员中心</a>
                <span>/</span>
                <h1>会员中心首页</h1>
           </div>
       </div> 

    </div> 
<!--主题内容代码开始-->
<div class="usermain">
	<div class="usertop">
    	<strong>酒店订单</strong>
    </div>
    <div class="usermenu">
    	<ul>
        	<li><a href="/user/order/list_hotel.html" class="cur">全部订单</a></li>
        	<!-- <li><a href="/user/order/list_hotel.html?tid=5">新订单</a></li>
            <li><a href="/user/order/list_hotel.html?tid=6">处理中</a></li> -->
            <li><a href="/user/order/list_hotel.html?tid=1">已预订</a></li>
            <!-- <li><a href="/user/order/list_hotel.html?tid=2">已入住</a></li>
            <li><a href="/user/order/list_hotel.html?tid=7">已点评</a></li> -->
            <li><a href="/user/order/list_hotel.html?tid=3">无效单</a></li>
        </ul>
    </div>
    <div class="clearfloat"></div>
    <div class="hotel_order">
    	<ul class="hotel_orderbt">
        	<li class="hotel_orderbt1">酒店名称</li>
            <li class="hotel_orderbt2">预订房型</li>
            <li class="hotel_orderbt3">入住人</li>
            <li class="hotel_orderbt4">住店时间</li>
            <!-- <li class="hotel_orderbt5">奖金</li>
            <li class="hotel_orderbt6">担保</li> -->
            <li class="hotel_orderbt7">状态?</li>
            <li class="hotel_orderbt8">操作</li>
        </ul>
        <div class="clearfloat"></div>
     <c:forEach items="${orders }" var="orders">
     <c:forEach items="${orders.rooms }" var="rooms">   
        <ul class="hotel_ordercon">
        	<li class="hotel_ordercon1" ><a title="上海中祥大酒店" href="#" class="thickbox">${orders.hotel.hotelname }</a></li>
            <li class="hotel_ordercon2" >${rooms.roomType }</li>
            <li class="hotel_ordercon3" >${orders.customername }</li>            
            <li class="hotel_ordercon4">
            <%-- <fmt:formatDate value="${time}" pattern="yyyy-MM-dd HH:mm:ss"/>  --%>
            <fmt:formatDate value="${orders.intime }" pattern="MM.dd"/>-<fmt:formatDate value="${orders.outtime }" pattern="MM.dd"/></li>
            <!-- <li class="hotel_ordercon5">
            <span><i>¥</i>23</span></li>
            <li class="hotel_ordercon6">否</li> -->    
      <c:choose>
            	<c:when test="${orders.orderstate==1 }"> 
            		 <li class="hotel_ordercon7">
            		 <span class="thickbox">已预订</span></li>
            		 <li class="hotel_ordercon8">
            		 
            		 <a class="sngle" onclick="return confirm('您确认要取消订单吗？一旦取消无法恢复');"="" href="findOrderState?id=${orders.id}">取消订单</a></li>
        
            </c:when>
            	<c:when test="${orders.orderstate==0 }">
            	<li class="hotel_ordercon7">
            		 <span class="thickbox"><del>无效单</del></span></li>
            		 <li class="hotel_ordercon8">
            		 <a class="sngle" href="list">继续预订</a></li>
            	</c:when>
     </c:choose>
    </ul>
   
      </c:forEach>
      </c:forEach>
               
           </div>
        
</div>
<!--侧边栏代码开始-->

  <!--侧边栏代码结束-->

<!--主题内容代码结束-->
<!--代码结束-->
<script type="text/javascript">
    /* 
    $(document).ready(function(){
        var url = window.location.href;
        seajs.use('{url}z/src/bottom_float',function(init){});
        seajs.flush();  
        
    });
    */
</script>

<!--侧边栏代码开始-->
<jsp:include page="left.jsp"></jsp:include> 
  <!--侧边栏代码结束--> 
</div>

<script>
	$("#order_usernav dl dt").click(function(){
		var dl_class = $(this).parent('dl').attr('class');
		if(dl_class == 'cur'){
			$(this).parent('dl').removeClass();
		}else{
			$("#order_usernav dl").removeClass('cur');
			$(this).parent('dl').attr('class','cur');
		}
	});
</script>
<!--主题内容代码结束--> 
<!--代码结束-->
 <jsp:include page="foot.jsp"></jsp:include>
<!-- 左侧悬浮结束  -->

<script>//document.domain = 'zhuna.cn';</script>
<script type="text/javascript">
var header_index_url = 'http://www.zhuna.cn/';
var header_static_url = 'http://public.kezhan.znimg.com/';
</script>

<script type="text/javascript" src="http://public.kezhan.znimg.com/js/jquery-plugin/ui/minified/jquery.cookie-min.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/common/js/ued-core.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/common/js/ued-main.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/dialog_login.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/header.js"></script><div class="w_placemain" id="city_input_searchtext" style="z-index: 100000; border: 1px solid rgb(232, 232, 232); display: none; width: 447px;"></div>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/ntalker.js"></script>
<script type="text/javascript" src="http://public.kezhan.znimg.com/www/default/js/footer.js"></script>
<script language="JavaScript" type="text/javascript">  seajs.use(['z/src/hot_link.js']);  </script>

</body>
