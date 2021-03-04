
let scrollTop;
let isWheel_move;
let wDelta; //마우스 Delta값
let nav_idx = 0; //nav 메뉴위치

function init(){
    nav_focus(nav_idx);
}

init();


/* 마우스 스크롤 기능 구현 */
$(this).on("mousewheel DOMMouseScroll", function (e) { 

    clearInterval(isWheel_move);
    wDelta = e.originalEvent.wheelDelta;
    isWheel_move = setTimeout(() => isWheel(wDelta), 200);
    console.log(e.originalEvent.wheelDelta);

});

function isWheel(wDelta){ // 마우스 휠 방향 구분
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
/* 마우스 스크롤 기능 구현 */

/* 메뉴 이동 기능 구현 */

// 
//0 : Profile
//1 : My Skills
//2 : Portflio
//3 : Contact me

$(".nav_main>li").click(function(){
    fnMove($(this).prop('id'));
    nav_idx = $(this).index();
    nav_focus(nav_idx);
});

$("#up").click(function(){
    fn_moveUp();
})

$("#down").click(function(){
    fn_moveDown();
})

function fn_moveUp(){   //화면 위로 이동
    if( nav_idx > 0){
        nav_idx-=1;
        fnMove($('.nav_main>li').eq(nav_idx).prop('id'));
        nav_focus(nav_idx);
    }
}

function fn_moveDown(){  //화면 아래로 이동
    if( nav_idx < $(".nav_main>li").length-1){
        nav_idx+=1;
        fnMove($('.nav_main>li').eq(nav_idx).prop('id'));
        nav_focus(nav_idx);
    }
}

function fnMove(target_id){  //직접 클릭한 메뉴화면 절대위치를 계산해 이동
    targetTop = $('.'+target_id).offset().top;
    $("html,body").stop().animate({
        scrollTop: targetTop.toFixed(4)}, 500, 'swing');
        console.log((targetTop).toFixed(4));
}

function nav_focus(n_idx){
    let select = $(".nav_main>li").eq(n_idx);
    select.children('a').css({'color' : '#fff'});
    select.children('span').css({'right' : '-63px'});
    select.siblings().children('span').removeAttr('style');
    select.siblings().children('a').removeAttr('style');
}

/* 메뉴 이동 기능 구현 */