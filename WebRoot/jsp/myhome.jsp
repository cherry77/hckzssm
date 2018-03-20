	<c:choose>
                <c:when test="${customer.customerid>0 }">
                <ul class="myhome">
	                <li><img src="http://www.zhuna.cn/dianping/static/upload/user_info/318.jpg" width="25" height="25"></li>
					<li><em><a >${customer.customerphone }</a></em></li> 
					<li><span>|</span></li>
					<li><a>退出</a></li>
                </ul>
                </c:when>
                <c:otherwise>
                <ul class="denglu">
                    <li><a class="">登录</a></li>
         			<li><span>|</span><a>注册</a></li>
                </ul>
                </c:otherwise>               
             </c:choose>   