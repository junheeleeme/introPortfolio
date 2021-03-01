
function test(){
    window.scroll({top : window.innerHeight, behavior: 'smooth'});
}

test();

let scrollTop;
let isWheel_move;

function checkDevice(){ //접속 환경 구분
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
 
    if ( varUA.indexOf('android') > -1) {
        //안드로이드
        return 'android';
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
        //IOS
        return 'ios';
    } else {
        return 'other';
    } 
}

window.addEventListener('mousewheel', (e) => {
    /*
    scrollTop = window.innerHeight;
    if(e.wheelDelta === -120){
        console.log(e);
    } else{
        console.log(e.wheelDelta);
    }*/
    console.log(e.wheelDelta);
    clearInterval(isWheel_move);
    isWheel_move = setTimeout(() => isWheel(e.wheelDelta), 200);

});

function isWheel(wDelta){
    if(wDelta >= 120){
        move_up();
    }
    else{
        move_down();
    }
}


/* 메뉴 이동  */
let select_nav = 0;
// 
//0 : Profile
//1 : My Skills
//2 : Portflio
//3 : Contact me

    /* nav메뉴 직접 클릭 이동 */
const target = document.querySelectorAll(".nav_main > li > a");

for(i = 0 ; i < target.length ; i++){ //네비게이션 메뉴 전체 이벤트 등록
    target[i].addEventListener('click', () =>{
        move_nav(event.target.getAttribute("id")); //클릭한 타겟 id값 확인

        for(i=0 ; i< target.length ; i++){ //직접 클릭한 메뉴 위치 저장
            if(target[i].getAttribute('id') === event.target.getAttribute("id")){
                select_nav = i;
            }
        }
    })    
}  

function move_nav(target_id){
    const target_nav = document.querySelector('.'+target_id);
    const targetTop = window.pageYOffset + target_nav.getBoundingClientRect().top;
    
    if (checkDevice() === 'ios'){ //접속 환경 구분
        $('html').animate({scrollTop: targetTop.toFixed(4)}, 200);
    }else{
        window.scroll({top : targetTop.toFixed(4), behavior: 'smooth'});
    }
    console.log((targetTop).toFixed(4));
}    /* nav메뉴 직접 클릭 이동 */

    /* 업다운 버튼 클릭 이동 */
document.querySelector('#up').addEventListener('click',() =>{
    move_up();
})

document.querySelector('#down').addEventListener('click',() =>{   
    move_down();
})

function move_up(){
    if(select_nav > 0) select_nav -= 1;
    move_nav(target[select_nav].getAttribute('id'));
}

function move_down(){
    if(select_nav < target.length-1) select_nav += 1;
    move_nav(target[select_nav].getAttribute('id'));
}
    /* 업다운 버튼 클릭 이동 */
/* 메뉴 이동  */


