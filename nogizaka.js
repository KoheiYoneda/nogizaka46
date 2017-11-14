// htmlを読み込んでから処理を実行する
$(function(){
  // 人物の配列を与えると、その中からランダムで１つ選る。
  // その後、html上に人物画像を表示してくれる関数
  var randomPerson = function(data, cutFlag=false){
    data = shuffle(data);
    var person;
    while(true){
      person = data[0];
      if(targetPerson!==person)break;
    }
    targetPerson = person
    if(cutFlag===true) data.shift();
    // 画像を表示
    var imageUrl = "img/" + person.image
    $("img.face").attr("src",imageUrl);
    $("h2.name").html(""); // 前回の名前を削除
    length = data.length;
    if(length<=0) $("button.next").prop("disabled",true);
  }

  // フィッシャー・イェーツのシャッフルをする関数
  var shuffle = function(array){
    var n = array.length;
    var t, i;
    while(n){
      n = n - 1
      i = Math.floor(Math.random()*n);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
    return array;
  }

  var getSource = function(){
    // phpではフォルダ以下のファイル名を取得できるようだが、
    // javascriptではそれはできなさそうな感じだった
    // javascriptで連想配列
    var source = [
    {name:"秋元真夏",image:"akimotomanatsu_prof.jpg"},
    {name:"生田絵梨花",image:"ikutaerika_prof.jpg"},
    {name:"生駒里奈",image:"ikomarina_prof.jpg"},
    {name:"伊藤かりん",image:"itoukarin_prof.jpg"},
    {name:"伊藤純奈",image:"itoujunna_prof.jpg"},

    {name:"伊藤万理華",image:"itoumarika_prof.jpg"},
    {name:"井上小百合",image:"inouesayuri_prof.jpg"},
    {name:"衛藤美彩",image:"etoumisa_prof.jpg"},
    {name:"川後陽菜",image:"kawagohina_prof.jpg"},
    {name:"川村真洋",image:"kawamuramahiro_prof.jpg"},

    {name:"北野日奈子",image:"kitanohinako_prof.jpg"},
    {name:"齋藤飛鳥",image:"saitouasuka_prof.jpg"},
    {name:"斎藤ちはる",image:"saitouchiharu_prof.jpg"},
    {name:"斉藤優里",image:"saitouyuuri_prof.jpg"},
    {name:"相楽伊織",image:"sagaraiori_prof.jpg"},

    {name:"桜井玲香",image:"sakuraireika_prof.jpg"},
    {name:"佐々木琴子",image:"sasakikotoko_prof.jpg"},
    {name:"白石麻衣",image:"shiraishimai_prof.jpg"},
    {name:"新内眞衣",image:"shinuchimai_prof.jpg"},
    {name:"鈴木絢音",image:"suzukiayane_prof.jpg"},

    {name:"高山一実",image:"takayamakazumi_prof.jpg"},
    {name:"寺田蘭世",image:"teradaranze_prof.jpg"},
    {name:"中田花奈",image:"nakadakana_prof.jpg"},
    {name:"中元日芽香",image:"nakamotohimeka_prof.jpg"},
    {name:"西野七瀬",image:"nishinonanase_prof.jpg"},

    {name:"能條愛未",image:"noujouami_prof.jpg"},
    {name:"樋口日奈",image:"higuchihina_prof.jpg"},
    {name:"星野みなみ",image:"hoshinominami_prof.jpg"},
    {name:"堀未央奈",image:"horimiona_prof.jpg"},
    {name:"松村沙友理",image:"matsumurasayuri_prof.jpg"},

    {name:"山崎怜奈",image:"yamazakirena_prof.jpg"},
    {name:"若月佑美",image:"wakatsukiyumi_prof.jpg"},
    {name:"渡辺みり愛",image:"watanabemiria_prof.jpg"},
    {name:"和田まあや",image:"wadamaaya_prof.jpg"},
    {name:"伊藤理々杏",image:"itouriria_prof.jpg"},

    {name:"岩本蓮加",image:"iwamotorenka_prof.jpg"},
    {name:"梅澤美波",image:"umezawaminami_prof.jpg"},
    {name:"大園桃子",image:"oozonomomoko_prof.jpg"},
    {name:"久保史緒里",image:"kuboshiori_prof.jpg"},
    {name:"坂口珠美",image:"sakaguchitamami_prof.jpg"},

    {name:"佐藤楓",image:"satoukaede_prof.jpg"},
    {name:"中村麗乃",image:"nakamurareno_prof.jpg"},
    {name:"向井葉月",image:"mukaihazuki_prof.jpg"},
    {name:"山下美月",image:"yamashitamizuki_prof.jpg"},
    {name:"吉田綾乃クリスティー",image:"yoshidaayanochristie_prof.jpg"},

    {name:"与田祐希",image:"yodayuuki_prof.jpg"},
    ];
    return source;
  }

  // カウンタを更新
  var updateCounter = function(data){
    // カウンタを更新
    length = data.length;
    counter = 46 - length;
    var counterText = counter + "/46";
    $("h2.counter").html(counterText);
  }

  var source = getSource()
  var nogizaka46 = source.concat();
  // array.concat()とarray.push()の違い
  // array.push("A")は配列にAという値を追加する(直接的)
  // array.concat()は元々配列を連結させるもので、
  // 連結させた後の配列を返す(関節的)
  var targetPerson = nogizaka46[0];
  var examination = false;

  // すべての画像をプリロード
  for(var i=0;i<nogizaka46.length;i++){
    var obj = nogizaka46[i];
    var imageUrl = "img/" + obj.image
    $("<img src="+imageUrl+">");
  }

  randomPerson(nogizaka46);

  // buttonタグのうちnextクラスのものがクリックされたら
  $("button.next").click(function(e){
    if(examination===true){
      randomPerson(nogizaka46,cutFlag=true);
      updateCounter(nogizaka46)
    }
    else if(examination===false){
      randomPerson(nogizaka46);
    }
  });

  // buttonタグのうちdisplayクラスのものがクリックされたら
  $("button.display").click(function(e){
   // targetPersonに当たる名前を表示
   $("h2.name").html(targetPerson.name);
  });

  // buttonタグのうちselectokクラスのものがクリックされたら
  $("button.selectok").click(function(e){
   // カウンタを非表示に
   $("h2.counter").html("");
   // 試験フラグを元に戻す
   examination = false;
   // ボタンがdisbleになっていたときのために元に戻しておく
   $("button.next").prop("disabled",false);

   // アコーディオンを閉じる
   var isOpen = $(".setting").is(":hidden");
   if(isOpen===false){
    $(".setting").hide();
   }
   var selected = $("select.modelist").val();
   var text = "▼モード(" + selected + ")";
   $("h2.mode").html(text);
   // array.slice(A,B)は、A以上B未満を切り取る
   if(selected==="1人目〜15人目"){
    nogizaka46 = source.slice(0,16);
    randomPerson(nogizaka46);
   }
   else if(selected==="16人目〜31人目"){
    nogizaka46 = source.slice(16,32);
    randomPerson(nogizaka46);
   }
   else if(selected==="31人目〜46人目"){
    nogizaka46 = source.slice(32,47);
    randomPerson(nogizaka46);
   }
   else if(selected==="全員"){
    nogizaka46 = source.concat();
    randomPerson(nogizaka46);
   }
   else if(selected==="試験"){
    examination = true;
    nogizaka46 = source.concat();
    randomPerson(nogizaka46,cutFlag=true);
    updateCounter(nogizaka46);
   }
  });

  // アコーディオンによって設定パネルを開いたり閉じたり
  $(".setting").hide();
  $("h2.mode").click(function(){
   // 閉まっていたら開く
   // 開いていたら閉める
   $(".setting").slideToggle("slow");
   $(this).toggleClass("active");
  });

});
