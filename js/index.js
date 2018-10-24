/* 初始化fullpage设置 */

/*
	1、设置每一屛的背景颜色
	2、取消内容居中，默认居中
	3、指示器，点容器
	4、onLeave():回调方法，在目标离开一节前往另一节后调用
*/
$(document).ready(function(){

	$("#container").fullpage({
		sectionsColor:["#fadd67","#83a2d2","#ef674d","#ffeedd","#d04759","#84d9ed","#8ac06c"],
		verticalCentered:false,
		navigation:true,
		// 设置两屛之间切换的速度
		scrollingSpeed:1000,
		afterLoad:function(origin,destination){
			// destination：对象，里面包括achorLink和index，从0开始
			$(".section").eq(destination.index).addClass("now");
		},
		/*点击更多切换到下一页，最好在组件初始化之后定义*/
		afterRender:function(){
			$("#more").on("click",function(){
				fullpage_api.moveSectionDown();
			});

			/*第八节功能
				1、手跟随鼠标移动
				2、点击再来一次，刷新页面并且回到第一节
			*/

			$(".screen8").on("mousemove",function(e){

				$(".screen8 .hand").css({
					left:e.clientX-220,
					top:e.clientY-30
				});
			}).find(".again").on("click",function(){
				// 1、去掉所有css动画(.now,.leaved,.show,.say,.open)
				$(".now,.leaved,.show,.say,.open").removeClass("now").removeClass("leaved").removeClass("show")
					.removeClass("say").removeClass("open");

				// 2、去掉所有jQuery代码的动画，show(),fadeIn():都是改变style
				$(".content [style]").removeAttr("style");

				// 3、回到第一节
				fullpage_api.moveTo(1);
			});
		},
		onLeave:function(origin,destination){
			// 鼠标离开第二节前往第三节
			if(origin.index == 1 && destination.index == 2){
				$(".section:eq(1)").addClass("leaved");
			}else if(origin.index == 2 && destination.index == 3){
				// 鼠标离开第三节前往第四节
				$(".section:eq(2)").addClass("leaved");
			}else if(origin.index == 4 && destination.index == 5){
				// 鼠标离开第五节前往第六节
				$(".section:eq(4)").addClass("leaved");
				// 给box加个now
				$(".section:eq(5)").find(".box").addClass("now");
			}else if(origin.index == 5 && destination.index == 6){
				// 鼠标离开第6节前往第7节,让星星逐个显示
				$(".screen7 .star img").each(function(i,item){
					$(item).delay(i*500).fadeIn();
				});

				$(".screen7 .text").addClass("show");

			}
		},
		
		
	});
	// 添加监听，当购物车动画完成(过渡结束)，执行收货地址动画
	$(".screen4 .cart").on("transitionend",function(){
		
		$(".screen4 .text").addClass("leaved");
		$(".screen4 .address").show().find("img:last").fadeIn(1000);
		// $(".screen4 .address>img:last").fadeIn(500);

	});

	// 添加监听，当工作人员动画完成（animationend），执行请收获动画
	$(".screen6 .car .workImg").on("animationend",function(){
		$(".screen6 .text #t2").show();
		$(".screen6 .car").find(".sayImg").addClass("say");
	});

	$(".screen6 .car .sayImg").on("transitionend",function(){
		console.log("动画结束");
		$(".screen6 .person .door").addClass("open");
	});
});
