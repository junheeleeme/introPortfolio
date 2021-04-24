/* Variables */
const html = document.querySelector('html');
const nav_menu = document.querySelectorAll('.nav_main>li');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const my_info = document.querySelector('.my_info');
const typing = document.querySelector('.typing');
const modal_open = document.querySelectorAll('.more_btn');
const modal_close = document.querySelector('.close_btn');

let chk_dev;
let open_modal = 0;
let isWheel_move;
let wDelta; //마우스 Delta값
let nav_idx = 2; 
let typ = typing.innerText.split('');
let _typing1;
let _typing2;
let _typing3;

// nav_idx =>
//0 : Intro
//1 : My Skills
//2 : Portflio
//3 : Contact me

/* function */ 
init();

function init(){
    nav_focus(nav_idx);
    fnMove(nav_idx);
}

// 스크롤 효과를 위한 iOS 구분
function check_device(){
    const usr_agent = navigator.userAgent.match(/iPhone|iPad|/) ? false : true;
    return usr_agent; //ios = true
}

// 마우스 휠 방향 구분
function isWheel(wDelta){ 
    if(wDelta > 10){
        fn_moveUp();
    }
    else if(wDelta === 3 || wDelta === 0){
        fn_moveUp();
    }
    else if(wDelta < 0){
        fn_moveDown();
    }
}

// 화면 스크롤 이동 기능구현
function fnMove(n_idx){  //직접 클릭한 nav메뉴 절대위치를 계산해 이동
    allClear();
    const m_section = document.querySelectorAll('.main>section');
    const targetTop = m_section[n_idx].offsetTop;

    if(!check_device()){ // pc/android
        window.scroll({ top:  targetTop, left: 0, behavior: 'smooth'});
    }else{ //ios
        $('html').stop().animate({ scrollTop : targetTop }, 350, 'swing');
    }
    console.log(nav_idx);

    setTimeout(()=>{
        my_info.style.bottom = '-500px';
        my_info.style.opacity = '0';
    }, 100)

    switch(nav_idx){
        case 0 : {
            typing_Effect();
            break;
        }
        case 1 : {
            setTimeout(() => {
                const skills_item = document.querySelectorAll('.skills_wrap>li');
                
                skills_item.forEach(item =>{
                    console.log(item)
                })

            }, 500);
            allClear();
            break;
        }
        case 2 : {
            allClear();
            break;
        }
        case 3 : {
            setTimeout(()=>{
                my_info.style.bottom = '130px';
                my_info.style.opacity = '1';
            }, 100)
            allClear();
            break;
        }
        case 4 : {
            allClear();
            break;
        }
    }
}

function fn_moveUp(){
    if(!open_modal){
        const avail_nav = nav_idx > 0 ? true : false;
        
        if(avail_nav){
            nav_idx-=1;
            fnMove(nav_idx);
            nav_focus(nav_idx);
        }
    }
}

function fn_moveDown(){

    if(!open_modal){
        const avail_nav = nav_idx < nav_menu.length-1 ? true : false;

        if(avail_nav){
            nav_idx+=1;
            fnMove(nav_idx);
            nav_focus(nav_idx);
        }
    }
}

// 화면 스크롤 이동 기능구현
function nav_focus(n_idx){

    nav_menu.forEach(nav=>{
        nav.classList.remove('on');
        nav.children[0].style.color = "#000";
        nav.children[1].style.right = "500px";
        nav.children[2].style.right = "500px";
    })

    nav_menu[n_idx].classList.add('on');
    nav_menu[n_idx].children[0].style.color = "#fff";
    nav_menu[n_idx].children[1].style.right = "-63px";
    nav_menu[n_idx].children[2].style.right = "-63px";
}

let i = 0;

function typing_Effect(num = 0){

    if(num === 0){

        setTimeout(()=>{
            typing.innerText = '';
            i= 0;
        }, 0)
        typing_Effect(1);

    }
    else if(num  === 1){ // 안녕하세요
        setTimeout(()=>{
        _typing1 = setInterval(()=>{
            i++;
            typing.innerText += typ[i];
            if(i === 8){
                clearInterval(_typing1);
                typing_Effect(2);
            }
        }, 80)
        }, 1000)
    }else if(num === 2){ // 웹 개발자
        setTimeout(()=>{
        _typing2 = setInterval(()=>{
            i++;
            typing.innerText += typ[i];
            if(i === 14){
                clearInterval(_typing2);
                typing_Effect(3);
            }
        }, 80)
    }, 700)
    }else if(num === 3){ //개인 포트폴리오 사이트입니다.
    setTimeout(()=>{
        _typing3 = setInterval(()=>{
            i++;
            typing.innerText += typ[i];
            if(i === 31){
                clearInterval(_typing3);
                typing_Effect(4);
            }
        }, 80)
    }, 250)
    }else if(num === 4){
    clearInterval(_typing3);
    }
}

function allClear(){
    clearInterval(_typing1);
    clearInterval(_typing2);
    clearInterval(_typing3);
    /*
    document.querySelector(".skills_wrap").style.top = '110px';
    document.querySelector(".skills_wrap").style.opacity = '1';*/
}

/* Event Handling */

// 마우스 스크롤 기능구현
html.addEventListener('mousewheel', (e)=>{ 

        if(!e.ctrlKey){
            clearInterval(isWheel_move);
            wDelta = e.wheelDelta;
            isWheel_move = setTimeout(() => isWheel(wDelta), 200);
        }
});

window.onload = ()=>{
    document.querySelector('.web_wrap').style.opacity = '1';
}

/* nav메뉴 클릭 이벤트 */
nav_menu.forEach(nav_click =>{
    nav_click.addEventListener('click', ()=>{
        
        const click_classN = nav_click.className; 

        for(let i=0 ; i < nav_menu.length ; i++){
            const parent_child = nav_click.parentElement.children[i];
            parent_child.classList.remove('on');
            if(parent_child.className === click_classN ){
                nav_idx = i;
                fnMove(nav_idx);
                nav_focus(nav_idx);
            }
        }
        nav_click.parentElement.children[nav_idx].classList.add('on');
    })
})

/* 방향키 기능구현 */
html.addEventListener('keydown', (e)=>{

        if(e.keyCode === 38){ // ArrowUp
            fn_moveUp();
        }
        else if(e.keyCode === 40){ // ArrowDown
            fn_moveDown();
        }
})

/* 화면전환 버튼 */
up.addEventListener('click', ()=>{
    fn_moveUp();
})
    
down.addEventListener('click', ()=>{
    fn_moveDown();
})


modal_open.forEach(openBtn =>{
    openBtn.addEventListener('click', ()=>{
        open_modal = 1;
    })
})


modal_close.addEventListener('click', ()=>{
    open_modal = 0;
    const chk1 = document.querySelector("#item1");
    const chk2 = document.querySelector("#item2");
    const chk3 = document.querySelector("#item3");
    chk1.checked = false;
    chk2.checked = false;
    chk3.checked = false;
})