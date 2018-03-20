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
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>红尘客栈北京西直门店_红尘客栈北京西直门店预订_价格_地址</title>
	<meta name="keywords" content="红尘客栈" />
	<meta name="description" content="红尘客栈" />
	<link href="css/common.css" type="text/css" rel="stylesheet">
	<link href="css/commentcss/info1.css" type="text/css" rel="stylesheet"/>
	<link href="css/commentcss/info2.css" type="text/css" rel="stylesheet" />
	<link type="text/css" rel="stylesheet" href="css/commentcss/info3.css">
	
	
	<!--百度页头访问分析代码，请勿去掉 -->
	<script  type="text/javascript">
	     var _bdhm_top = 0;
	     var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	     var _bdhm_tim = new Image(1,1);
	     _bdhm_tim.id = "bdhmPerimg";
	     _bdhm_tim.src = _bdhmProtocol + "hm.baidu.com/_tt.gif?si=eac0c3863f9fda1a2681e8f1c2d552c5&amp;rnd=" + Math.round(Math.random()*2147483647);
	     _bdhm_tim.onload=function(){_bdhm_top = 1;}
	</script> 
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

 
<div class="room_main">

		<!--面包屑start-->
		<c:forEach items="${listDetails}" var="hotel">
    	<div id="breadCrumb">
          <div id="breadCrumb1"> <a href="#">首页</a> <span>/</span> <a href="#">酒店预订</a><span>/</span>
				  <a href="#" id='cityArea'>酒店查询</a> <span>/</span>
		                    <a href="#">${hotel.hotelname }</a> <span>/</span>
                     <h1>${hotel.hotelposition }</h1>
           </div>
		 </div>
		  </c:forEach>
    	<!--面包屑end-->
	<!--详细页左侧start-->
	<div class="main_le">
    	<!--左侧酒店图片start-->
    	<div class="main_letop mt_15">
        	<div class="top_nav mt_10">
                <ul>
                <c:forEach items="${listDetails}" var="hotel">
                    <li><h2>${hotel.hotelname }</h2><!--<em>收藏</em>--></li>
                    <!--<li><strong class="star0"></strong></li>-->
                    <li><span id="address">位于${hotel.hotelposition } </span> </li>
		        </c:forEach>
		 </ul> 
                <ol>
                    <li><p id="min_price"></p></li>
                    <li><input type="button" id="preordain" hash="showt0-showt3" value="立即预订" name=""/></li>
                </ol>	
            </div>
            
           
            <div class="top_pic">
                <dl>
                 <c:forEach items="${listDetails}" var="hotel">
                    <dt>
                    	<p _big="${hotel.hotelimgurl }" style="background: url('${hotel.hotelimgurl }') 50% 50% no-repeat;"></p>
                    </dt>
                </c:forEach>
                    <dd>
                     <ul>
                       <c:forEach items="${listDetails}" var="hotel">
				        <c:forEach items="${hotel.hoteldetails}" var="hoteldetails">
                            <li class="head_last_pic"><p class="spe_pic" pic="0" _big="${hoteldetails.imgurl }" style="background: url('${hoteldetails.imgurl }');"></p></li>
                            
                         </c:forEach>
                </c:forEach>
                        </ul>
                    </dd>
                    
                </dl>
            </div>
            
        </div>
        <!--左侧酒店图片end-->
        <!--左侧酒店详细内容start-->
        <div class="main_lebot">
        	<div class="main_room">
                <a name="top" id="top"></a>
            	<div class="room_nav" style="position: relative; top: 0px; z-index:100">
                	<div class="room_navcon">
                    	<ul>
                        	<li class="cur" hash="showt0-showt3">酒店房型</li>                           
                            <li id="hotel_pic" hash="showt2">酒店图片</li>
                            <li id="hotel_comment" hash="showt3-showt5">酒店点评</li>
                            <li id="hotel_q" hash="showt4">问答</li>
                        </ul>
                    	<div style="display:none;" class="publish_sucess">
                            <strong></strong>
                            <span>您的回答已发表成功</span>
                        </div>
                    </div>
                	
                </div>
                <div class="main_roomcon">
                	<!----酒店房型start---->
                	<div class="roomtype" id ="showt0">
                        <div class="room_typenew" id="ued_datePicker">
                        	<dl>
                                 <dt>入住时段：</dt>
                                 <dd>
                                   <div class="eidt_box_b f_left">
                                    <div class="eidt_put"> <span>入住</span>
                                        <!-- <input type="text" readonly="readonly" class="ued_datePicker_start date" id="ued_datePicker_start" name="" > -->
                                         <input type="text" id="start" name="intime" value=""  class="date Wdate"  onclick="WdatePicker()">
                                        <i></i>
                                    </div>
                                   
                                    <div class="eidt_put"> <span>离店</span>
                                        <!-- <input type="text" readonly="readonly" class="ued_datePicker_end date" id="ued_datePicker_end" name="" >   -->
                                         <input type="text"  id="end" name="outtime" value="" class="date Wdate"  onclick="WdatePicker()">
                                        <i></i>
                                    </div>
                                    <span id="date_num" class="hotel_num f_left"></span>
                                </div>
