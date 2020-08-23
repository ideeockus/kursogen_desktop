/*if(!getGETParams()['code']) {
    location.href = "https://oauth.vk.com/authorize?\
client_id=7498425&display=page&redirect_uri=\
http://radmirkus-kursogen-proj15.surge.sh&\
scope=&response_type=code&v=5.107";
    console.log("Сейчас авторизуем вк");
}
if(!!getGETParams()['error']) {
    location.href = "https://oauth.vk.com/authorize?\
client_id=7498425&display=page&redirect_uri=\
http://radmirkus-kursogen-proj15.surge.sh&\
scope=&response_type=code&v=5.107";
    console.log(getGETParams()['error_description']);
    console.log("Error");
}*/




function getGETParams() {
    params = {}
    params_list = window.location.search.replace(/[?]?/g, "").split("&")
    for(i=0;i<params_list.length;i++) {
        param = params_list[i].split("=")
        param_key = param[0];
        param_value = param[1];
        params[param_key] = param_value;
        //console.log(param);
    }
    return params;
}

var app = new Vue({
  el: '#app',
  data: {
    message: '', //Введите данные (info after OK button)
    pp_material: "Германий",
    pp_material_E: 16,
    pp_material_ni: 1.5e+19,
    graphic_url: "",
    graphic_func: "",
  },
  methods: {
    testbutton: function() {
        alert("test alert")
    },
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
    do_practice: do_practice,
    copy_text_to_bf: copy_text_to_bf,
    open_graphic: open_graphic,
    get_graphic_func: get_graphic_func,
    switch_pp: function () {
        if(this.pp_material_E==16) {
            console.log("switch to Si");
            this.pp_material = "Кремний";
            this.pp_material_E = 12;
            this.pp_material_ni = 1e+16;
        } else if(this.pp_material_E==12) {
            console.log("switch to Ge");
            this.pp_material = "Германий";
            this.pp_material_E = 16;
            this.pp_material_ni = 1.5e+19;
        }
    },
  }
});

