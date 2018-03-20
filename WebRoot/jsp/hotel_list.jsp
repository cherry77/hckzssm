<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="http://public.kezhan.znimg.com/www/default/css/??base.css,head.css,window.css" type="text/css" rel="stylesheet">
<title>搜索结果-红尘客栈</title>
<script type="text/javascript" async="" charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript" async="" src=""></script>
<script type="text/javascript" async="" charset="utf-8" src="http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9937&amp;XNform=zhuna"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/zh_cn.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="lang"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/chat.in.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="chatManage"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt31.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="MQTT"></script>
<script type="text/javascript" async="async" charset="utf-8" src="http://dl.ntalker.com/js/xn6/mqtt.chat.js?siteid=kf_9937&amp;v=nt6.8.6&amp;t=2016.12.21_012847" data-requiremodule="Connection"></script>
<script type="text/javascript"  charset="utf-8" src="js/topjs/top1.js"></script>
<script type="text/javascript"  src=""></script>
<script type="text/javascript"  charset="utf-8" src="js/topjs/top1.js"></script>
<script type="text/javascript"  charset="utf-8" src="js/topjs/top1.js" ></script>
<script type="text/javascript"  charset="utf-8" src="js/topjs/top2.js" ></script>
<script type="text/javascript" charset="utf-8" src="js/topjs/top3.js" ></script>
<script type="text/javascript"  charset="utf-8" src="js/topjs/top4.js" ></script>
</head>
<body>
 <jsp:include page="top.jsp"></jsp:include>    
<div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;"></div>
<div class="container_sea">
	<div id="breadCrumb">
      <div id="breadCrumb1"> <a href="http://www.zhuna.cn/">首页</a> <span>/</span><h1>搜索结果</h1> </div>
    </div>
    <div class="index_seabox">
    	
                       
                                                                                       
<!--酒店start-->
   <div class="index_seahotel mt_30">
        <h3>酒店</h3>
          <div class="seahotel_list">
           <c:forEach items="${hotelList}" var="hotelList">
			<div class="seahotel_desbox mt_15">
                <div class="seabus_des">
                
               <dl>
                <dt>               
			 <a target="_blank" href="http://www.zhuna.cn/hotel-14496.html"><img width="60" height="60" src="${hotelList.hotelimgurl }">
			<span class="photo_bg"></span></a>
          </dt>
          <dd>
            <strong><a target="_blank" href="http://www.zhuna.cn/hotel-14496.html">${hotelList.hotelname }</a></strong>
           <span>位于${hotelList.hotelposition }</span>
            </dd>
          </dl>
  		<div class="seahotel_ri">
            <ol>
                <li>
             <strong>4.4</strong><em>/5.0</em>
         		</li>
                <li>
         <span>来自<i>111</i>人评价</span>
            </li>
            </ol>
            <ul> 
                <li><a target="_blank" href="hotelDetails?hotelid=${hotelList.hotelid}">查看酒店</a></li>
            </ul>
        </div>
     </div>
  </div>
  </c:forEach>
   <table style="margin-top:10px;float:right;margin-right:71px;font-size:14px;">
                    <tr>
			            <td colspan="6">
			            <!-- 分页功能 start -->
			            <div align="center">
						  <font size="2">共 ${page.totalPageCount} 页</font> 
						  <font size="2">第${page.pageNow} 页</font>
			              <a href="selectAll?pageNow=1">首页</a>
			       
			                <c:choose>
			                    <c:when test="${page.pageNow - 1 > 0}">
			                        <a href="selectAll?pageNow=${page.pageNow - 1}">上一页</a>
			                    </c:when>
			                    <c:when test="${page.pageNow - 1 <= 0}">
			                        <a href="selectAll?pageNow=1">上一页</a>
			                    </c:when>
			                </c:choose>
			                <c:choose>
			                    <c:when test="${page.totalPageCount==0}">
			                        <a href="selectAll?pageNow=${page.pageNow}">下一页</a>
			                    </c:when>
			                    <c:when test="${page.pageNow + 1 < page.totalPageCount}">
			                        <a href="selectAll?pageNow=${page.pageNow + 1}">下一页</a>
			                    </c:when>
			                    <c:when test="${page.pageNow + 1 >= page.totalPageCount}">
			                        <a href="selectAll?pageNow=${page.totalPageCount}">下一页</a>
			                    </c:when>
			                </c:choose>
			                <c:choose>
			                    <c:when test="${page.totalPageCount==0}">
			                        <a href="selectAll?pageNow=${page.pageNow}">尾页</a>
			                    </c:when>
			                    <c:otherwise>
			                        <a href="selectAll?pageNow=${page.totalPageCount}">尾页</a>
			                    </c:otherwise>
			                </c:choose>
			            </div>
			            <!-- 分页功能 End -->
			            </td>
			        </tr>
			     </table>
 </div>
 </div>   
</div>
</div>
<jsp:include page="foot.jsp"></jsp:include>
<!-- <script type="text/javascript">
var php_self='index.php';
var base='http://public.kezhan.znimg.com/';
var base_v='http://public.kezhan.znimg.com/www/default/';
var index_url='http://www.zhuna.cn/';
var thumb_url = 'http://img.klz.znimg.com/uploads/thumb/';
var static_url = 'http://public.kezhan.znimg.com/';
var header_index_url='http://www.zhuna.cn/';
var header_static_url  = 'http://public.kezhan.znimg.com/';
</script>
<script src="http://public.kezhan.znimg.com/??common/js/jquery-1.8.2.js,js/jquery-plugin/ui/minified/jquery.cookie-min.js,js/jquery-plugin/jquery.pagination-min.js,common/js/ued-core.js,common/js/ued-main.js,www/default/js/dialog_login.js,www/default/js/header.js,www/default/js/ntalker.js,www/default/js/footer.js,common/html/cityPicker/data.js" type="text/javascript"></script><div class="w_placemain" id="city_input_searchtext" style="z-index: 100000; border: 1px solid rgb(232, 232, 232); display: none; width: 447px;"></div>
<div class="floatbox" style="bottom: 70px; position: fixed; left: 1157px;" id="bottom_float"><ul><li class="suggest float4" p="4" t="0" title="反馈" style="display: none;"><a class="cursor">反馈</a></li>    <li p="6" t="0" w="w" style="display: none;" title="留言" class="weibo float6"><a class="cursor">留言</a></li>    <li p="7" t="0" style="display: none;" class="gotop float7" title="返回顶部"><a class="cursor">返回顶部</a></li></ul><div class="quickmark" style="display: none;"> <img src="http://public.kezhan.znimg.com/www/default/images/weixin_pic.jpg"><dl>        <dt>您的随身酒店预订专家</dt>        <dd>扫一扫，加我微信好友哦！</dd>    </dl>    </div></div></body> -->
</html>