<script type="text/javascript">
       var sDom=document.getElementById("start");
       var eDom=document.getElementById("end");
	   var resultDom=document.getElementById("date_num");
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
                                 <a id="confirmModifyDateBtn" class="edit_qd cursor">重新搜索</a>  
                                 </dd>
                            </dl>
                        </div>
                       <!--  <div class="roomtype_list"> -->
                        	<div class="roomtype_title">
                            	<ul>
                                	<li class="row1">房型</li>
                                	<li class="row2">早餐</li>
                                    <li class="row3">宽带</li>
                                    <li class="row4">取消政策</li>
                                    <li class="row5">房价</li>
                                    <!-- <li class="row6"></li> -->
                          </ul>
                            </div>
                            <div class="roomtype_rowlist">
							<div class="roomtype_rowbox">
						<c:forEach items="${listRoom}" var="hotel">
						<c:forEach items="${hotel.rooms}" var="roomList">
							<div class="roomtype_row">
						
							<dl><dt>
							<img width="67" height="51" src="${roomList.roomImgurl}">
							</dt>
							<dd>
							<p class="show_detail" rid="760091">
							<span class="text">${roomList.roomType}</span>
							<span class="ico"></span></p>
							<p><strong>22-24㎡</strong> | <em>三床</em></p></dd></dl>
						
							<div class="con_list"><ul class="noborder">
							<li class="row1"><p class="title">不含早.</p></li>
							<li class="row2"><span class="gray">无早</span></li>
							<li class="row3"><span class="green">免费WIFI</span></li>
							<li class="row4"><span class="green1 cancel_rule" v="">免费取消</span></li>
							<li class="row5"><p class="pri"><span>¥</span><strong date_o="" class="" unit="¥" bk="无早">${roomList.roomPrice}</strong></p></li>
							<li class="row6"><p class="back back_detail"><span>￥</span><strong>35</strong></p></li><li class="row7">
							
							<c:choose>
								<c:when test="${roomList.roomState==0}">
								<form action="" method="post">
									<input type="button" h="7269" r="1431376" p="14761" class="buybut buynone" value="维护中..." name=""></li>
								</form>
								</c:when>
								<c:when test="${roomList.roomState==1}">
								<form action="" method="post">
									<input type="button" h="7269" r="1431376" p="14761" class="buybut buynone" value="已预订" name=""></li>
								</form>
								</c:when>
								  <c:when test="${roomList.roomState==2}">
								<form action="order?roomRoomid=${roomList.roomRoomid}&hotelid=${hotel.hotelid}&customerid=${user.customerid}" method="post">
								<input type="submit"  class="buybut" value="可预订" ></li>
								</form>
								</c:when>
							</c:choose>
						</li>
						</ul>
						</div>
						</div>
						</c:forEach>								
						</c:forEach>	
						</div> 
                        </div>        
                    </div>
                    <!----酒店房型end---->
                  

                    <!----酒店详解start---->
                    <div class="hotel_detail" style="display:none" id="showt1">
						<img src="http://tp1.znimg.com/images/new/loading2.gif" />
                    </div>
                    <!----酒店详解end---->
                    
                    <!----酒店图片start---->
                  


                    <div class="hotel_picbox" style="display:none" id="showt2">
                    	<div class="hotel_pictype" style="display:none">
                        	<p class="le"></p>
                            <div class="type_box"><ul  style="left:0px;"></ul></div>
                            <p class="ri"></p>
                        </div>
                        
                        <div class="hotel_piclistbox">
                        	<div class="panorama" style="display:none;">
                            		<object   id="flashpool_new" ></object>
                            </div>
                        	<div class="hotel_piclist">
                            	<div class="que_loading"><img src="http://tp1.znimg.com/images/new/loading2.gif" /></div>
                            </div>
                        </div>
                        <!--分页开始-->
                        <div class="clearfloat"></div>
                        <div class="page"></div>
                        <!--分页结束-->
                    </div>
                    <!----酒店图片end---->
                    
                                       
                </div>
            </div>
        	
            <!--酒店政策start-->
                    	<div class="hotel_policy mt_30" id="showt0">
            	<h3>酒店政策</h3>
                                <ul style="display:block;">
                	                	<li>
                    	<strong>入住/离店</strong>
                        <p><span>入住时间：14:00以后&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离店时间：12:00以前</span></p>
                    </li>
                                                              <li>
                    	<strong>取消政策</strong>
                        <p>不同类型的客房附带不同的取消预订和预先付费政策 选择上述客房时，请参阅“客房政策”。</p>
                    </li>
                                         <li class="spe">
                    	                    	<div class="yajin" style="display:block;">
                        	<strong>押金/预付款</strong>
                            <div class="deposit">
                                <p>
                                    <span>入住时需要出示政府核发的身份证件(带照片)。请携带信用卡和现金用以支付押金或额外费用。</span>
                                </p>
                               
                            </div>
                        </div>
                                                <div class="more_info">
                        	<ul>
                            	                            	<li>
                                    <strong>膳食安排</strong>
                                    <p>自助早餐&nbsp;RMB&nbsp;18</p>
                                </li>
                                
                             	                                                                <li>
                                    <strong>宠物</strong>
                                    <p>不可携带宠物。</p>
                                </li>
                                                                                                <li>
                                    <strong>特殊条款</strong>
                                    <p>信用卡授权解除需时1-3个月。视不同国家、城市之银行操作时间而定。</p>
                                </li>
                                                                                              <li>
                                    <strong>刷卡付费</strong>
                                    <p>该酒店支持刷卡付费</p>
                                </li>
                                                            </ul>
                        </div>
                    </li>
                </ul>
                            </div>
                        <!--酒店政策end-->
            <!--酒店介绍start-->
        	<div class="hotel_introduce mt_30" id="showt0">
            	<h3>酒店介绍</h3>
                <p id ="show_content" style="display:block;">
                	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;红尘客栈(北京西直门店)位于北京展览馆/首都体育馆西城区西直门内大街126号(地铁4号线新街口地铁站D口出)，
                雅悦酒店(北京西直门店)预订电话：400-888-8888
                	</br>“红尘客栈”是商务连锁型酒店品牌，它以国际化的经营管理理念为先导，以国际商务连锁酒店的成功经验运作，提供优质服务，树立“雅之品味，悦之体验”的品牌形象。“雅悦酒店”的内景外观由香港专业酒店设计公司统一设计、统一装饰、风格雅致，环境温馨。<br />