function do_practice() {
    this.message = "Считаем...";
    let Ie = document.getElementById('Ie_var').value;
    let T = document.getElementById('T_var').value;
    let Nb = document.getElementById('Nb_var').value;
    let Ne = document.getElementById('Ne_var').value;
    let Nk = document.getElementById('Nk_var').value;
    let mn = document.getElementById('mn_var').value;
    let mp = document.getElementById('mp_var').value;
    let tau = document.getElementById('tau_var').value;
    
    let Wb = document.getElementById('Wb_var').value;
    let Xk = document.getElementById('Xk_var').value;
    let Xe = document.getElementById('Xe_var').value;
    let S = document.getElementById('S_var').value;
    let Vbk = document.getElementById('Vbk_var').value;
    
    let E = this.pp_material_E || 16;
    let ni = this.pp_material_ni || 1.5e+19;

    let Nb_o = document.getElementById('Nb_var_o').value;
    let Ne_o = document.getElementById('Ne_var_o').value;
    let Nk_o = document.getElementById('Nk_var_o').value;
    let S_o = document.getElementById('S_var_o').value;

    //для тех кто вводит дроби через , вместо .
    Ie = Ie.replace(/,/g, "."); 
    T = T.replace(/,/g, ".");
    Nb = Nb.replace(/,/g, ".");
    Ne = Ne.replace(/,/g, ".");
    Nk = Nk.replace(/,/g, ".");
    mn = mn.replace(/,/g, ".");
    mp = mp.replace(/,/g, ".");
    tau = tau.replace(/,/g, ".");

    Wb = Wb.replace(/,/g, ".");
    Xk = Xk.replace(/,/g, ".");
    Xe = Xe.replace(/,/g, ".");
    S = S.replace(/,/g, ".");
    Vbk = Vbk.replace(/,/g, ".");



    if(Ie==0||T==0||Nb==0||Ne==0||Nk==0||mn==0||mp==0||tau==0||Wb==0||Xk==0||Xe==0||S==0||Vbk==0||Nb_o==0||Ne_o==0||Nk_o==0||S_o==0) {
        console.log("Не все данные введены");
        this.message = "Не все данные введены";
        return;
    }
    //console.log(Ie+" "+T+" "+Nb+" "+Ne+" "+Nk+" "+mn+" "+mp+" "+tau+" "+Wb+" "+Xk+" "+Xe+" "+S+" "+Vbk);


    Ie = +(Ie+"e-3"); // тут можно сделать проверку на ввод чисел
    T = +(T+"");
    Nb = +(Nb +"e"+(+Nb_o+6));
    Ne = +(Ne +"e"+(+Ne_o+6));
    Nk = +(Nk +"e"+(+Nk_o+6));
    mn = +(mn +"e-4");
    mp = +(mp +"e-4");
    tau = +(tau +"e-6");

    Wb = +(Wb +"e-6");
    Xk = +(Xk +"e-6");
    Xe = +(Xe +"e-6");
    S = +(S +"e"+(+S_o-4)); //м2
    Vbk = +(Vbk +"");
    console.log(Ie+" "+T+" "+Nb+" "+Ne+" "+Nk+" "+mn+" "+mp+" "+tau+" "+Wb+" "+Xk+" "+Xe+" "+S+" "+Vbk+" "+E+" "+ni);



    let k = ("1.38" +"e-23");
    let q = ("1.6" +"e-19");
    let E0 = ("8.85" +"e-12");

    let ft = (k*T)/q;
    let Vk = ft*Math.log((Nk*Nb)/(ni*ni));
    let V = -1*Vbk;
    let d = Math.sqrt(((2*E*E0*(Vk-V))/q)*((Nk+Nb)/(Nk*Nb)));
    let db = d/((Nb/Nk)+1);
    let dk = d-db;
    let Xb = Wb-db; //в мкм
    let Dn = ((k*T)/q)*mn;
    let Dp = ((k*T)/q)*mp;
    let X = 1 - (Math.pow(Xb,2)/(2*Dn*tau));
    let YN = Math.pow(1+((Xb*Nb*Dp)/(Xe*Ne*Dn)), -1);
    let Y1 = Math.pow(1+((Xb*Nb*Dp)/(Xk*Nk*Dn)), -1);  //mistake?
    let aN = X*YN;
    let a1 = X*Y1;
    let J1eo = q*S*Math.pow(ni,2)*((Dn/(Xb*Nb))+(Dp/(Xe*Ne))); //обратный
    let J1ko = q*S*Math.pow(ni,2)*((Dn/(Xb*Nb))+(Dp/(Xk*Nk)));
    let Jeo = (1-aN*a1)*J1eo; // тепловой ток
    let Jko = (1-aN*a1)*J1ko;
    let Vbk_dop = -2;
    let Jk = (aN*Ie)-(Jko*(Math.exp((Vbk_dop)/ft)-1)); //Vbk=2 
    let Vbe = ft*Math.log((Ie/J1eo)+1+aN*(Math.exp(Vbk_dop/ft)-1));
    let Vbk_2 = ft*Math.log(1+((aN*Ie)/Jko));
    let result_copy = "";

    console.log("Считаем");
    let ft_formula = `φ_T=\\frac{k*T}{q} = \\frac{${e2x(k)}*${T}}{${e2x(q)}} = ${e2x(ft)}`;
    result_copy = result_copy+"\n\n"+`Ширина нейтральной зоны:\n`+ft_formula+` В`; //
    let ft_text = `Ширина нейтральной зоны:\n\n`+
    katex.renderToString(ft_formula)+` В`;

    let Vk_formula = `V_К=φ_T*\\ln(\\frac{N_К*N_Б}{n_i^2 }) = ${e2x(ft)}*\\ln(\\frac{${e2x(Nk)}*${e2x(Nb)}}{{${e2x(ni)}}^2}) = ${e2x(Vk)}`;
    console.log(Vk_formula);
    result_copy = result_copy+"\n\n"+`Контактная разность потенциалов:\n`+Vk_formula+` В`; //
    let Vk_text = `Контактная разность потенциалов:\n\n`+
    katex.renderToString(Vk_formula)+ ` В`;

    let d_formula = `d=(\\frac{2*ε*ε0*V_К-V}{q}*\\frac{N_К+N_Б}{N_К*N_Б})^{\\frac{1}{2}}=\
    (\\frac{2*${E}*${e2x(E0)}*${e2x(Vk-V)}*${e2x(Nk)}+${e2x(Nb)}}{${e2x(q)}*${e2x(Nk)}*${e2x(Nb)}})^{\\frac{1}{2}} = ${e2x(d)}`;
    console.log(d_formula);
    result_copy = result_copy+"\n\n"+`Толщина база-коллекторного перехода:\n`+d_formula+` м`; //
    let d_text = `Толщина база-коллекторного перехода:\n\n`+
    katex.renderToString(d_formula)+ ` м`;

    let db_formula = `d_Б = \\frac{d}{\\frac{N_Б}{N_К}+1} = \
    \\frac{${e2x(d)}}{\\frac{${e2x(Nb)}}{${e2x(Nk)}}+1} = ${e2x(db)}`;
    console.log(db_formula);
    result_copy = result_copy+"\n\n"+`Ширина p-n перехода в области базы:\n`+db_formula+` м`;
    let db_text = `Ширина p-n перехода в области базы:\n\n`+
    katex.renderToString(db_formula)+ ` м`;

    let dk_formula = `d_К = d-d_Б = ${e2x(d)}-${e2x(db)} = ${e2x(dk)}`;
    console.log(dk_formula);
    result_copy = result_copy+"\n\n"+`Ширина p-n перехода в области коллектора:\n`+dk_formula+` м`;
    let dk_text = `Ширина p-n перехода в области коллектора:\n\n`+
    katex.renderToString(dk_formula)+ ` м`;

    let Xb_formula = `X_Б = W_Б-d_Б = ${e2x(Wb)}-${e2x(db)} = ${e2x(Xb)}`;
    console.log(Xb_formula);
    result_copy = result_copy+"\n\n"+`Ширина свободной области базы:\n`+Xb_formula+` м`;
    let Xb_text = `Ширина свободной области базы:\n\n`+
    katex.renderToString(Xb_formula)+ ` м`;



    let Dn_formula = `D_n=\\frac{k*T}{q}*µ_n = \
    \\frac{${e2x(k)}*${e2x(T)}}{${e2x(q)}}*${e2x(mn)} = ${e2x(Dn)}`;
    console.log(Dn_formula);
    result_copy = result_copy+"\n\n"+`Скорость диффузии электронов в базе:\n`+Dn_formula+` м^2/c`; //
    let Dn_text = `Скорость диффузии электронов в базе:\n\n`+
    katex.renderToString(Dn_formula+`м^2/c`);

    let Dp_formula = `D_p=\\frac{k*T}{q}*µ_p = \
    \\frac{${e2x(k)}*${e2x(T)}}{${e2x(q)}}*${e2x(mp)} = ${e2x(Dp)}`;
    console.log(Dp_formula);
    result_copy = result_copy+"\n\n"+`Скорость диффузии дырок в базе:\n`+Dp_formula+` м^2/c`; //
    let Dp_text = `Скорость диффузии дырок в базе:\n\n`+
    katex.renderToString(Dp_formula+`м^2/c`);

    let X_formula = `χ=1-\\frac{X_Б^2}{2*D_n*τ} = \
    1-\\frac{{${e2x(Xb)}}^2}{2*${e2x(Dn)}*${e2x(tau)}} = ${e2x(X)}`;
    console.log(X_formula);
    result_copy = result_copy+"\n\n"+`Коэффициент переноса или передачи тока от эмиттера к коллектору:\n`+X_formula+``;
    let X_text = `Коэффициент переноса или передачи тока от эмиттера к коллектору:\n\n`+
    katex.renderToString(X_formula);

    let YN_formula = `γ_N={(1+\\frac{X_Б*N_Б*D_p}{X_Э*N_Э*D_n})}^{-1} = \
    {(1+\\frac{${e2x(Xb)}*${e2x(Nb)}*${e2x(Dp)}}{${e2x(Xe)}*${e2x(Ne)}*${e2x(Dn)}})}^{-1} = ${e2x(YN)}`;
    console.log(YN_formula);
    result_copy = result_copy+"\n\n"+`Коэффициент эмиттерной инжекции:\n`+YN_formula+``;
    let YN_text = `Коэффициент эмиттерной инжекции:\n\n`+
    katex.renderToString(YN_formula);


    let Y1_formula = `γ_I={(1+\\frac{X_Б*N_Б*D_p}{X_К*N_К*D_n})}^{-1} = \
    {(1+\\frac{${e2x(Xb)}*${e2x(Nb)}*${e2x(Dp)}}{${e2x(Xk)}*${e2x(Nk)}*${e2x(Dn)}})}^{-1} = ${e2x(Y1)}`;
    console.log(Y1_formula);
    result_copy = result_copy+"\n\n"+`Коэффициент эмиттерной инжекции при инверсном включении:\n`+Y1_formula+``;
    let Y1_text = `Коэффициент эмиттерной инжекции при инверсном включении:\n\n`+
    katex.renderToString(Y1_formula);

    let aN_formula = `α_N = χ*γ_N = ${e2x(X)}*${e2x(YN)} = ${e2x(aN)}`;
    console.log(aN_formula);
    result_copy = result_copy+"\n\n"+`Коэффициент усиления транзистора по току в схеме с общей базой при нормальном включении:\n`+aN_formula+``;
    let aN_text = `Коэффициент усиления транзистора по току в схеме с общей базой при нормальном включении:\n\n`+
    katex.renderToString(aN_formula);

    let a1_formula = `α_I = χ*γ_I = ${e2x(X)}*${e2x(Y1)} = ${e2x(a1)}`;
    console.log(a1_formula);
    result_copy = result_copy+"\n\n"+`Коэффициент усиления транзистора по току в схеме с общей базой при инверсном включении:\n`+a1_formula+``;
    let a1_text = `Коэффициент усиления транзистора по току в схеме с общей базой при инверсном включении:\n\n`+
    katex.renderToString(a1_formula);

    let J1eo_formula = `J’_{ЭО} = q*S*n_i^2*(\\frac{D_n}{X_Б*N_Б}+\\frac{D_p}{X_Э*N_Э}) = \
    ${e2x(q)}*${e2x(S)}*${e2x(Math.pow(ni,2))}*(\\frac{${e2x(Dn)}}{${e2x(Xb)}*${e2x(Nb)}}+\\frac{${e2x(Dp)}}{${e2x(Xe)}*${e2x(Ne)}}) = ${e2x(J1eo)}`;
    console.log(J1eo_formula);
    result_copy = result_copy+"\n\n"+`Обратный ток БЭ перехода:\n`+J1eo_formula+` А`;
    let J1eo_text = `Обратный ток БЭ перехода:\n\n`+
    katex.renderToString(J1eo_formula+` А`);

    let J1ko_formula = `J’_{КО} = q*S*n_i^2*(\\frac{D_n}{X_Б*N_Б}+\\frac{D_p}{X_К*N_К}) = \
    ${e2x(q)}*${e2x(S)}*${e2x(Math.pow(ni,2))}*(\\frac{${e2x(Dn)}}{${e2x(Xb)}*${e2x(Nb)}}+\\frac{${e2x(Dp)}}{${e2x(Xk)}*${e2x(Nk)}}) = ${e2x(J1ko)}`;
    console.log(J1ko_formula);
    result_copy = result_copy+"\n\n"+`Обратный ток БК переход:\n`+J1ko_formula+` А`;
    let J1ko_text = `Обратный ток БК перехода:\n\n`+
    katex.renderToString(J1ko_formula)+` А`;


    let Jeo_formula = `J_{ЭО} = (1- α_N* α_I)* J’_{ЭО} = \
    (1- ${e2x(aN)}* ${e2x(a1)})* ${e2x(J1eo)} = ${e2x(Jeo)}`;
    console.log(Jeo_formula);
    result_copy = result_copy+"\n\n"+`Тепловой ток БЭ перехода:\n`+Jeo_formula+` А`;
    let Jeo_text = `Тепловой ток БЭ перехода:\n\n`+
    katex.renderToString(Jeo_formula)+` А`;

    let Jko_formula = `J_{КО} = (1- α_N* α_I)* J’_{КО} = \
    (1- ${e2x(aN)}* ${e2x(a1)})* ${e2x(J1ko)} = ${e2x(Jko)}`;
    console.log(Jko_formula);
    result_copy = result_copy+"\n\n"+`Тепловой ток БК перехода:\n`+Jko_formula+` А`;
    let Jko_text = `Тепловой ток БК перехода:\n\n`+
    katex.renderToString(Jko_formula)+` А`;

    let Jk_formula = `J_К= α_N*J_Э- J_{КО}*(e^{\\frac{V_{БК}}{φT}}-1) = \
    ${e2x(aN)}*${e2x(Ie)} - ${e2x(Jko)}*(e^{\\frac{${e2x(Vbk_dop)}}{${e2x(ft)}}}-1) = ${e2x(Jk)}`; //${e2x(Vbk)} = 2
    console.log(Jk_formula);
    result_copy = result_copy+"\n\n"+`Ток коллектора при VБК=${Vbk_dop} В:\n`+Jk_formula+` мA`;
    let Jk_text = `Ток коллектора при VБК=${Vbk_dop} В:\n\n`+ //${Vbk}=2
    katex.renderToString(Jk_formula)+` мA`;

    let Vbe_formula = `V_{БЭ}= φ_T*ln(\\frac{J_Э}{J’_{ЭО}}+1+α_N*e^{\\frac{V_{БК}}{φ_T}}-1) = \
    ${e2x(ft)}*ln(\\frac{${e2x(Ie)}}{${e2x(J1eo)}}+1+${e2x(aN)}*e^{\\frac{${e2x(Vbk_dop)}}{${e2x(ft)}}}-1)=${e2x(Vbe)}`;
    console.log(Vbe_formula);
    result_copy = result_copy+"\n\n"+`Напряжение на БЭ переходе:\n`+Vbe_formula+` В`;
    let Vbe_text = `Напряжение на БЭ переходе:\n\n`+
    katex.renderToString(Vbe_formula)+` В`;

    let Vbk_formula = `V_{БК}= φ_T*ln({1+\\frac{α_N*J_Э}{J_{КО}}}) = \
    ${e2x(ft)}*ln({1+\\frac{${e2x(aN)}*${e2x(Ie)}}{${e2x(Jko)}}}) = ${e2x(Vbk_2)}`;
    console.log(Vbk_formula);
    result_copy = result_copy+"\n\n"+`Напряжение на БК переходе:\n`+Vbk_formula+` В`;
    let Vbk_text = `Напряжение на БК переходе:\n\n`+
    katex.renderToString(Vbk_formula)+`В`;









    let goten_vars = `Условия: \\\\Iэ = ${e2x(Ie)} A\\qquad T = ${e2x(T)}K\\\\
                N_Б = ${e2x(Nb)}м^{-3} \\qquad N_э = ${e2x(Ne)}м^{-3} \\qquad N_К = ${e2x(Nk)}м^{-3}\\\\
                μ_n = ${e2x(mn)}м^{2}/B*c \\qquad μ_p = ${e2x(mp)}м^{2}/B*c\\\\
                \\tau = ${e2x(tau)}c\\\\
                W_Б = ${e2x(Wb)}м \\qquad X_к = ${e2x(Xk)}м \\qquad X_Э = ${e2x(Xe)}м\\\\
                S = ${e2x(S)}м^{-3} \\qquad V_{БК} = ${e2x(Vbk)}B\\\\
                n_i = ${e2x(ni)}м^{-3} \\qquad ε = ${e2x(E)}(${this.pp_material})\\\\`;
    goten_vars = katex.renderToString(goten_vars);

    let result = ft_text+"\n\n"+Vk_text+"\n\n"+d_text+"\n\n"+
        db_text+"\n\n"+dk_text+"\n\n"+Xb_text+"\n\n"+Dn_text+"\n\n"+
        Dp_text+"\n\n"+X_text+"\n\n"+YN_text+"\n\n"+
        Y1_text+"\n\n"+aN_text+"\n\n"+a1_text+"\n\n"+J1eo_text+"\n\n"+
        J1ko_text+"\n\n"+Jeo_text+"\n\n"+Jko_text+"\n\n"+
        Jk_text+"\n\n"+Vbe_text+"\n\n"+Vbk_text;
    let practice_text = document.getElementById('practice_text');
    practice_text.innerHTML = goten_vars+"\n\n\n"+result; //katex.renderToString(result)
    document.getElementById('practice_text_div').classList.remove("is-hidden")

    //katex.render("c = \\pm\\sqrt{a^2 + b^2}", practice_text);
    //katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
    /*graphic_y = [{
                x: Vbk_dop,
                y: Jk
            }, {
                x: 0,
                y: Jk
            }, {
                x: Vbk,
                y: 0
            }];*/
    let graphic_x = [];
    let graphic_y = [];
    let graphic_apr = 2;
    let graphic_left_value = -3;
    let graphic_right_value = 3;
    let graphic_length = Math.abs(graphic_right_value)+Math.abs(graphic_left_value);
    let graphic_step = (graphic_length)/(graphic_length*graphic_apr);
    let graphic_max_y = Jk*2;
    let graphic_max_x = E==16 ? 0.5 : 1;
    let graphic_min_y = ((aN*Ie)-(Jko*(Math.exp((graphic_max_x)/ft)-1)));
    //let graphic_min_y = -1.5;
    //console.log("my min is "+graphic_min_y)
    for(let i=graphic_left_value;i<=graphic_right_value;i+=graphic_step) {
        graphic_x.push(i);
        let gr_Jk = (aN*Ie)-(Jko*(Math.exp((i)/ft)-1));
        console.log(i+" : "+gr_Jk);
        /*if(gr_Jk<-10&&gr_Jk>-500) {
            graphic_min_y=gr_Jk;
            graphic_max_x=i;
        }*/
        if(i>graphic_max_x) gr_Jk=NaN;
        if(gr_Jk<graphic_min_y) gr_Jk=graphic_min_y; //graphic_min_y
        graphic_y.push(gr_Jk);
    }
    //graphic_y = [Jk, Jk, Jk, Jk, Jk, Jk, "0.5","1", 0, 0, 0];
    draw_graphic(graphic_x, graphic_y, graphic_min_y, graphic_max_y);


    this.message = "Расчеты завершены";
    /*document.getElementById("copy_text_button").style.display = "inline";
    document.getElementById("open_graphic_button").style.display = "inline";
    document.getElementById("graphic_func_button").style.display = "inline";*/
    //document.querySelector("copy_text_button").classList.toogle("is-hidden");
    document.getElementById("copy_text_button").classList.remove("is-hidden");
    document.getElementById("open_graphic_button").classList.remove("is-hidden");
    document.getElementById("graphic_func_button").classList.remove("is-hidden");

    let copy_text = document.getElementById("copy_text");
    /*let result_copy = ft_formula+"\n\n"+Vk_formula+"\n\n"+d_formula+"\n\n"+
        db_formula+"\n\n"+dk_formula+"\n\n"+Xb_formula+"\n\n"+Dn_formula+"\n\n"+
        Dp_formula+"\n\n"+X_formula+"\n\n"+YN_formula+"\n\n"+
        Y1_formula+"\n\n"+aN_formula+"\n\n"+a1_formula+"\n\n"+J1eo_formula+"\n\n"+
        J1ko_formula+"\n\n"+Jeo_formula+"\n\n"+Jko_formula+"\n\n"+
        Jk_formula+"\n\n"+Vbe_formula+"\n\n"+Vbk_formula;*/
    let goten_vars_copy = `Условия:\n Iэ = ${e2x(Ie)} A  T = ${e2x(T)}K
                N_Б = ${e2x(Nb)}м^{-3} N_э = ${e2x(Ne)}м^{-3} N_К = ${e2x(Nk)}м^{-3}
                μ_n = ${e2x(mn)}м^{2}/B*c μ_p = ${e2x(mp)}м^{2}/B*c
                \\tau = ${e2x(tau)}c
                W_Б = ${e2x(Wb)}м X_к = ${e2x(Xk)}м X_Э = ${e2x(Xe)}м
                S = ${e2x(S)}м^{-3} V_{БК} = ${e2x(Vbk)}B
                n_i = ${e2x(ni)}м^{-3} ε = ${e2x(E)}(${this.pp_material})`;
    copy_text.value = goten_vars_copy+"\n\n\n"+result_copy;

    this.graphic_func = `((${e2p(aN)})*(${e2p(Ie)}))-((${e2p(Jko)})*(exp((x)/(${e2p(ft)}))-1))`;
    this.graphic_url = "https://umath.ru/calc/graph/?&scale=0.1;0&func="+this.graphic_func.replace(/\^/g, "%5E");

}

