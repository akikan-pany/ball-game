var canvas;
var cc;
var r=20;     //半径
var interval=0.01;  //描画間隔:10ms 
var timer;         //タイマIDを格納する変数
var x=150;     //x座標
var y=150;     //y座標
var dx=0.0;    //x方向の移動量
var dy=0.0;    //y方向の移動量
var g = 3.0; //重力加速度 px/s^2 
var e = 0.6; //壁の反発係数
var count = 0; //クリックカウント
var drag = false; //マウスでドラッグ中を判定するフラグ
var reflectCount = 0; //反射した回数のカウント 
var gameTimer; //タイマーID
var gameTime = 15; //ゲーム時間15s
var CountTimer; //制限時間表示用

//最初に反射した回数をhtmlに送って、印字しておく。
document.getElementById("info").innerHTML = reflectCount;

//上と同様に制限時間をhtmlに送って、印字しておく。
document.getElementById("time").innerHTML = gameTime;
//確認用
console.log(gameTime);


function draw(){
    //canvasのクリア
    cc.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle(x,y);
    updateCoordinate();
}
function updateCoordinate() {
    if (drag) return; // ドラッグ中は自動で移動させない
    dy = dy + g * interval; //重力方向の移動量(速度)を更新

    //移動量の変化量更新(壁で反射させる)
    if((x + dx > canvas.width - r) || (x + dx < r)) {   //(x + dx < 0 + r) 本当は0がある
        dx = (dx *- 1) * e; //ベクトルを逆方向へ変換 
        reflectCount++;
        document.getElementById("info").innerHTML = reflectCount;
    }if((y + dy > canvas.height - r) || (y + dy < r)) {  //(y + dy < 0 + r) 本当は0がある
        dy = (dy *- 1) * e; //ベクトルを逆方向へ変換
        reflectCount++; 
        document.getElementById("info").innerHTML = reflectCount;
    }
    x = x + dx;
    y = y + dy;
}
function drawCircle(x, y) {
    cc.save();
    cc.beginPath();
    cc.arc(x, y, r, 0, Math.PI*2, true);
    cc.closePath();
    cc.fill();
    cc.restore();
}

function init(){
    //キャンバスをhtmlから取得
    canvas = document.getElementById("canvas"); 
    //キャンパス描画用のコンテキストを取得
    cc = canvas.getContext("2d"); 
    // イベント設定
    //canvas.addEventListener('click', onMouseClick);　//MouseClick関数、MouseDown等がある為不要に
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", onMouseDown); 
    canvas.addEventListener("mouseup", onMouseUp); 
    canvas.addEventListener("mouseout", onMouseOut);
    //描画関数を一定間隔で繰り返し呼び出す
    timer = setInterval(draw, interval * 1000);

    //制限時間表示用
    //setIntervalは一定時間毎に特定の処理を繰り返す、ここでは1秒毎
    CountTimer = setInterval(CountT, 1000);

    //ゲーム内の時間を管理してゲームオーバを管理する
    //一定時間後に一回しか動かない為、制限時間の表示は出来なかった。繰り返し処理を上手くできませんでした。
    gameTimer = setTimeout(gameOver, gameTime * 1000);

   
}
// コンテンツ描写完了後イベント設定 
init(); 

// ボールがクリックされたかの判例処理 
function clickCircle(mx, my) {
    // クリックした座標と、◯の現在位置(中心座標)との距離を計算
    var distance = Math.sqrt(Math.pow(mx - x, 2) + Math.pow(my - y, 2));
    // 距離がボールの半径以下かどうか 
    if(distance <= r) {
        return true;    
    }
    return false;
}

/*function onMouseClick(e) {
    //クリックされた座標取得
    var mx, my;
    if ( e.pageX || e.pageY ) {
        mx = e.pageX;
        my = e.pageY;
    } else {
        mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mx -= e.target.getBoundingClientRect().left;
    my -= e.target.getBoundingClientRect().top;
    if(clickCircle(mx, my)) { // ボールをクリックできたかを判定 
        // クリックされたカウントをインクリメント
        count++;
        // クリックのカウントを画面表示
        document.getElementById("count").innerHTML = count;
    } 
}*/
function onMouseMove(e) { //指定された要素の上をマウスが移動している間実行される 
    if(!drag) return; //ドラッグ中でなければ以降の処理はしない 
    //今現在のマウスの座標
    var mx = e.clientX - canvas.offsetLeft - r; //rを引くことで、壁への、めり込みバグ回避
    var my = e.clientY - canvas.offsetTop - r; //rを引くことで、壁への、めり込みバグ回避
    //移動量の更新、これによって投げることができる
    dx = mx - x;
    dy = my - y;
    x = mx;
    y = my;
}
function onMouseDown(e) { //マウスクリック(押し込んだ時)
    //クリックされた座標取得
    var mx, my;
    if ( e.pageX || e.pageY ) {
        mx = e.pageX;
        my = e.pageY;
    } else {
        mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        my = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    mx -= e.target.getBoundingClientRect().left; 
    my -= e.target.getBoundingClientRect().top;
    if(clickCircle(mx,my)) {
        drag = true; // ドラッグされている状態に変更 
        x = mx; // ボールの座標を更新
        y = my;
        dx = 0; // 移動量は0でリセット
        dy = 0;

        /*
        // クリックされたカウントをインクリメント
        count++;
        // クリックのカウントを画面表示
        document.getElementById("count").innerHTML = count;
        */
    } 
} 

function onMouseUp(e) { 
    //マウスクリック(クリック状態から離したとき) 
    drag=false;
}
function onMouseOut(e) {
    //指定された要素からマウスカーソルが離れた時
    drag=false;
}


function gameOver(){  //gameOver処理
    //アニメーションの停止
    clearInterval(timer);
    //制限時間の停止。しないと、マイナス何秒の世界へ
    clearInterval(CountTimer);
    //マウス操作イベントも停止 
    canvas.removeEventListener("mousemove", onMouseMove); 
    canvas.removeEventListener("mousedown", onMouseDown); 
    canvas.removeEventListener("mouseup", onMouseUp); 
    canvas.removeEventListener("mouseout", onMouseOut); //得点のハイライト表示 
    document.getElementById("info").style.color = "red";
}


function CountT(){
    gameTime--;　　//ここで制限時間を減らしていく
    console.log(gameTime);  //確認用
    document.getElementById("time").innerHTML = gameTime;  //htmlに適宜送り、時間を更新
}

//リロードボタン、ハイパーリンクを使うことにしたので今回はお休み
/* 
var reload =document.getElementById('button');
reload.addEventListener('click',function(){
  window.location.reload();
});
*/