　<span><i style="display:inline;">更多</i></span><span style="display:none;" id="hide_content">　酒店设有标准房、大床房等房型。房间的配备充分考虑到现代商务客人的需求，单独房间空调、安全消防系统、国际国内电话、卫星及闭路电视、写字台，酒店另有传真机、电子结账系统、宽带上网、复印、快递、火车票、机票预订，以及中式简餐等服务。<br />
　　酒店开业时间2007年12月26日，楼高8层，客房总数178间（套）。<i class="sq">收起</i></span></p>       
            </div>
            <!--酒店介绍end-->
           
            <!----酒店点评start---->
            <div class="room_review" id="showt3">
                        	<h3 id="showt0">酒店点评</h3>
                <div class="review_box m_bot20" >
                    <div class="review_con nobac">
                                              <ul>
                                                  <li>
                                                            <strong>4.4</strong><em>/5.0</em>
                                                        </li>
                            <li><span>来自<i>419</i>人评价</span></li>
                        </ul>
                        <p class="line">
                            <img src="http://public.kezhan.znimg.com/www/default/images/room/geduan.jpg" width="1" height="81" alt="">
                        </p>
                        <ol class="white">
                            <li>
                                <span>整洁卫生</span>
                                <strong ><i style="width:90%"></i></strong>
                                <em>4.5</em>
                            </li>
                            <li>
                                <span>设施装潢</span>
                                <strong class="star4.3"><i style="width:86%"></i></strong>
                                <em>4.3</em>
                            </li>
                            <li>
                                <span>服务质量</span>
                                <strong class="star4.5"><i style="width:90%"></i></strong>
                                <em>4.5</em>
                            </li>
                            <li>
                                <span>交通位置</span>
                                <strong class="star4.9"><i style="width:98%"></i></strong>
                                <em>4.9</em>
                            </li>
                        </ol>
                        <p class="line">
                            <img src="http://public.kezhan.znimg.com/www/default/images/room/geduan.jpg" width="1" height="81" alt="">
                        </p>
                        <dl>
                            <dt>住客印象</dt>
                            <dd>
                                                                                        <span>出行方便(330)</span>
                                                            <span>舒适(233)</span>
                                                            <span>安静(190)</span>
                                                            <span>经济(179)</span>
                                                            <span>优质服务(157)</span>
                                                            <span>温馨(85)</span>
                                                            <span>繁华地区(81)</span>
                                                            <span>高性价比(77)</span>
                                                            <span>超值(73)</span>
                            							                            </dd>
                        </dl>
                    </div>
                    <div class="review_title" id="showt0">
                        <strong>住客点评</strong>
                                                <span id="review_title_show" hash="showt3-showt5" >查看全部<i>419</i>条点评>></span>
                                            </div>
                    <div class="review_title" id="showt5" style="display:none;">
                        <strong>住客点评</strong>
                        <ul>
                            <li><input type="radio" name="comment" id="comment" value="2" checked="checked"/><span  value="2">全部<i>(419)</i></span></li>
                            <li><input type="radio" name="comment" id="comment" value="1" /><span value="1">好评<i>(398)</i></span></li>
                            <li><input type="radio" name="comment" id="comment" value="0" /><span value="0">中评<i>(20)</i></span></li>
                            <li><input type="radio" name="comment" id="comment" value="-1"/><span value="-1" >差评<i>(1)</i></span></li>
                            <li><input type="radio" name="comment" id="comment" value="3"/><span value="3">图片点评<i>(70)</i></span></li> 
                        </ul>
                    </div>
                    <div class="review_listbox">
                 		<div id="commentList">
                                                <div class="review_list">                        
                            <div class="review_listle">
                                <dl>
                                    <dt><img src="http://www.zhuna.cn/dianping/static/upload/user_info/363.jpg" width="20" height="20" /></dt>
                                    <dd>
                                        <ul>
                                            <li><strong>135****8326</strong></li>
                                            <li>街景房</li>
                                            <li><span>2017-05-21</span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="review_listri">
                                <span class="ico_note"></span>
                                <ul>
                                    <li><span class="yellow">"来自iphone的点评"</span></li>
                                    <li>
                                        <span class="con">位置非常好，出新街口地铁口出来就是，方便快捷</span>
                                    </li>
                                    <li id="comment_pic">
                                                                        </li>                      
                                    <li>
                                                                            <!--<strong class="useful">有用<i>(5 )</i></strong>-->
                                     </li>
                                </ul>
                            </div>
                        </div>
                                                <div class="review_list">                        
                            <div class="review_listle">
                                <dl>
                                    <dt><img src="http://www.zhuna.cn/dianping/static/upload/user_info/338.jpg" width="20" height="20" /></dt>
                                    <dd>
                                        <ul>
                                            <li><strong>139****2746</strong></li>
                                            <li>商务大床间</li>
                                            <li><span>2016-05-20</span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="review_listri">
                                <span class="ico_note"></span>
                                <ul>
                                    <li><span class="yellow">"来自iphone的点评"</span></li>
                                    <li>
                                        <span class="con">距离地铁口非常近，出门一分钟进地铁，去哪里都很方便，酒店环境也还不错，虽然是老酒店了，但是比较干净，也很安静，好评！</span>
                                    </li>
                                    <li id="comment_pic">
                                                                        </li>                      
                                    <li>
                                                                            <!--<strong class="useful">有用<i>(5 )</i></strong>-->
                                     </li>
                                </ul>
                            </div>
                        </div>
                                                <div class="review_list">                        
                            <div class="review_listle">
                                <dl>
                                    <dt><img src="http://www.zhuna.cn/dianping/static/upload/user_info/331.jpg" width="20" height="20" /></dt>
                                    <dd>
                                        <ul>
                                            <li><strong>180****9818</strong></li>
                                            <li>商务标准间</li>
                                            <li><span>2016-04-26</span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="review_listri">
                                <span class="ico_note"></span>
                                <ul>
                                    <li><span class="yellow">"来自android的点评"</span></li>
                                    <li>
                                        <span class="con">交通方便，就在地铁口那，服务员态度好，</span>
                                    </li>
                                    <li id="comment_pic">
                                                                        </li>                      
                                    <li>
                                                                            <!--<strong class="useful">有用<i>(5 )</i></strong>-->
                                     </li>
                                </ul>
                            </div>
                        </div>
                                                <div class="review_list">                        
                            <div class="review_listle">
                                <dl>
                                    <dt><img src="http://www.zhuna.cn/dianping/static/upload/user_info/331.jpg" width="20" height="20" /></dt>
                                    <dd>
                                        <ul>
                                            <li><strong>180****9818</strong></li>
                                            <li>商务标准间</li>
                                            <li><span>2016-04-26</span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="review_listri">
                                <span class="ico_note"></span>
                                <ul>
                                    <li><span class="yellow">"来自android的点评"</span></li>
                                    <li>
                                        <span class="con">好，交通方便，服务员态度好，就是一楼稍微有点闹</span>
                                    </li>
                                    <li id="comment_pic">
                                                                        </li>                      
                                    <li>
                                                                            <!--<strong class="useful">有用<i>(5 )</i></strong>-->
                                     </li>
                                </ul>
                            </div>
                        </div>
                                                <div class="review_list">                        
                            <div class="review_listle">
                                <dl>
                                    <dt><img src="http://www.zhuna.cn/dianping/static/upload/user_info/305.jpg" width="20" height="20" /></dt>
                                    <dd>
                                        <ul>
                                            <li><strong>138****8020</strong></li>
                                            <li>街景房-1</li>
                                            <li><span>2015-12-05</span></li>
                                        </ul>
                                    </dd>
                                </dl>
                            </div>
                            <div class="review_listri">
                                <span class="ico_note"></span>
                                <ul>
                                    <li><span class="yellow">"来自android的点评"</span></li>
                                    <li>
                                        <span class="con">就在地铁站对面，交通便利，房间干净，性价比高。</span>
                                    </li>
                                    <li id="comment_pic"></li>                      
                                    <li>  <!--<strong class="useful">有用<i>(5 )</i></strong>-->
                                     </li>
                                </ul>
                            </div>
                        </div></div>
                        <!------------------------------->
                                                <div class="review_more" hash="showt0" id="showt5" style="display:none">
                        	<a href="javascript:void(0);" class="more_ico">查看更多精彩点评</a>
                        </div>
                        <p class="more" hash="showt3-showt5" id="showt0">查看全部<i>419</i>条点评>></p>
                                            </div> 
                </div>
                            </div>
            <!----酒店点评end---->
           
            
        </div>
        <!--左侧酒店详细内容end-->
        
    </div>
    <!--详细页左侧end-->
    <!--详细页右侧start-->
    <div class="main_ri">
    	<div class="main_ritop">
                	<ul>
            	<li><strong class="score">
                                	<i>4.4</i>/5.0
                                </strong><span>来自<i>419</i>条评论</span><em hash="showt3-showt5" id="top_more">查看全部>></em></li>
                <li class="note">
                	<p><span class="le"></span><strong>位置非常好，出新街口地铁口出来就是，方便快捷</strong><span class="ri"></span></p>
                </li>
            </ul>
                </div>
        
        
        <!--猜您喜欢start-->
        <div class="like_hotel mt_20">
        	
        </div>
        <!--猜您喜欢end-->
        
    </div>
    <!--详细页右侧end-->
	
	<div class="room_nav room_navfix" style="position: relative; top: 0px; z-index: 100;display:none">
		<div class="room_navcon">
			<div class="wrap_order">
				<em>¥<span></span><font>起</font> </em>
				<a id="ebook_nav" href="javascript:void(0);" title="立即预订" class=" f_right  book_nav" hash="showt0-showt3">立即预订</a>
			</div>
			<ul>
				<li class="cur" hash="showt0-showt3">酒店房型</li>
								<li id="hotel_pic" hash="showt2">酒店图片</li>
				<li id="hotel_comment" hash="showt3-showt5">酒店点评</li>
				<li id="hotel_q" hash="showt4">问答</li>
			</ul>
		</div>
	</div>
	
