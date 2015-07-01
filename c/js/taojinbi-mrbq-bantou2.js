KISSY.add("taojinbi-mrbq-bantou", function(c, b, e, d, a) {
    function f(i, h) {
        var j = b.all;
        KISSY.getScript("http://www.taobao.com/go/rgn/try/service-time.php?rand=" + (new Date()).getTime(), function() {
            function l() {
                var r = window.serverDate.getFullYear();
                var s = window.serverDate.getMonth() + 1;
                var q = window.serverDate.getDate();
                var p = window.serverDate.getHours();

                function o(w) {
                    var v = w.replace(/:/g, "-");
                    v = v.replace(/ /g, "-");
                    var t = v.split("-");
                    var u = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3] - 8, t[4], t[5]));
                    return parseInt(u.getTime() / 1000)
                }
                var n = Math.round(window.serverDate.getTime() / 1000);
                var m = "";
				var countDown = +((+new Date())+88700000);
                var now = new Date();
                // if(now.getHours()>0 && now.getHours()< 3){
                //     now.setDate(now.getDate()+2);
                //     countDown = +new Date(now.toDateString());
                // }else{
                // if(now.getHours()>0 && now.getHours()< 3){
                //     now.seth(now.getHours()+2);
                //     countDown = +new Date(now.toDateString());
                // }else{
                // if(now.getHours()>=3 && now.getHours()< 6){
                //     now.setDate(now.getDate()+2);
                //     countDown = +new Date(now.toDateString());
                // }else{
                // if(now.getHours()>=6 && now.getHours()< 9){
                //     now.setDate(now.getDate()+2);
                //     countDown = +new Date(now.toDateString());
                // }else{
                // 	now.setDate(now.getDate()+1);
                // 	countDown = +new Date(now.toDateString());
                // 	//countDown = +new Date(now.toDateString()+" 23:59:59");
                // }

                    now.setHours(now.getHours()+2);
                    now.setMinutes(now.getMinutes()+26);
                    //countDown = +new Date(now.toDateString());
                    countDown = +now;

				var t = {
					countDown:countDown,
					// countDown:+((+new Date())+86400000),
					H: "23",
					def: "10"
				};

				j("#J_startime").html(t.def);
                if (t.H < t.def) {
                    j(h).addClass("start");
                    j(".jrsx").addClass("jjkx")
                } else {}
                m = '{"leftTime":"' + (t.countDown / 1000 - n) + '","effect":"slide"}';
                j(".djs").attr("data-config", m);
                j(".djs").each(function(v, u) {
                    var w = e({
                        el: v,
                        clock: ["d", 100, 2, "h", 100, 2, "m", 60, 2, "s", 60, 2, "u", 10, 1]
                    });
                    w.notify(0, function() {
                        c.all(v).html("")
                    })
                })

            }
            l()
        });
        var k = 500;
        if (d.ipad > 0) {
            j("#J_SiteNav").hide();
            j("#header").hide();
            j(".footer_2014").hide()
        } else {
            if (d.android > 0) {
                j("#J_SiteNav").hide();
                j("#header").hide();
                j(".footer_2014").hide()
            } else {
                j(window).on("scroll", function() {
                    var l = j(window).scrollTop();
                    if (l >= k) {
                        j(".hand", j(".floatnav")).height(51);
                        j(".floatnav").fadeIn(0.5)
                    } else {
                        j(".floatnav").fadeOut(0.5)
                    }
                })
            }
        }

        function g() {
            var m, l;
            m = document.title;
            l = document.location.href;
            if (window.sidebar) {
                window.sidebar.addPanel(m, l, "")
            } else {
                if (document.all) {
                    window.external.addFavorite(l, m)
                } else {
                    alert('\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff0c\u60a8\u53ef\u4ee5\u6309\u4e0b"Ctrl+d"\u952e\u52a0\u5165\u6536\u85cf\uff01')
                }
            }
            return false
        }
        document.getElementById("j_shou").onclick = function() {
            g()
        }
    }
    return f
}, {
    requires: ["node", "gallery/countdown/1.3/index", "ua", "io"]
});
KISSY.add("taojinbi-mrbq-jrsx-jdtpx", function(d, c, a, b, e) {
    function f(i, h) {
        var j = c.all;
        var g = j(".tpl", h).html();
        j(".PreItemUl", j(h)).each(function(t, B) {
            var o = j(t);
            var u = (function(M, J) {
                var I = M;
                var L = new b(J);

                function K(O) {
                    var N = L.render(O);
                    I.html(N)
                }
                return {
                    render: K
                }
            })(o, g);

            function l(K) {
                var J = {
                    data: []
                };
                var L = K.items;
                for (var I = 0; I < L.length; I++) {
                    if (L[I].isPostFree) {
                        isPostFree = "\u5305\u90ae"
                    } else {
                        isPostFree = ""
                    }
                    L[I].onlineQuantity = L[I].onlineQuantity == null ? (parseInt(L[I].quantity) + L[I].item_trade_num) : L[I].onlineQuantity;
                    J.data[I] = {
                        itemid: L[I].item_id,
                        img: L[I].item_pic,
                        isPostFree: isPostFree,
                        ysbfb: parseInt((L[I].onlineQuantity - L[I].quantity) / (parseInt(L[I].onlineQuantity)) * 100),
                        xlnum: parseInt(L[I].onlineQuantity),
                        kc: parseInt(L[I].quantity),
                        lsprice: (L[I].leasePrice / 100).toFixed(2),
                        howNum: L[I].item_trade_num,
                        title: L[I].item_title,
                        xprice: L[I].item_current_price,
                        prc: parseInt(L[I].item_current_price),
                        sprc: "." + (L[I].item_current_price.toString().split(".")[1] || 0),
                        prced: L[I].item_price,
                        zk: L[I].item_discount,
                        di: L[I].item_dijia,
                        shopLogo: L[I].item_shopLogo,
                        point1: L[I].item_point1,
                        point2: L[I].item_point2,
                        point3: L[I].item_point3 ? L[I].item_point3.replace("|", "<br>") : L[I].item_point3,
                        isAndPay: L[I].item_isAndPay,
                        itemPhoto: L[I].item_photo
                    }
                }
                return J
            }
            var z = o.attr("sIdList"),
                n = o.attr("cIdList"),
                F = o.attr("iList"),
                H = o.attr("pf"),
                k = o.attr("coinPrFl"),
                m = o.attr("coinPrCe"),
                C = o.attr("salesFl"),
                v = o.attr("saleCe"),
                r = o.attr("disFl"),
                y = o.attr("disCe"),
                q = o.attr("disPrFl"),
                s = o.attr("disPrCe"),
                G = o.attr("sizeNum"),
                E = o.attr("sort"),
                A = o.attr("st"),
                x = o.attr("modSize");
            var p = "http://ajax.taojinbi.taobao.com/";

            function D(J) {
                var I = p + "item/get_subject_item_list.do";
                new a({
                    url: I,
                    dataType: "jsonp",
                    data: {
                        sIdList: z,
                        cIdList: n,
                        iList: F,
                        pf: H,
                        coinPrFl: k,
                        coinPrCe: m,
                        salesFl: C,
                        saleCe: v,
                        disFl: r,
                        disCe: y,
                        disPrFl: q,
                        disPrCe: s,
                        size: G,
                        sort: E,
                        st: A,
                        modSize: x,
                        startTimeFl: 0,
                        startTimeCe: 0,
                        hasLesPr: 1
                    },
                    success: function(K) {
                        if (K.items) {
                            J(K)
                        } else {
                            o.html("\u8be5\u6d3b\u52a8\u5df2\u4e0b\u7ebf\uff01");
                            d.one(".taojinbi-mrbq-jrsx-jdtpx").hide();
                            return false
                        }
                    },
                    error: function() {
                        o.html("\u8be5\u6d3b\u52a8\u5df2\u4e0b\u7ebf\uff01");
                        d.one(".taojinbi-mrbq-jrsx-jdtpx").hide()
                    }
                })
            }

            function w() {
                var I = [];
                D(function(P) {
                    var O = l(P);
                    for (var N = 0; N < O.data.length; N++) {
                        I[N] = {
                            value: O.data[N].ysbfb,
                            index: N
                        }
                    }
                    I.sort(function(R, Q) {
                        return R.value < Q.value ? 1 : -1
                    });
                    var M = [];
                    for (var N = 1; N < O.data.length; N++) {
                        M[N - 1] = I[N]
                    }
                    var K = 0;
                    for (var N = 0; N < M.length - 1; N++) {
                        for (var L = 0; L < M.length - 1 - N; L++) {
                            if (M[L]["value"] >= 100) {
                                K = M[L];
                                M[L] = M[L + 1];
                                M[L + 1] = K
                            }
                        }
                    }
                    for (var N = 0; N < M.length; N++) {
                        I[N + 1] = M[N]
                    }
                    var J = [];
                    for (var L = 0; L < O.data.length; L++) {
                        J[L] = O.data[I[L].index]
                    }
                    O.data = J;
                    u.render(O);
                    new e()
                })
            }
            w()
        });
        j(".lnav").hide();
        j(".m-tab").each(function(l, k) {
            j(l).on("click", function() {
                if ((k + 1) % 2 == 1) {
                    j("#jrth").show();
                    j(".m-box").hide();
                    j(".jrsx").show();
                    j(".m-nav").attr("class", "m-nav m-0");
                    j(".lnav").hide()
                } else {
                    j("#jrth").hide();
                    j(".m-box").hide();
                    j(".mryg").show();
                    j(".m-nav").attr("class", "m-nav m-1");
                    j(".lnav").hide();
                    j(".lnav").item(j(".lnav").length - 1).show()
                }
                new e()
            })
        });
        j(".lnavjrsx").on("click", function() {
            j(".lnav").hide();
            d.DOM.get(".xmPreItem-main").scrollIntoView();
            j(".m-nav").attr("class", "m-nav m-0");
            j("#jrth").show();
            j(".m-box").hide();
            j(".jrsx").show()
        })
    }
    return f
}, {
    requires: ["node", "io", "xtemplate", "datalazyload"]
});
KISSY.add("taojinbi-mrbq-jryh", function(c, a, b) {
    function d(g, f) {
        var h = b.all;
        var e = c.one(".PreItemUl", f);
        c.use("xtemplate,datalazyload", function(m, n, q) {
            var G = h("#tpl1", f).html();
            var t = (function(L, I) {
                var H = L;
                var K = new n(I);

                function J(N) {
                    var M = K.render(N);
                    H.html(M)
                }
                return {
                    render: J
                }
            })(e, G);

            function j(J) {
                var I = {
                    data: []
                };
                var K = J.items;
                for (var H = 0; H < K.length; H++) {
                    if (K[H].isPostFree) {
                        isPostFree = "[\u5305\u90ae]"
                    } else {
                        isPostFree = ""
                    }
                    I.data[H] = {
                        itemid: K[H].item_id,
                        isPostFree: isPostFree,
                        img: K[H].item_pic,
                        howNum: K[H].item_trade_num,
                        title: K[H].item_title,
                        prc: parseInt(K[H].item_current_price),
                        sprc: "." + (K[H].item_current_price.toString().split(".")[1] || 0),
                        prced: K[H].item_price,
                        zk: K[H].item_discount,
                        di: K[H].item_dijia,
                        shopLogo: K[H].item_shopLogo,
                        point1: K[H].item_point1,
                        point2: K[H].item_point2,
                        point3: K[H].item_point3 ? K[H].item_point3.replace("|", "<br>") : K[H].item_point3,
                        isAndPay: K[H].item_isAndPay,
                        itemPhoto: K[H].item_photo
                    }
                }
                return I
            }
            var y = e.attr("sIdList"),
                l = e.attr("cIdList"),
                D = e.attr("iList"),
                F = e.attr("pf"),
                i = e.attr("coinPrFl"),
                k = e.attr("coinPrCe"),
                A = e.attr("salesFl"),
                u = e.attr("saleCe"),
                r = e.attr("disFl"),
                x = e.attr("disCe"),
                p = e.attr("disPrFl"),
                s = e.attr("disPrCe"),
                E = e.attr("sizeNum"),
                C = e.attr("sort"),
                z = e.attr("st"),
                w = e.attr("modSize");
            var o = "http://ajax.taojinbi.taobao.com/";

            function B(I) {
                var H = o + "item/get_subject_item_list.do";
                new a({
                    url: H,
                    dataType: "jsonp",
                    data: {
                        sIdList: y,
                        cIdList: l,
                        iList: D,
                        pf: F,
                        coinPrFl: i,
                        coinPrCe: k,
                        salesFl: A,
                        saleCe: u,
                        disFl: r,
                        disCe: x,
                        disPrFl: p,
                        disPrCe: s,
                        size: E,
                        sort: C,
                        st: z,
                        modSize: w,
                        startTimeFl: e.attr("startTimeFl"),
                        startTimeCe: e.attr("startTimeCe"),
                        hasLesPr: e.attr("hasLesPr"),
                        endTimeFl: e.attr("endTimeFl"),
                        endTimeCe: e.attr("endTimeCe")
                    },
                    success: function(J) {
                        if (J.items) {
                            I(J)
                        } else {
                            e.html("\u8be5\u6d3b\u52a8\u5df2\u4e0b\u7ebf\uff01");
                            m.one(".taojinbi-mrbq-jryh").hide();
                            return false
                        }
                    },
                    error: function() {
                        e.html("\u8be5\u6d3b\u52a8\u5df2\u4e0b\u7ebf\uff01");
                        m.one(".taojinbi-mrbq-jryh").hide()
                    }
                })
            }

            function v() {
                B(function(I) {
                    var H = j(I);
                    t.render(H);
                    new q()
                })
            }
            v()
        })
    }
    return d
}, {
    requires: ["io", "node"]
});
