// ウィンドウ表示時に商品コードのテキストボックスにフォーカス
item_code.focus()

//画面表示時
//商品マスターを受け取って表示
window.onload = show_master();

function show_master(){
  async function run(){
    var master_table = await eel.master_table_create("master.csv")();
    master_list.innerHTML = master_table;
  }
  run();
}

//変数準備
var ordered_list =[];
var temp_item_code = 0;
var temp_item_info =[];
var temp_item_name ="";
var temp_item_price = "";
var temp_quantity = 0;
var order_number = 0;
var subtotal = 0;
var ordered_total = 0;
var temp_deposit = 0;

//テキストボックス入力チェック関数
//商品コードと数の両方が入力されたら
//注文ボタンを有効にする
function inputcheck(){
    if ((item_code.value.length >= 1) && (quantity.value.length >= 1)){
        btn_order.disabled = false;
    }else{
        btn_order.disabled = true;
    }
}

// テキストボックス入力チェック、商品名と単価をpyから取得して表示
item_code.oninput = function(){
    if (item_code.value.length >= 1) {
        temp_item_code = parseInt(item_code.value);
        async function run(){
            temp_item_info = await eel.get_iteminfo(temp_item_code)();
            temp_item_name = temp_item_info[0];
            temp_item_price = temp_item_info[1];
            item_name.innerText = temp_item_name;
            price.innerText = temp_item_price + " 円";
        }
        run();
        inputcheck();
    } 
}


//数が入力されたらチェック
quantity.oninput = function(){
    if (quantity.value.length >= 1) {
        inputcheck();
    } 
}

//注文ボタンが押されたら、注文内容をlistに格納して、textareaに表示
function btn_order_click(){
    order_number ++ ;
    temp_quantity = quantity.value;
    subtotal = parseInt(temp_item_price)*temp_quantity;
    curent_order = [order_number, temp_item_code,temp_item_name,temp_item_price,temp_quantity,subtotal]
    ordered_list.push(curent_order);
    item_code.value = "";
    quantity.value = "";
    ordered_textarea.value += temp_item_name + " @¥"+ temp_item_price+ " " + temp_quantity + "個 " + subtotal + "円\n";
    btn_order.disabled = true;
    //合計を計算
    ordered_total += curent_order[5];
    total.innerText = ordered_total;
    item_code.focus();
}

// お釣りを計算して表示
function btn_change_click(){
    temp_deposit = parseInt(diposit.value);
    if (ordered_total > temp_deposit){
        atention.innerHTML="お金が足りません。";
        deposit.focus();
    }else{
        temp_change=temp_deposit - ordered_total;    
        change.innerHTML=temp_change;
        atention.innerHTML="";
    }
}

//ボタンクリックでレシートのcsv出力
function btn_receipt_click(){
    eel.order_list_to_csv(ordered_list,ordered_total,temp_deposit);
}
