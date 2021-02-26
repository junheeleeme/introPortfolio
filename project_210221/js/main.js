$(window).scroll(function(){
  /* 페럴렉스 코드 */
});

$(".nav_main>li>a").click(function(){
    const menu_title = $(this).attr('id');
    const y = $('.' + menu_title).offset().top;
    window.scrollTo({top : y, behavior: 'smooth'});	
});

$(".nav_slide").mouseenter(function(){
    $(this).children(".nav_sub").stop().slideDown(500);
})
$(".nav_slide").mouseleave(function(){
    $(this).children(".nav_sub").stop().slideUp(500);
})