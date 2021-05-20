function isBrowserCheck(){  // 스크롤 효과를 위한 브라우저 구분
    const agt = navigator.userAgent.toLowerCase(); 
    if (agt.indexOf("chrome") != -1) return 'Chrome'; 
    if (agt.indexOf("opera") != -1) return 'Opera'; 
    if (agt.indexOf("webtv") != -1) return 'WebTV'; 
    if (agt.indexOf("firefox") != -1) return 'Firefox'; 
    if (agt.indexOf("safari") != -1) return 'Safari'; 
    if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
    if (agt.indexOf("msie") != -1) { 
        let rv = -1; 
    if (navigator.appName == 'Microsoft Internet Explorer') { 
        let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
        if (re.exec(ua) != null) 
            rv = parseFloat(RegExp.$1); 
        } 
        return 'Internet Explorer '+rv; 
    } 
}
const browser = isBrowserCheck();


/* Variables */
const kku = document.querySelector('#kkusaeng');
const html = document.querySelector('html');
const intro_bg = document.querySelector('.intro_bg');
const nav_menu = document.querySelectorAll('.nav_main>li');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const cm_info = document.querySelector('.cm_info');
const typing = document.querySelector('.typing');
const modal_btn = document.querySelectorAll('.port_show');
const modal_close = document.querySelector('.close_btn');
const modal_bg = document.querySelector('.modal_bg');
const nav_toggle = document.querySelector('.nav_toggle');
const nav = document.querySelector('.nav');
const copy = document.querySelectorAll('.copy_btn');
const copy_txt = document.querySelector('#copy_txt');
const type_txt = '안녕하세요 :) 웹 개발자 개인 포트폴리오 사이트입니다.';
const visual_img = document.querySelectorAll('.visual_img');

let screen_h = window.innerHeight; 
let screen_w = window.innerWidth;
let total_h = screen_h*4;
let chk_dev;
let move_trigger = 0; // 0 : 화면 이동가능, 1 : 화면 이동불가
let modal_exc = 0; // 0 : 화면 이동가능, 1 : 화면 이동불가
let isWheel_move;
let wDelta; //마우스 Delta값
let nav_idx = 0;
let _typing; //typing_Effect()
let itrv_time = 100; //typing_Effect()
let sto_time = 1500;
let i = 0; //typing_Effect()
let isPause = true;


// nav_idx =>
//0 : Home
//1 : intro
//2 : my skills
//3 : Portflio
//4 : Contact me
/* function */ 


/* Event Handling */
window.addEventListener('load', ()=>{
    re_sizing();
    init();
})

window.addEventListener("focus", ()=>{
    if(intro_bg.paused) {
        intro_bg.play();
    }
})

window.addEventListener("blur", ()=>{
    if(intro_bg.play) {
        intro_bg.pause();
    }
})

window.addEventListener('touchmove', function(e){
if(modal_exc === 1){
        e.preventDefault ();
}
}, {passive: false})


//브라우저 리사이징
window.addEventListener("resize", ()=>{ 
    screen_h = window.innerHeight; 
    total_h = screen_h*4;
    screen_w = window.innerWidth;
    re_sizing();
    if(window.innerWidth > 768){
        fnMove(nav_idx)
    }
}, { passive: true })

window.addEventListener("scroll", ()=>{ //모바일 contact me 이동시 텍스트 에니메이션 효과
    
    if(screen_h < (window.scrollY+40) && screen_w < 768){
        for(let i=0 ; i<3 ; i++){
            nav_toggle.children[0].children[i].style.background = '#2d2f3d';
        }
    }else{
        for(let i=0 ; i<3 ; i++){
            nav_toggle.children[0].children[i].style.background = '#fff';
        }
    }

    if((screen_h*3)-50 < window.scrollY && screen_w < 768){ 
            cm_info.style.bottom = '100px';
            cm_info.style.opacity = '1';
    }  
},{ passive: true })

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
    
    //모바일 
    if(window.innerWidth < 768 ){
        const nav_chk_toggle = document.querySelector('#nav_chk');
        nav_chk_toggle.checked = false;
    }

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

//복사기능
copy.forEach(copy_btn =>{
    copy_btn.addEventListener('click', ()=>{
        if(copy_btn.id == 'email' ){
            const txt = document.querySelector('.email_txt').innerText;
            const tooltip = copy_btn.parentElement.lastElementChild;

            copy_txt.value = txt;
            tooltip.style.opacity = '1';

            setTimeout(()=>{
                tooltip.style.opacity = '0';
            }, 1000)
            copied();
        }
        else if(copy_btn.id == 'phone'){
            const txt = document.querySelector('.phone_txt').innerText;
            const tooltip = copy_btn.parentElement.lastElementChild;

            copy_txt.value = txt;
            tooltip.style.opacity = '1';

            setTimeout(()=>{
                tooltip.style.opacity = '0';
            }, 1000)
            copied();
        }
    })
})


