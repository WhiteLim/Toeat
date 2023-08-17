
let ranNum = Math.floor(Math.random()*627);
fetch("./js/data/md.json")
            .then((data) => data.json())
            .then(({ list })=>{
                let imgSrc = ``,url=``;
                if(list[ranNum].booking == '') {
                    url = `업체에 전화 문의 주세요.`
                } else {
                    url = `<a href="${list[ranNum].booking}" target="_blank">네이버 예약</a>`
                }
                $(".store-img").find("img").attr('src',list[ranNum].images)
                $(".store-name").text(list[ranNum].name)
                $(".column").eq(1).find("div").eq(0).text(list[ranNum].adress)
                $(".column").eq(1).find("div").eq(1).text(list[ranNum].phone ? list[ranNum].phone  : '등록된 전화번호가 없습니다.')
                $(".column").eq(1).find("div").eq(2).text(list[ranNum].time ? list[ranNum].time.substr(0,28)+"..."  : '등록된 시간이 없습니다.' )
                $(".column").eq(1).find("div").eq(3).text(list[ranNum].description ? list[ranNum].description.substr(0,28)+"..." : "등록 된 정보가 없습니다." )
                $(".column").eq(1).find("div").eq(4).html(url)
                $(".column").eq(1).find("div").eq(5).text(list[ranNum].category)
                $(".column").eq(1).find("div").eq(6).text(list[ranNum].menus[0])
            })

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d'), dragBox = document.querySelector('.main > article');
let ico_xy = [ 
    {x:380,y:420,thumb:'avocado',w:38,h:38,name:'서초구'},
    {x:120,y:410,thumb:'bread',w:38,h:38,name:'구로구'},
    {x:470,y:430,thumb:'french fries',w:38,h:38,name:'강남구'},
    {x:570,y:400,thumb:'coffee',w:38,h:38,name:'송파구'},
    {x:620,y:300,thumb:'chili',w:38,h:38,name:'강동구'},
    {x:280,y:480,thumb:'cooking',w:38,h:38,name:'관악구'},
    {x:205,y:480,thumb:'pineapple',w:20,h:30,name:'금천구'},
    {x:290,y:400,thumb:'pumpkin',w:38,h:38,name:'동작구'},
    {x:210,y:370,thumb:'dumpling',w:38,h:38,name:'영등포구'},
    {x:120,y:345,thumb:'carrot',w:60,h:60,name:'양천구'},
    {x:70,y:260,thumb:'cake',w:45,h:45,name:'강서구'},
    {x:220,y:280,thumb:'pear',w:45,h:45,name:'마포구'},
    {x:330,y:325,thumb:'hot dog',w:45,h:45,name:'용산구'},
    {x:430,y:300,thumb:'ice cream',w:45,h:45,name:'성동구'},
    {x:515,y:285,thumb:'grape',w:45,h:45,name:'광진구'},
    {x:465,y:230,thumb:'sushi rool',w:40,h:40,name:'동대문구'},
    {x:530,y:200,thumb:'burger_1',w:45,h:40,name:'중랑구'},
    {x:505,y:120,thumb:'coffee beans',w:45,h:40,name:'노원구'},
    {x:420,y:50,thumb:'kiwi',w:45,h:40,name:'도봉구'},
    {x:420,y:145,thumb:'donuts',w:45,h:40,name:'강북구'},
    {x:400,y:200,thumb:'orange_1',w:45,h:40,name:'성북구'},
    {x:330,y:220,thumb:'orange',w:55,h:55,name:'종로구'},
    {x:370,y:270,thumb:'honey',w:50,h:50,name:'중구'},
    {x:275,y:245,thumb:'cupcake',w:35,h:35,name:'서대문구'},
    {x:240,y:150,thumb:'onigiri',w:50,h:50,name:'은평구'}
]


let img = new Image();
img.src="./images/main-img/map.png";
img.addEventListener('load',()=>{
    ctx.drawImage(img, 0, 0, 700, 580)

    ico_xy.forEach((v,k) => {
        let newImg = new Image();
        newImg.src = `./images/main-img/icons/${v.thumb}.png`;
        newImg.addEventListener('load',()=>{
            ctx.drawImage(newImg, v.x, v.y, v.w, v.h)
        })

    });
})

canvas.onclick = function(event){
    const x = event.clientX - ctx.canvas.offsetLeft; 
    const y = event.clientY - ctx.canvas.offsetTop;

    const list_html = document.querySelector('.store')
    
    let tag ='',tag_li='';
    

    ico_xy.forEach((v,k) => {
       let pos ={sx:v.x, dx:v.x + v.w, sy:v.y, dy:v.y + v.h};
       if(pos.sx < x && pos.dx > x && pos.sy < y && pos.dy > y){
        list_html.innerHTML = '';
        
            tag +=`
                <div class="eat_title">
                    <figure>
                        <p><img src="./images/main-img/logo-orange.png" alt="logo"></p>
                        <figcaption>
                            <h2> ${v.name} 맛집 </h2>
                            <span> 어쩌고 저쩌고 </span>
                        </figcaption>
                    </figure>
                </div>
                <ul class="eat_list">

            `;
            fetch("./js/data/md.json")
            .then((data) => data.json())
            .then(({ list })=>{
                list.forEach((j,z)=>{
                    if(j.adress.includes(v.name) == true){
                        tag_li +=`
                            <li>
                                <p><img src="${j.images}" alt="${j.name}"></p>
                                <h2>${j.name}</h2>
                            </li>
                        `
                    }
                })
                tag += tag_li;
                tag += `</ul>`;
                list_html.innerHTML = tag;
            })
        } 
    });
}


let mov=false;
dragBox.addEventListener( "mousedown", (e)=>{
        let x = e.clientX;
        let y = e.clientY;
        mov = true;
        moves(x,y)
});
dragBox.addEventListener( "mouseup", (e)=>{
    let x = e.clientX;
    let y = e.clientY;
    mov = false; 
    moves(x,y)
});



function moves(x,y){
    let thisLeft = Number(window.getComputedStyle(canvas).getPropertyValue('margin-left').replace(/px/g, '') )
    let thisTop = Number(window.getComputedStyle(canvas).getPropertyValue('margin-top').replace(/px/g, '') )
    dragBox.addEventListener( "mousemove", (e)=>{
        if (mov) {
            let mx = e.clientX - x;
            let my = e.clientY - y;
            let marginLeft = thisLeft + mx;
            let marginTop = thisTop + my;
            canvas.style=`margin-left:${marginLeft}px; margin-top:${marginTop}px; z-index:1000;`
        } else {
            canvas.style.zIndex = 0;
        }
    })   
}
