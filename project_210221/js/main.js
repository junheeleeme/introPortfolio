/* Variables */
const html = document.querySelector('html');
const nav_menu = document.querySelectorAll('.nav_main>li');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const my_info = document.querySelector('.my_info');
const typing = document.querySelector('.typing');

let chk_dev;
let isWheel_move;
let wDelta; //마우스 Delta값
let nav_idx = 0; 

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
    const m_section = document.querySelectorAll('.main>section');
    const targetTop = m_section[n_idx].offsetTop;

    if(!check_device()){ // pc/android
        window.scroll({ top:  targetTop, left: 0, behavior: 'smooth'});
    }else{ //ios
        $('html').stop().animate({ scrollTop : targetTop }, 350, 'swing');
    }
    console.log(nav_idx);
    if(nav_idx === 3){
        setTimeout(()=>{
            my_info.style.bottom = '130px';
            my_info.style.opacity = '1';
        }, 100)
    }
    else{
        setTimeout(()=>{
            my_info.style.bottom = '-500px';
            my_info.style.opacity = '0';
        }, 100)
    }
}

function fn_moveUp(){
    const avail_nav = nav_idx > 0 ? true : false;
    
    if(avail_nav){
        nav_idx-=1;
        fnMove(nav_idx);
        nav_focus(nav_idx);
    }
}

function fn_moveDown(){
    const avail_nav = nav_idx < nav_menu.length-1 ? true : false;

    if(avail_nav){
        nav_idx+=1;
        fnMove(nav_idx);
        nav_focus(nav_idx);
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

let typing_start;

function typing_Effect(){
   
}

typing_Effect();

/* Event Handling */

// 마우스 스크롤 기능구현
html.addEventListener('mousewheel', (e)=>{ 
    
    if(!e.ctrlKey){
        clearInterval(isWheel_move);
        wDelta = e.wheelDelta;
        isWheel_move = setTimeout(() => isWheel(wDelta), 200);
    }
});

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
        console.log(e.code);
        fn_moveUp();
    }
    else if(e.keyCode === 40){ // ArrowDown
        console.log(e.code);
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