//포트폴리오 모달
modal_btn.forEach(openBtn =>{  
openBtn.addEventListener('click', ()=>{
    
    const _height = document.querySelector('.portfolio').offsetTop;
    //변경할 부분 정의
    const _title = document.querySelector('.modal_title').children[0];
    const _img = document.querySelector('.modal_content').children[0];
    const  _content = document.querySelector('.content_ex');
    const  _skills = document.querySelector('.content_skills');
    const  _git = document.querySelector('.git_btn');
    const  _view = document.querySelector('.view_btn');

    //스크롤 이동방지
    modal_exc = 1;
    
    //화면 위치 재조정
    const set_top = setTimeout(() => {
        html.scroll({ top:  _height, left: 0, behavior: 'smooth'});
    }, 0);

    fetch('../portfolio.json').then((res) => res.text())
    .then((pofol) => {

        const portfolio = JSON.parse(pofol);
        
        for(i= 0 ; i<modal_btn.length ; i++){
                
            if(modal_btn[i] === openBtn){

                _title.innerText.innerText = '';
                _img.src.innerHTML = '';
                _skills.innerHTML = '';
                _git.href = '';
                _view.href = '';

                //데이터 삽입
                _title.innerText = portfolio[i].title;  
                visual_img[i].style.display = 'block';         

                _content.innerText = portfolio[i].content;

                portfolio[i].skills.forEach( sks=>{ 
                    _skills.innerHTML += '<li><strong>' + sks + '</strong></li>';
                })               
                _git.href = portfolio[i].link[0];
                _view.href = portfolio[i].link[1];
            }
        }
    }).catch((err) => {
})

    })
})

//모달이 열려있는 경우 화면이동 중단
modal_bg.addEventListener('click', ()=>{
    setTimeout(() => {
        visual_img.forEach(img =>{
            img.style.display = 'none';
        })
    }, 400);
    modal_exc = 0;

})

modal_close.addEventListener('click', ()=>{
    setTimeout(() => {
        visual_img.forEach(img =>{
            img.style.display = 'none';
        })
    }, 400);
    modal_exc = 0;

})


//functions
function init(){   

    const load_bg = document.querySelector('.load_bg');
    const load_eff = document.querySelector('.loader');
    const web_ex = document.querySelector('.web_wrap');
    
    setTimeout(() => {
        load_bg.style.opacity = '0';
        kku.style.opacity = '1';
        load_eff.style.opacity = '0';
        web_ex.style.opacity = '1'; 
        
        setTimeout(() => {
            load_bg.style.display = 'none';
            load_eff.style.display = 'none';
        }, 500);

        nav_focus(nav_idx);
        fnMove(nav_idx);
        intro_bg.classList.add("on");
        if(intro_bg.paused) {
            intro_bg.play();
        }
    }, 0);

    typing_Effect();
}

function re_sizing(){
    if(window.innerWidth < 768 ){
        move_trigger = 1;
        html.style.overflow = 'auto';
    }else{
        move_trigger = 0;
        html.style.overflow = 'hidden';
    }
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

    if(browser !== 'Safari'){ //브라우저 구분해서 코드 적용
        window.scroll({ top:  targetTop, left: 0, behavior: 'smooth'});
    }else{
        $('html').stop().animate({ scrollTop : targetTop }, 350, 'swing');
    }
    if(intro_bg.play) { // 이동할때 home배경 동영상 중지
        intro_bg.pause();
    }

    cm_info.style.bottom = '-100%';
    cm_info.style.opacity = '0';

    switch(nav_idx){
        case 0 : {  //home
            if(intro_bg.paused) {
                intro_bg.play();
            }
            break;
        }
        case 1 : {  //intro

            break;
        }
        case 2 : {  //portfolio

            break;
        }
        case 3 : {  //contact me
            setTimeout(()=>{
                cm_info.style.bottom = '100px';
                cm_info.style.opacity = '1';
            }, 100)
            break;
        }
    }
}

function fn_moveUp(){
    if(!move_trigger && !modal_exc){
        const avail_nav = nav_idx > 0 ? true : false;
        
        if(avail_nav){
            nav_idx-=1;
            fnMove(nav_idx);
            nav_focus(nav_idx);
        }
    }
}
function fn_moveDown(){
    if(!move_trigger && !modal_exc){
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
        nav.children[0].style.color = "#2d2f3d";
        nav.children[1].style.right = "500px";
        nav.children[2].style.right = "500px";
    })

    nav_menu[n_idx].classList.add('on');
    nav_menu[n_idx].children[0].style.color = "#fff";
    nav_menu[n_idx].children[1].style.right = "-63px";
    nav_menu[n_idx].children[2].style.right = "-63px";
}

// Home 타이핑 효과
function typing_Effect(){
        
    const effect = setTimeout(() => {
        
        _typing = setInterval(() => {

            if(isPause === true && i < type_txt.length){
                
                typing.innerText += type_txt[i++];
                
                switch(i){
                    case 8 :{

                        clearInterval(_typing);
                        sto_time = 600;
                        setTimeout(() => {
                            typing_Effect();
                        }, 0);
                        
                        break;
                    }
                    case 13 :{

                        sto_time = 200;
                        clearInterval(_typing);

                        setTimeout(() => {
                            typing_Effect();
                    }, 0);

                        break;
                    }
                    case type_txt.length :{
                        clearInterval(_typing);
                    isPause = false;    
                        break;
                    }
                }                
            }
        }, itrv_time);

    }, sto_time);  

}

function copied(){
    copy_txt.select();
    copy_txt.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copy_txt.value ='';
}