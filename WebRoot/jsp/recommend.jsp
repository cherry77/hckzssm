<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">	
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>首页</title>
   <link  rel="stylesheet" href="css/recommendcss/base.css" type="text/css"/>
   <link  rel="stylesheet" href="css/recommendcss/index.css" type="text/css"/>
    <link  rel="stylesheet" href="css/recommendcss/selectDate.css" type="text/css"/>
	 <link  rel="stylesheet" href="css/recommendcss/searchCity.css" type="text/css"/>
  <style>
  *{margin:0px;padding:0px;}
  #ho1 #conn{ width:100%;height:1000px;background:url("imag/recomend/swiper1.jpg")no-repeat 30% 0;position:absolute;text-align:center;vertical-align:middle;margin-bottom:900px;}
  #ho1 #conn #headd{width:100%;height:70px; }
 #ho1 #conn #headd ul li{text-align:center;line-height:70px;float:left;list-style-type:none;margin-left:50px;position:relative;left:260px;}
 #ho1 #conn #headd ul li a{text-decoration:none;font-size:20px;color:white;}
 #ho1 #conn #headd ul li a:hover{color:yellow;;}
.but1{width:500px;position:relative;top:230px;left:30%;}
.but1 p{font-size:50px;color:white; line-height:100px;text-align:center;font-family:}.but1 p:hover{transform:rotate(1);}	
#co1{width:100%;height:2200px;background:#F0FFFF;position:relative;top:400px;}
#co1 .col2{font-size:40px;text-align:center;color:red;position:relative;left:44%;top:60px;}
#co1 ul li{float:left;list-style-type:none;}
#co1 ul{position:absolute;left:0px;top:0px;bottom:0px;right:0px;margin:150px 5%;padding:auto;}
#co1 ul li img{width:250px;height:350px;margin:30px;}
#co1 ul li:hover{transform:rotate:(100deg);}
#conn1{width:100%;height:1500px;position:absolute:top:1200px;background:#F0FFFF;}
#conn1 .container{margin-top:500px;}
#foot1 ul li{float:left;margin-top:30px;margin-left:200px;}
#foot1 ul li img{width:60px;height:60px;}
</style>
 </head>
  
   <body>
   	<jsp:include page="top.jsp"></jsp:include>   
 <div id="ho1">
    <div id="conn" style="background:'url(imag/recomend/swiper1.jpg)'">
	  <div id="headd">
	  <!-- <span class="img1" style="position:absolute;left:30px;top:0px;margin-right:20px"><img src="imag/recomend/icon_success.png"></span>
	  <span class="img2" style="position:absolute;left:130px;top:10px margin-right:50px;line-height:70px"><img src="imag/recomend/hckz.jpg"></span> -->
	  <!-- <ul>
	  
	  <li><a href="#">酒店预订</a></li>
	  <li><a href="#">订单</a></li>
	  <li><a href="#">我的</a></li>
	  </ul> -->
	 </div>
  </div>
</div>
<div class="but1">
<p>红尘客栈，一路相伴</p>
</div>
<div id="conn1">
		<div class="container">

			  <div class="brands-hotel-wrapper">
				<div class="brands-hotel-header">
				  <h3>推荐酒店</h3>
				</div>
				<div class="brands-hotel-container">
				  <div class="brands-hotel-item brands-hotel-item-3">
					<ul class="brands-hotel-list">
					  <li><img src="imag/recomend/1.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>草屋居</h4>
						  <p>彼岸风光，从此开始</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>1</h4>
						  <p>彼岸风光，从此开始</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>我与杜甫有个约定</p><a href="javascript:;" data-id="96" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/6.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>四方驿站</h4>
						  <p>有朋自远方来，不亦乐乎</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>四方驿站</h4>
						  <p>有朋自远方来，不亦乐乎</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>我在等，等风，等你来</p><a href="javascript:;" data-id="96" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					 <li><img src="imag/recomend/10.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>暖 阁</h4>
						  <p>面朝大海，春暖花开</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>暖 阁</h4>
						  <p>面朝大海，春暖花开</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>细腻的欢喜，只因为有你的到来</p><a href="javascript:;" data-id="96" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/2.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>2</h4>
						  <p>最自己 NO OUT</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>蝴蝶谷</h4>
						  <p>最自己 NO OUT</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>新老会员首住 100元</p><a href="javascript:;" data-id="4" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					</ul>
				  </div>
				  <div class="brands-hotel-item brands-hotel-item-6">
					<ul class="brands-hotel-list">
					  <li><img src="imag/recomend/5.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>花好月圆</h4>
						  <p>年轻的选择</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>花好月圆</h4>
						  <p>年轻的选择</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>一路相伴的7天 99元首住体验</p><a href="javascript:;" data-id="1,2" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/3.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>丽江白沙时</h4>
						  <p>Good Morrow 只为更好的出发</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>丽江白沙时</h4>
						  <p>Good Morrow只为更好的出发</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>在丽江白沙时，邂逅薰衣草般的美梦</p><a href="javascript:;" data-id="90" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/4.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>慈悲喜舍</h4>
						  <p>欢朋体验，知己之道</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>慈悲喜舍</h4>
						  <p>欢朋体验，知己之道</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>Feel the Hamptonality</p><a href="javascript:;" data-id="98" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					</ul>
				  </div>
				  <div class="brands-hotel-item brands-hotel-item-3">
					<ul class="brands-hotel-list">
					  <li><img src="imag/recomend/8.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>广南院</h4>
						  <p>旅途中的啡凡存在</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>广南院</h4>
						  <p>旅途中的风景存在</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>风景主题酒店</p><a href="javascript:;" data-id="91" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/7.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>恒德</h4>
						  <p>No Try No High 不试不欢</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>恒德</h4>
						  <p>No Try No High 不试不欢</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>新老会员首住99元</p><a href="javascript:;" data-id="5" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					   <li><img src="imag/recomend/12.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>小 水</h4>
						  <p>与水共舞</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>小 水</h4>
						  <p>与水共舞</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>感受时尚轻奢的生活方式</p><a href="javascript:;" data-id="96" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					  <li><img src="imag/recomend/9.jpg" alt="">
						<div class="brands-hotel-item-infomation">
						  <h4>满意居</h4>
						  <p>Hongchen  小幸感  宠你开始</p>
						</div>
						<div class="brands-hotel-item-detail">
						  <div class="brands-hotel-item-detail-bg"></div>
						  <h4>满意居</h4>
						  <p>Hongchen  小幸感  宠你开始</p>
						  <div class="brands-hotel-item-detail-bottom">
							<p>与你相遇，好幸运</p><a href="javascript:;" data-id="96" class="brands-hotel-link">查看详情</a>
						  </div>
						</div>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>	  
	 </div>
	 </div>
  <script>
  
  var con=document.getElementById("conn");
  var imgs =["imag/recomend/swiper1.jpg", "imag/recomend/swiper2.jpg", "imag/recomend/swiper3.jpg"];
   function bian(){
       var i = Math.floor(Math.random()*(3+0)+0); //（获取随机数，设置m~n的随机，此处3是代表n，0处是m，可以替换）
   con.style.backgroundImage="url("+imgs[i]+")";  //红色部分是自定义的图片文件夹目录
      }
		setInterval("bian()",3000);
  
  </script>
  <jsp:include page="foot.jsp"></jsp:include>
 </body>
</html>