function copy_text_to_bf() {
    let copy_text = document.getElementById("copy_text");
    copy_text.style.display = "inline";
    copy_text.select();
    document.execCommand("copy");
    copy_text.style.display = "none";
}

function open_graphic() {
    //console.log(aN+" "+Ie+" "+Jko+" "+ft);
    //let graphic_url = "https://umath.ru/calc/graph/?&scale=5;2&func="+`(${e2p(aN)}*${e2p(Ie)})-(${e2p(Jko)}*(exp((x)/${e2p(ft)})-1));` // ^ = 5e
    window.open(this.graphic_url);
    /*const { shell } = require('electron')
    shell.openExternal(graphic_url)*/
}

function get_graphic_func() {
    let text = `Вы можете удобно настроить график на <strong>yotx.ru</strong>. \
    функция: ${this.graphic_func}`
    notification(text, "Закрыть");
}

function notification(text, button_text) {
    let notification_div = document.getElementById("notification_div");
    let notification_text_p = document.getElementById("notification_text_p");
    let notification_button = document.getElementById("notification_button");
    //notification_div.style.display = "block";
    notification_div.classList.add("is-active")
    notification_text_p.innerHTML = text;
    notification_button.innerHTML = button_text;
    notification_button.addEventListener("click", (event)=>notification_div.classList.remove("is-active"));
    console.log("notification: "+text);
}

