//next4用のjavascript

var canvas;
var cc;
var r=20;     //半径
var interval=0.01;  //描画間隔:10ms 

//ボール1
var x=150;     //x座標
var y=150;     //y座標
var dx=5.0;    //x方向の移動量
var dy=10.0;    //y方向の移動量
var e = 0.98; //壁の反発係数
var timer;         //タイマIDを格納する変数
//ボール2
var x2=50;     //x座標
var y2=50;     //y座標
var dx2=10.0;    //x方向の移動量
var dy2=5.0;    //y方向の移動量
var e2 = 0.01; //壁の反発係数
var timer2;         //タイマIDを格納する変数
//ボール3
var x3=150;     //x座標
var y3=150;     //y座標
var dx3=5.0;    //x方向の移動量
var dy3=8.0;    //y方向の移動量
var e3 = 1.01; //壁の反発係数
var timer3;         //タイマIDを格納する変数

var g = 3.0; //重力加速度 px/s^2 
var count = 0; //クリックカウント
var drag = false; //マウスでドラッグ中を判定するフラグ
var reflectCount = 0; //反射した回数のカウント 
var gameTimer; //タイマーID
var gameTime = 6; //ゲーム時間6s
var CountTimer; //制限時間表示用

//Imageオブジェクトを生成、止まった後の背景画像
var img = new Image();
img.src = 'next4.jpg';


//最初に反射した回数をhtmlに送って、印字しておく。
document.getElementById("info").innerHTML = reflectCount;

//上と同様に制限時間をhtmlに送って、印字しておく。
document.getElementById("time").innerHTML = gameTime;
//確認用
console.log(gameTime);


//3つの球バラバラに動かしたかっただけだが、ある意味ホラーっぽいので怪我の功名。
function draw(){
    //canvasのクリア
    cc.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle(x,y);
    updateCoordinate();
}

function draw2(){
    //canvasのクリア
    cc.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle2(x2,y2);
    updateCoordinate2();
}

function draw3(){
    //canvasのクリア
    cc.clearRect(0, 0, canvas.width, canvas.height); 
    drawCircle3(x3,y3);
    updateCoordinate3();
}
function updateCoordinate() {
    if (drag) return; // ドラッグ中は自動で移動させない
    dy = dy + g * interval; //重力方向の移動量(速度)を更新

    //移動量の変化量更新(壁で反射させる)
    if((x + dx > canvas.width - r) || (x + dx < r)) {   //(x + dx < 0 + r) 本当は0がある
        dx = (dx *- 1) * e; //ベクトルを逆方向へ変換 
        reflectCount = reflectCount + 5113;  //バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }if((y + dy > canvas.height - r) || (y + dy < r)) {  //(y + dy < 0 + r) 本当は0がある
        dy = (dy *- 1) * e; //ベクトルを逆方向へ変換
        reflectCount = reflectCount + 8112; //バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }
    x = x + dx;
    y = y + dy;
}
function updateCoordinate2() {
    if (drag) return; // ドラッグ中は自動で移動させない
    dy2 = dy2 + g * interval; //重力方向の移動量(速度)を更新

    //移動量の変化量更新(壁で反射させる)
    if((x2 + dx2 > canvas.width - r) || (x2 + dx2 < r)) {   //(x + dx < 0 + r) 本当は0がある
        dx2 = (dx2 *- 1) * e2; //ベクトルを逆方向へ変換 
        reflectCount = reflectCount + 678913;　//バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }if((y2 + dy2 > canvas.height - r) || (y2 + dy2 < r)) {  //(y + dy < 0 + r) 本当は0がある
        dy2 = (dy2 *- 1) * e2; //ベクトルを逆方向へ変換
        reflectCount = reflectCount + 732746;　//バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }
    x2 = x2 + dx2;
    y2 = y2 + dy2;
}
function updateCoordinate3() {
    if (drag) return; // ドラッグ中は自動で移動させない
    dy3 = dy3 + g * interval; //重力方向の移動量(速度)を更新

    //移動量の変化量更新(壁で反射させる)
    if((x3 + dx3 > canvas.width - r) || (x3 + dx3 < r)) {   //(x + dx < 0 + r) 本当は0がある
        dx3 = (dx3 *- 1) * e3; //ベクトルを逆方向へ変換 
        reflectCount = reflectCount + 4256;　//バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }if((y3 + dy3 > canvas.height - r) || (y3 + dy3 < r)) {  //(y + dy < 0 + r) 本当は0がある
        dy3 = (dy3 *- 1) * e3; //ベクトルを逆方向へ変換
        reflectCount = reflectCount + 9028;　//バグを醸し出すための変な数値
        document.getElementById("info").innerHTML = reflectCount;
    }
    x3 = x3 + dx3;
    y3 = y3 + dy3;
}

function drawCircle(x, y) {
    cc.save();
    cc.beginPath();
    cc.arc(x, y, r, 0, Math.PI*2, true);
    cc.closePath();
    cc.fillStyle = "maroon";　//赤黒
    //cc.fillStyle=color.value; 
    cc.fill();
    cc.restore();
}

function drawCircle2(x2, y2) {
    cc.save();
    cc.beginPath();
    cc.arc(x2, y2, r, 0, Math.PI*2, true);
    cc.closePath();
    cc.fillStyle = "maroon";　//赤黒
    cc.fill();
    cc.restore();
}

function drawCircle3(x3, y3) {
    cc.save();
    cc.beginPath();
    cc.arc(x3, y3, r, 0, Math.PI*2, true);
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

    //マウスで操作不可にしておく
    /*
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", onMouseDown); 
    canvas.addEventListener("mouseup", onMouseUp); 
    canvas.addEventListener("mouseout", onMouseOut);
    */
    //描画関数を一定間隔で繰り返し呼び出す
    timer = setInterval(draw, interval * 1000);
    timer2 = setInterval(draw2, interval * 1000);
    timer3 = setInterval(draw3, interval * 1000);

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
    //アニメーションの停止
    clearInterval(timer2);
    //アニメーションの停止
    clearInterval(timer3);
    //制限時間の停止。しないと、マイナス何秒の世界へ
    clearInterval(CountTimer);
    //マウス操作イベントも停止 
    canvas.removeEventListener("mousemove", onMouseMove); 
    canvas.removeEventListener("mousedown", onMouseDown); 
    canvas.removeEventListener("mouseup", onMouseUp); 
    canvas.removeEventListener("mouseout", onMouseOut); //得点のハイライト表示 
    
    //canvas内を白紙に
    cc.clearRect(0,0,300,400);

    // 画像読み込み終了してから描画
    cc.drawImage(img, -120, -50);
    
    document.getElementById("info").style.color = "maroon";
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