</div>

<div class="clearfloat"></div>



<!--选择日期超过28天-->
<div class="date_note" style="display:none;">
	<span></span>
	<strong>如果您需要在酒店入住28晚以上，请致电<i>400-888-8888</i>住哪儿竭诚为您服务。</strong>
</div>
<!--选择日期超过28天-->
<div style="display:none;" class="main hotplace">
	<div class="hotel_desinfo">
        <h3>北京酒店信息</h3>
        <p style="display:block;">布丁连锁酒店（北京中关村店）位于中关村商圈，北邻中国硅谷中关村仅约2公里，紧邻西直门交通枢纽。酒店周边有北京交通大学、中央财经大学、中国人民大学等高校；紧邻国家图书馆、首都体育馆、北京展览馆。地理位置非常优越，交通十分便利。设<span><i style="display:inline;">更多</i></span><span id="hide_content" style="display:none;">计、IKEA家居和ROCA卫浴联合铸就了时尚、温馨、个性和环保并重的；酒店每个房间配置了宽带接口，并在大部分房间配置了电脑，专为商务、旅游、E时尚人士设计。体验，享受酒店开业时间2009年2月，楼高5层，客房总数146间（套）。【温馨提示】：1、酒店不提供一次性免费洗漱用品；2、酒店无停车场。<i class="sq">收起</i></span></p> 
    </div>
    <div class="hotnav">
    	<h3>北京热门地标</h3>
    </div>
    <div class="hotlist">
        <dl class="">
            <dt>行政区：</dt>
            <dd><a href="#">朝阳区</a><a href="#">海淀区</a></dd>
        </dl>
        <dl class="">
            <dt>商业区：</dt>
            <dd><a href="#">朝阳区</a><a href="#">海淀区</a></dd>
        </dl>
        <dl class="">
            <dt>热门景区：</dt>
            <dd><a href="#">朝阳区</a><a href="#">海淀区</a></dd>
        </dl>
        <dl class=" no_border">
            <dt>交通枢纽：</dt>
            <dd><a href="#">朝阳区</a><a href="#">海淀区</a></dd>
        </dl>
    </div>