function e2p(exp_num) {
    let tex_num = e2x(exp_num);
    tex_num = tex_num.replace(/{/g,"(").replace(/}/g, ")");
    return tex_num;
}

function e2x(exp_num) { //exponent form to tex
    if(isNaN(exp_num)) {
        console.log("incorrect data");
        this.message = "Некорректные данные";

    }
    let dec_num = (+exp_num);
    //let dec_num = parseFloat((+exp_num).toFixed(7));
    if(!dec_num.toString().includes("e")) {
        //dec_num = parseFloat((dec_num).toFixed(7));
        dec_num = trunc_zeros(dec_num);
        console.log(dec_num);
        return dec_num;
    }
    let mo = dec_num.toString().split("e");
    m = parseFloat((+(mo[0])).toFixed(7));
    o = +(mo[1].replace(/\+/g, ""));
    return (m+"*{10}^{"+o+"}");
}

function trunc_zeros(num) {
    console.log("trunc_zeros : "+num);
    m = +num; //mantissa
    let o = 0; //order
    while(m%10==0&&m!=0) {
        m=m/10;
        o++;
    }

    while(Math.abs(m)<1&&m!=0) {
        m=m*10;
        o--;
    }

    m = parseFloat((m).toFixed(7));
    if(m==1) {
        return ("{10}^{"+o+"}");
    }
    if(!!!o) {
        return (m);
    } else {
        return (m+"*{10}^{"+o+"}");
    }
    
}

