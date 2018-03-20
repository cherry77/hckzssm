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
	<meta charset="utf-8" />
	<link rel="stylesheet" href="css/cssSort/hckz1.css" type="text/css"/>
	<link rel="stylesheet" href="css/cssSort/WdatePicker.css" type="text/css"/>
	<link href="css/common.css" rel="stylesheet" type="text/css">
	
	
	
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
   <div id="in">
			<label>目的地：<input type="" placeholder="北京"/></label>	
			<label>入住时间：<input type="text"  id="start" class="Wdate" onclick="WdatePicker()"/></label>
			<label>离开时间：<input type="text"  id="end" class="Wdate" onclick="WdatePicker()"/></label>
			<label>关键词：<input type="text" value="" placeholder="商圈/地标/酒店名称"/></label>
			<label><input type="button" value="立即搜索  " class="inpu"/></label>
			
			
		</div>
		<div id="but1">
			<div class="but1">
			<p>酒店位置：</p>
			<form>
			<label><span>不限</span></label>
			<label><input type="radio" name="position" value=""/><span>火车站机场<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>景点附近<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>大学附近<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>地铁附近<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>医院附近<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>商业区<img src="imag/imgsort/jiantouxia.png"></span></label>
			<label><input type="radio" name="position" value=""/><span>行政区<img src="imag/imgsort/jiantouxia.png"></span></label>
			</form>
		</div>
		
			<div class="but2">
			<p>价格区间：</p>
			<form>
			<label><span>不限</span></label>
			<label><input type="radio" name="position" value=""/><span>低于￥150</span></label>
			<label><input type="radio" name="position" value=""/><span>￥151-300</span></label>
			<label><input type="radio" name="position" value=""/><span>301-450</span></label>
			<label><input type="radio" name="position" value=""/><span>451-600</span></label>
			<label><input type="radio" name="position" value=""/><span>600以上</span></label>
			<label><input type="radio" name="position" value=""/><span>商业区</span></label>
			<label><input type="radio" name="position" value=""/><span>行政区</span></label>
			</form>
		</div>
		
			<div class="but3">
			<p>酒店星级：</p>
			<form>
			<label><span>不限</span></label>
			<label><input type="radio" name="position" value=""/><span>二星级/经济型</span></label>
			<label><input type="radio" name="position" value=""/><span>三星级/舒适型</span></label>
			<label><input type="radio" name="position" value=""/><span>四星级/高档型</span></label>
			<label><input type="radio" name="position" value=""/><span>五星级豪华型</span></label>
			</form>
		    </div>
		
		
		<div class="but4">
			<p>连锁品牌：</p>
			<form>
			<label><span>不限</span></label>
			<label><input type="radio" name="position" value=""/><span>全部连锁</span></label>
			<label><input type="radio" name="position" value=""/><span>如家快捷</span></label>
			<label><input type="radio" name="position" value=""/><span>汉庭快捷</span></label>
			<label><input type="radio" name="position" value=""/><span>速8</span></label>
			<label><input type="radio" name="position" value=""/><span>格林豪泰</span></label>
			<label><input type="radio" name="position" value=""/><span>锦江之星</span></label>
			<label><input type="radio" name="position" value=""/><span>七天连锁</span></label>
			<label><input type="radio" name="position" value=""/><span>99旅馆连锁</span></label>
			<label><input type="radio" name="position" value=""/><span>更多<img src="imag/imgsort/jiantouxia.png"></span></label>
			</form>
		    </div>
		
		<div class="but5">
			<p>酒店设施：</p>
			<form>
			<label><span>不限</span></label>
			<label><input type="radio" name="position" value=""/><span>无线上网</span></label>
			<label><input type="radio" name="position" value=""/><span>宽带上网</span></label>
			<label><input type="radio" name="position" value=""/><span>停车场</span></label>
			<label><input type="radio" name="position" value=""/><span>含早</span></label>
			<label><input type="radio" name="position" value=""/><span>套房/家庭房</span></label>
			<label><input type="radio" name="position" value=""/><span>三张床</span></label>
			<label><input type="radio" name="position" value=""/><span>两张床</span></label>
			<label><input type="radio" name="position" value=""/><span>大床</span></label>
			<label><input type="radio" name="position" value=""/><span>更多<img src="imag/imgsort/jiantouxia.png"></span></label>
			</form>
		    </div>
		
		</div>