</div>

<div id="big_pic" style=" z-index:10000; display:none; position: absolute;" class="big_pic"></div>

<!--地图弹窗start-->
<div class="map_mainbox" style="display:none;">
	<span class="map_num">A</span>
    <span class="marker_start"></span>
    <div class="map_smallpopbox">
        <div class="map_smallpop">
            <span class="close"></span>
            <em class="title">好苑建国酒店</em>
            <em class="address">地址：北京市东城区建国门内大街17号</em>
            <p class="but">
                <input type="button" value="选为起点" class="start"/>
                <input type="button" value="选为终点" class="end"/>
            </p>
        </div>
        <span class="bot_ico"></span>
    </div>

</div>
<!--地图弹窗end-->
<!--提交到订单面的表单-->
<form style="display:none;" name="doBook" id="doBook" target="_blank" method="get" action="/order/index">
<input type="hidden" name="hid" id="hid" />
<input type="hidden" name="rid" id="rid" />
<input type="hidden" name="pid" id="pid" />
<input type="hidden" value="0" id="agent_id" name="agent_id" />
<input type="hidden" value="" name="union_id" id="union_id" />
<input type="hidden" value="" name="tm1" id="tm1" />
<input type="hidden" value="" name="tm2" id="tm2" />
<input type="hidden" name="ref" value="hotelinfo" />
</form>