function fill_fields() {
    /*document.getElementById('Ie_var').value = 9;
    document.getElementById('T_var').value = 300;
    document.getElementById('Nb_var').value = 2;
    document.getElementById('Ne_var').value = 3;
    document.getElementById('Nk_var').value = 1.1;
    document.getElementById('mn_var').value = 2000;
    document.getElementById('mp_var').value = 900;
    document.getElementById('tau_var').value = 0.3;
    document.getElementById('Wb_var').value = 7.5;
    document.getElementById('Xk_var').value = 9;
    document.getElementById('Xe_var').value = 12;
    document.getElementById('S_var').value = 7;
    document.getElementById('Vbk_var').value = 2;

    document.getElementById('Nb_var_o').value = 17;
    document.getElementById('Ne_var_o').value = 18;
    document.getElementById('Nk_var_o').value = 16;
    document.getElementById('S_var_o').value = -5;*/
    document.getElementById('Ie_var').value = 12;
    document.getElementById('T_var').value = 300;
    document.getElementById('Nb_var').value = 4;
    document.getElementById('Ne_var').value = 8;
    document.getElementById('Nk_var').value = 3;
    document.getElementById('mn_var').value = 1900;
    document.getElementById('mp_var').value = 770;
    document.getElementById('tau_var').value = 0.17;
    document.getElementById('Wb_var').value = 7;
    document.getElementById('Xk_var').value = 15;
    document.getElementById('Xe_var').value = 12;
    document.getElementById('S_var').value = 6;
    document.getElementById('Vbk_var').value = 2;

    document.getElementById('Nb_var_o').value = 15;
    document.getElementById('Ne_var_o').value = 16;
    document.getElementById('Nk_var_o').value = 15;
    document.getElementById('S_var_o').value = -5;
}

function validate_var(event) {
  event = event || window.event;
  if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
    return false;
}

function draw_graphic(graphic_x, graphic_y, y_min, y_max) {
    let ctx = document.getElementById('practice_graphic');

    colors = ["#00FFFF", "#7FFFD4", "#A52A2A", "#DC143C", "#006400", 
    "#FF69B4", "#90EE90", "#FF00FF", "#000080", "#663399", "#FF6347", "#ff0000", "#ff0000","#00ff00","#0000ff"];

    let graphic_data = {
        labels: graphic_x,
        datasets: [{
            label: "Зависимость Jк от Vбк",
            data: graphic_y,
            fill: false,
            borderColor: colors[Math.floor(Math.random()*colors.length)],
            cubicInterpolationMode: "monotone",
        }]
    };
 
    var graphic_options = {
        scales: {
            xAxes: [{}],
            yAxes: [{
                ticks: {
                    min: y_min,
                    //max: y_max,
                },
            }]
        },
    };


    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: graphic_data,
        options: graphic_options
    });
}

function test() {
    let ctx = document.getElementById('practice_graphic');
    var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});
}