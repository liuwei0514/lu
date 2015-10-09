<!DOCTYPE html>
<?php

$appId = 'wx138e70a07139c1c9';
$appsecret = 'd4814128cef059527f67b127335c30d4';

$timestamp = time();
$jsapi_ticket = make_ticket($appId,$appsecret);
$nonceStr = make_nonceStr();
$url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$signature = make_signature($nonceStr,$timestamp,$jsapi_ticket,$url);

function make_nonceStr()
{
    $codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for ($i = 0; $i<16; $i++) {
        $codes[$i] = $codeSet[mt_rand(0, strlen($codeSet)-1)];
    }
    $nonceStr = implode($codes);
    return $nonceStr;
}

function make_signature($nonceStr,$timestamp,$jsapi_ticket,$url)
{
    $tmpArr = array(
    'noncestr' => $nonceStr,
    'timestamp' => $timestamp,
    'jsapi_ticket' => $jsapi_ticket,
    'url' => $url
    );
    ksort($tmpArr, SORT_STRING);
    $string1 = http_build_query( $tmpArr );
    $string1 = urldecode( $string1 );
    $signature = sha1( $string1 );
    return $signature;
}

function make_ticket($appId,$appsecret)
{
    // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode(file_get_contents("access_token.json"));
    if ($data->expire_time < time()) {
        $TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appId."&secret=".$appsecret;
        $json = file_get_contents($TOKEN_URL);
        $result = json_decode($json,true);
        $access_token = $result['access_token'];
        if ($access_token) {
            $data->expire_time = time() + 7000;
            $data->access_token = $access_token;
            $fp = fopen("access_token.json", "w");
            fwrite($fp, json_encode($data));
            fclose($fp);
        }
    }else{
        $access_token = $data->access_token;
    }

    // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
    $data = json_decode(file_get_contents("jsapi_ticket.json"));
    if ($data->expire_time < time()) {
        $ticket_URL="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$access_token."&type=jsapi";
        $json = file_get_contents($ticket_URL);
        $result = json_decode($json,true);
        $ticket = $result['ticket'];
        if ($ticket) {
            $data->expire_time = time() + 7000;
            $data->jsapi_ticket = $ticket;
            $fp = fopen("jsapi_ticket.json", "w");
            fwrite($fp, json_encode($data));
            fclose($fp);
        }
    }else{
        $ticket = $data->jsapi_ticket;
    }

    return $ticket;
}

?>

<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>看到</title>
    <!-- Bootstrap -->
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link href="css/css.css" rel="stylesheet">
    <!-- <link href="css/bootstrap.min.css" rel="stylesheet"> -->
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</head>

<body class="index2">
    <div class="logo">
        <img src="images/logo2.jpg" alt="">
    </div>
    <div class="container">
        <div class="app-rewards-color">
            <h4 class="title">您已领取的返利余额</h4>
            <div>
                <span id="amount">0</span>元
            </div>
        </div>
        <table class="table table-condensed" id="list">
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="modal fade " id="myModal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" style="color:#5cb85c;">恭喜您，<br>您可以开通客户端啦！</h4>
                </div>
                <div class="modal-body">
                    <p style="text-indent:2em;">会员现金返利是根据您上月的购物浏览记录以及购买商品的积分和部分返利进行大数据综合评估而得，
                    每月月底我们都将现金返利计入您的会员客户端。请及时领取，逾期作废！</p>
                    <a role="button" href="#" id="btn-download" class="btn btn-success disabled">下载您的客户端</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <script id="tr-template" type="text/x-handlebars-template">
        {{#each rewards}}
        <tr class="warning">
            <td>{{year}}.{{month}}</td>
            <td>{{amount}}元</td>
            <td><span class="row-{{type}}">
                    {{#if_eq type "valid"}}
                        领取
                    {{else}}
                    {{/if_eq}}
                    {{#if_eq type "expired"}}
                        已过期
                    {{else}}
                    {{/if_eq}}
                    {{#if_eq type "invalid"}}
                        未结算
                    {{else}}
                    {{/if_eq}}
                </td> 
            </tr>
        {{/each}}
    </script>

    <div id="mybackdrop" class="modal-backdrop fade in" style="display:none;">
    </div>
    <img id="mytip" src="images/tip.png" width="80%" alt="" style="display:none;position: absolute; z-index:1111; top: 0; right: 0; width: 90%;">

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <!-- <script src="js/bootstrap.min.js"></script> -->
    <script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="http://cdn.bootcss.com/handlebars.js/4.0.2/handlebars.min.js"></script>

    <script>
      /*
       * 注意：
       * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
       * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
       * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
       *
       * 如有问题请通过以下渠道反馈：
       * 邮箱地址：weixin-open@qq.com
       * 邮件主题：【微信JS-SDK反馈】具体问题
       * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
       */
        wx.config({
            debug: false,
            appId: '<?=$appId?>',
            timestamp: <?=$timestamp?>,
            nonceStr: '<?=$nonceStr?>',
            signature: '<?=$signature?>',
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]
        });
    </script>
    <script>
function shared(){

    $('#mytip').hide();
    $('#mybackdrop').hide();

    $('#myModal').modal({backdrop:"static"});
    $('#myModal').on('shown.bs.modal', function() {
        $(this).find('.modal-dialog').css({
            'margin-top': function () {
                return ($(this).outerHeight() / 2);
            },
        });
    });
	$("#btn-download").removeClass('disabled');
}

var link = "http://800-taobao.com/wx/index.html"+location.hash;

wx.ready(function(){
	wx.onMenuShareTimeline({
	    title: '看到',
		link: link,
		imgUrl: 'http://800-taobao.com/wx/LOGO108.png',
	    success: function (res) {
			shared();
		}
	});
	wx.onMenuShareAppMessage({
		title: '看到',
		desc: '“看到”app是一款网购人群分享购物心得和购物信息的互动性APP，为APP使用者提供有效的购物信息。并集成了各大购物平台的打折促销商品，方便使用者购买。',
		link: link,
		imgUrl: 'http://800-taobao.com/wx/LOGO108.png',
		success: function (res) {
			shared();
		}
	});
});

    //显示用户的返利、提示分享

    //根据用户id获取返利信息
    //微信分享js 分享成功后出现app下载链接 （这里有下载统计）

    var urlRoot = "http://data.800-taobao.com/api/v2/";
    // var urlRoot = "http://localhost:3000/api/v2/";

    Handlebars.registerHelper('if_eq', function(a, b, opts) {
        if(a == b) // Or === depending on your needs
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
    $.support.transition = false;

    jQuery(document).ready(function($) {

        $("#list").delegate('.row-valid', 'click', function(event) {
            $('#mytip').show();
            $('#mybackdrop').show();
        }); 
        var userid = location.hash.replace("#", "");
        $.get(urlRoot + 'Reward' + "/" + userid, function(data, textStatus, xhr) {
            /*optional stuff to do after success */
            var source   = $("#tr-template").html();
            var template = Handlebars.compile(source);

            var rewards = [];
            
            for (var i = data.rewards.length - 1; i >= 0; i--) {
                rewards.push(data.rewards[i]);
            };
            var amount = data.rewards[0].amount;
            data.rewards = rewards;

            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth()+2;
            var reward = {
                "amount": 0,
                "month": month,
                "year": year,
                "type": "invalid"
            };
            data.rewards.push(reward);
            // $("#amount").html(amount);
            var html    = template(data);
            $("#list tbody").html(html);

        });
    });
    </script>
</body>

</html>