<div id="con">
	<ul class="inp1">
		<li><input type="button" value="住哪推荐"></input></li>
		<li><input type="button" value="价格"></input></li>
		<li><input type="button" value="评分"></input></li>
	
	</ul>

<div class="in">
<div class="info">
		<img src="imag/imgsort/160x120_81b49988-7eaf-4795-8b2d-7a679f22db6a.jpg"/>
		<b><a>北京中社旅馆(天坛店)</a></b>
		<p>位于天坛，东城区金鱼池街南口(天坛北们往西60米)</p>
		<img><img>
		<span class="t1">4.9</span><span class="t2">/5.0</span>
		<div class="t3">￥128<p>起</p></div>
	</div>
	
	
	<!-- <div class="info">
		<img src="imag/imgsort/160x120_9cefff66-dce3-4d64-8dd1-ec19a3d48ea6.jpg"/>
		<b><a>北京宜如家宾馆</a></b>
		<p>位于通州，通州区台湖通马路2号(京哈高速台湖出口向前200米)</p>
		<img><img>
		<span class="t1">4.9</span><span class="t2">/5.0</span>
		<div class="t3">￥118<p>起</p></div>
	</div>
	
	
	<div class="info">
		<img src="imag/imgsort/160x120_c8471177-ed24-46ae-ada1-19b336711935.jpg"/>
		<b><a>尚客优快捷酒店(北京密云新中街店)</a></b>
		<p>位于密云城区/密云水库，密云县新南路80号(新南路与新中街交叉口东南)</p>
		<img><img>
		<span class="t1">4.4</span><span class="t2">/5.0</span>
		<div class="t3">￥144<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_20130228b3259e264fe50384e509430ab29ec9d4.jpg"/>
		<b><a>七天连锁酒店(北京万丰路七里庄地铁站店)</a></b>
		<p>丰台区万丰路300号(万丰小吃城旁)</p>
		<img><img>
		<span class="t1">4.3</span><span class="t2">/5.0</span>
		<div class="t3">￥137<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_2d71f530-e76e-40cf-a31f-6a4a3e919b73.jpg"/>
		<b><a>北京龙庆峡欢乐佳苑客栈</a></b>
		<p>位于延庆城区/八达岭长城，延庆县旧县镇古城民俗村(延庆休闲度假区)</p>
		<img><img>
		<span class="t1">4.2</span><span class="t2">/5.0</span>
		<div class="t3">￥100<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_5ba4b07b-244f-4738-a298-cf3b410c1b8d.jpg"/>
		<b><a>99优选北京梨园环球影城酒店</a></b>
		<p>位于通州，通州区云景东路431号(梨园派出所对面)</p>
		<img><img>
		<span class="t1">4.1</span><span class="t2">/5.0</span>
		<div class="t3">￥109<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_3e51b264-cb42-4bb8-b04a-a192aebdf4c3.jpg"/>
		<b><a>北京十渡雨琛客栈</a></b>
		<p>位于房山城区/十渡风景区，房山区十渡镇八渡村(近京铁培训中心)</p>
		<img><img>
		<span class="t1">4.1</span><span class="t2">/5.0</span>
		<div class="t3">￥127<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_a42ef40f-376b-4711-bcf8-0f78ef3f22eb.jpg"/>
		<b>北京南苑宏昌酒店</a></b>
		<p>位于南苑机场/南宫地区，丰台区南苑五爱屯东街29号</p>
		<img><img>
		<span class="t1">4.0</span><span class="t2">/5.0</span>
		<div class="t3">￥128<p>起</p></div>
	</div>
	<div class="info">
		<img src="imag/imgsort/160x120_3e4eecdf-a931-4853-8e56-4c16b2ae9ec4.jpg"/>
		<b><a>北京便宜居连锁酒店(天通苑南站地铁店)</a></b>
		<p>位于昌平城区/小汤山温泉度假区，昌平区天通苑南西一区北门22号楼底</p>
		<img><img>
		<span class="t1">4.0</span><span class="t2">/5.0</span>
		<div class="t3">￥138<p>起</p></div>
	</div> -->
	
	
</div>
</div>
<jsp:include page="foot.jsp"></jsp:include>
<script type="text/javascript" src="js/jssort/hc1.js" ></script>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js" ></script> 
  </body>
</html>