<jsp:include page="foot.jsp"></jsp:include>
 
<div style="display:none;"> 
<script src="http://js.users.51.la/17394974.js" type="text/javascript"></script>
</div>      
<script type="text/javascript">var s=2;</script>
<script src="http://public.9tour.cn/js/9ct.js" type="text/javascript"></script>
<div style="display:none;">
  <script type="text/javascript">
var youdao_conv_id = 273184; 
</script> 
<script src="http://conv.youdao.com/pub/conv.js" type="text/javascript"></script>
</div>
<!--添加广告头部大图换小图-->
  

<!-- 百度访问分析代码，请勿去掉-->
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Feac0c3863f9fda1a2681e8f1c2d552c5' type='text/javascript'%3E%3C/script%3E"));
</script>
<div style="display:none;">
<script src="http://js.users.51.la/17461342.js" type="text/javascript"></script>
</div>
</body>
</html>
<!-- <script>document.domain = 'zhuna.cn';</script> -->
<!-- <script type="text/javascript">
	var index_url='http://www.zhuna.cn/';
	var base='http://public.kezhan.znimg.com/www/default/';
	var base_v='http://public.kezhan.znimg.com/www/default/';
	var static_url ="http://public.kezhan.znimg.com/";
	var header_index_url='http://www.zhuna.cn/';
	var header_static_url  = 'http://public.kezhan.znimg.com/';
	var php_self='index.php';
	var baidu_lng=116.3735;
	var baidu_lat=39.946269;
	var soso_svid="10011005120202110407118";
	var soso_heading="206";
	var soso_pitch="0";
	var soso_zoom="1";
	var hotel_name="雅悦酒店(北京西直门店)";
	var hotel_address="西城区西直门内大街126号(地铁4号线新街口地铁站D口出)";
