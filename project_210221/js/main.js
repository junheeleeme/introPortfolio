$(".nav_slide").mouseenter(function(){
    $(this).children(".nav_sub").stop().addClass('on');
})
$(".nav_slide").mouseleave(function(){
    $(this).children(".nav_sub").stop().removeClass('on');
})