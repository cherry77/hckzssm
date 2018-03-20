
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
		  		resultDom.innerHTML="¹²&nbsp;"+num+"&nbsp;Íí";
	   
	   }