</script> -->
<!-- <script src="http://api.map.baidu.com/api?v=1.5&ak=A1308faa0957e741726c0b4dd53f43b6" type="text/javascript"></script>
<script src="http://map.qq.com/api/js?v=2.exp&key=d84d6d83e0e51e481e50454ccbe8986b" type="text/javascript"></script>
<script src="http://public.kezhan.znimg.com/??common/js/jquery-1.8.2.js,js/jquery-plugin/ui/minified/jquery.cookie-min.js,js/jquery-plugin/jquery.pagination-min.js,common/js/ued-core.js,common/js/ued-main.js,www/default/js/dialog_login.js,www/default/js/header.js,www/default/js/ntalker.js,www/default/js/footer.js,common/html/cityPicker/data.js" type="text/javascript"></script>
<script src="http://public.kezhan.znimg.com/??www/default/js/plan.js,www/default/js/hotel.js,common/js/ued.map.js" type="text/javascript"></script>
<script src="http://tp1.znimg.com/v5/javascript/swfobject.js?2014070311" type="text/javascript"></script> -->

<!-- <script language="javascript">
$(document).ready(function() { 
	 hotel.id = pic.id = question.id = section.id =7269;
	 pic.isQuanjing = 0;
	 hotel.init();
	 pic.init();
	 question.init();
	 section.hava_section=0;
	 section.init();
	 	 	 })
</script>
<script>
   var ZhuNaUserID = $.cookie('ZhuNaUserID') ? $.cookie('ZhuNaUserID') : '';
   var  link_= "http://www.zhuna.cn/hotel-7269.html";
	window["_BFD"] = window["_BFD"] || {};
	_BFD.BFD_INFO = {
	
		"id" : 7269,   //商品id号
		"name" : "雅悦酒店(北京西直门店)",   //商品名称
		"price" : 349, //价格
		"market_price" : 579, //市场价
		"address" : "西城区西直门内大街126号(地铁4号线新街口地铁站D口出)", //地址
		"link" : link_,   //商品链接
		"image_link" : "http://tp1.znimg.com/hotel_images/7269/500x375_20101401_0_8_1018_1.jpg",   //商品大图地址
		"simage_link" : "http://tp1.znimg.com/hotel_images/7269/500x375_20101401_0_8_1018_1.jpg",  //商品小图地址
		"room_info" : [] ,// 房型、房价、返现、房量，2维数组
		"rating_count" : "419" ,   //评价人数
		"rating" : "4.4", // 评分
		"buy_count" : "410", // 购买人数
		"category" : [["酒店预订",index_url+"hotel/"],["北京酒店查询",index_url+"hotellist/0101/"]],
		"star" : "0", //酒店星级
		"brand" : "北京雅悦",   //酒店所属连锁品牌;
		"onsale" : true,   //上下架标识  在架为true, 下架为false;
		"business_circle" : "北京展览馆/首都体育馆",   //商圈
		"location" : "北京", //地域	
		"tag" : [ "出行方便","舒适","安静","经济","优质服务","温馨","繁华地区","高性价比","超值"], //客户评价
		"usage" :["会议厅","商务中心","旅游票务服务","洗衣服务","送餐服务","叫车服务","行李寄存","叫醒服务"],//服务设施
		"user_id" : ZhuNaUserID, //网站当前用户id，如果未登录就为0或空字符串
		"coord" :["39.946269","116.3735"],
		"style_1":[''],
		"place":[""],
		"page_type" : "detail_h" //当前页面全称，请勿修改
	};
</script>
 -->
