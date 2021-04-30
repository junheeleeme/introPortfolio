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

let vh = window.innerHeight * 0.01;
document.querySelector('.main>section').style.setProperty("--vh", `${vh}px`);

/* Variables */
const kku = document.querySelector('#kkusaeng');
const html = document.querySelector('html');
const intro_bg = document.querySelector('.intro_bg');
const nav_menu = document.querySelectorAll('.nav_main>li');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const cm_info = document.querySelector('.cm_info');
const typing = document.querySelector('.typing');
const modal_open = document.querySelectorAll('.more_btn');
const modal_close = document.querySelector('.close_btn');
const modal_bg = document.querySelector('.modal_bg');
const nav_toggle = document.querySelector('.nav_toggle');
const nav = document.querySelector('.nav');

let chk_dev;
let open_modal = 0;
let isWheel_move;
let wDelta; //마우스 Delta값
let nav_idx = 0; 
let _typing1;
let _typing2;
let _typing3;

// nav_idx =>
//0 : Home
//1 : intro
//2 : my skills
//3 : Portflio
//4 : Contact me
/* function */ 



window.addEventListener('load', function(){
    init();
})

window.addEventListener("focus", function(event){
    if(intro_bg.paused) {
        intro_bg.play();
    }
})

window.addEventListener("blur", function(event){
    if(intro_bg.play) {
        intro_bg.pause();
    }
})

window.addEventListener("scroll", function(){ //모바일
    if(window.innerHeight*3 === window.scrollY){
        setTimeout(()=>{
            cm_info.style.bottom = '100px';
            cm_info.style.opacity = '1';
        }, 100)
    }
})

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
    
        if(intro_bg.paused) {
            intro_bg.play();
        }
    }, 0);
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

    if(browser !== 'Safari'){ 
        window.scroll({ top:  targetTop, left: 0, behavior: 'smooth'});
    }else{
        $('html').stop().animate({ scrollTop : targetTop }, 350, 'swing');
    }

    setTimeout(()=>{
        cm_info.style.bottom = '-100%';
        cm_info.style.opacity = '0';
    }, 100)

    switch(nav_idx){
        case 0 : {  //home
            typing_Effect();
            break;
        }
        case 1 : {  //intro
            allClear();
            break;
        }
        case 2 : {  //portfolio
            allClear();
            break;
        }
        case 3 : {  //contact me
            setTimeout(()=>{
                cm_info.style.bottom = '100px';
                cm_info.style.opacity = '1';
            }, 100)
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
        nav.children[0].style.color = "#2d2f3d";
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
    const type_txt = '안녕하세요 :) 웹 개발자 개인 포트폴리오 사이트입니다.';
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
            typing.innerText += type_txt[i];
            i++;
            if(i === 8){
                clearInterval(_typing1);
                typing_Effect(2);
            }
        }, 80)
        }, 1000)
    }else if(num === 2){ // 웹 개발자
        setTimeout(()=>{
        _typing2 = setInterval(()=>{
            typing.innerText += type_txt[i];
            i++;
            if(i === 14){
                clearInterval(_typing2);
                typing_Effect(3);
            }
        }, 80)
    }, 700)
    }else if(num === 3){ //개인 포트폴리오 사이트입니다.
    setTimeout(()=>{
        _typing3 = setInterval(()=>{
            typing.innerText += type_txt[i];
            i++;
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


//포트폴리오 More 버튼 클릭
modal_open.forEach(openBtn =>{  
    openBtn.addEventListener('click', ()=>{
      
    open_modal = 1;
    // read json file   
    fetch('../portfolio.json').then((res) => res.text())
    .then((pofol) => {

        const portfolio = JSON.parse(pofol);

            for(i= 0 ; i<modal_open.length ; i++){
                if(modal_open[i] === openBtn){
                    
                    const modal = document.querySelector('.portfolio_modal');
                    modal.children[0].innerText = portfolio[i].title;
                    modal.children[1].src = 'img/portfolio_item/' + portfolio[i].img_url;
                    
                    modal.children[2].children[1].innerHTML = '';
                    modal.children[2].children[0].innerText = '';
                    modal.children[3].href = '';
                    modal.children[4].href = '';

                    portfolio[i].skills.forEach(skills=>{ 
                        modal.children[2].children[1].innerHTML += '<li><strong>' + skills + '</strong></li>';
                    })
                    modal.children[2].children[0].innerText = portfolio[i].content;
                    
                    modal.children[3].href = portfolio[i].link[0];
                    modal.children[4].href = portfolio[i].link[1];
                }  
            }
        }).catch((err) => {
            alert("not found portfolio");
    })
    })
})

modal_close.addEventListener('click', ()=>{
    open_modal = 0;
})
modal_bg.addEventListener('click', ()=>{
    open_modal = 0;
})

