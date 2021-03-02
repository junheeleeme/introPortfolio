
let scrollTop;
let isWheel_move;
let wDelta;
let _select;

$(this).on("mousewheel DOMMouseScroll", function (e) {

    clearInterval(isWheel_move);
    wDelta = e.originalEvent.wheelDelta;
    isWheel_move = setTimeout(() => isWheel(wDelta), 200);
    console.log(e.originalEvent.wheelDelta);

});

function isWheel(wDelta){

    if(wDelta > 10){
        fn_moveUp();
    }
    else if(wDelta === 3){
        fn_moveUp();
    }
    else if(wDelta < 0){
        fn_moveDown();
    }

}

/* 메뉴 이동  */
let select_nav = 0;
// 
//0 : Profile
//1 : My Skills
//2 : Portflio
//3 : Contact me

$(".nav_main>li").click(function(){
    fnMove($(this).prop('id'));
    select_nav = $(this).index();
    _select= $(this);
    nav_focus(_select);
});

$("#up").click(function(){
    fn_moveUp();
})

$("#down").click(function(){
    fn_moveDown();
})

function fn_moveUp(){   //화면 위로 이동
    if( select_nav > 0){
        select_nav-=1;
        fnMove($('.nav_main>li').eq(select_nav).prop('id'));
    }
}

function fn_moveDown(){  //화면 아래로 이동
    if( select_nav < $(".nav_main>li").length-1){
        select_nav+=1;
        fnMove($('.nav_main>li').eq(select_nav).prop('id'));
    }
}

function fnMove(target_id){  //직접 클릭한 메뉴화면 절대위치를 계산해 이동
    targetTop = $('.'+target_id).offset().top;
    $("html,body").stop().animate({
        scrollTop: targetTop.toFixed(4)}, 500, 'swing');
        console.log((targetTop).toFixed(4));
}
/* 메뉴 이동  */

function nav_focus(select){
    select.children('a').css({'color' : '#fff'});
    select.children('span').css({'right' : '-63px'});
    select.siblings().children('span').removeAttr('style');
    select.siblings().children('a').removeAttr('style');
}