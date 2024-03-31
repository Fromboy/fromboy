/**********************************************
> 2024-03-31
> 伪装影视软件555去广告lively elephant
> 特别提醒：如需转载请注明出处，谢谢合作！
> 脚本说明：去除首页轮播图广告、首页信息流广告、我的页面推广、缩短开屏广告倒计时


[rewrite_local]

^https?:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){1,3}(:\d+)?\/api\/v\d\/movie\/index_recommend url script-response-body https://github.com/ddgksf2013/Scripts/raw/master/555Ad.js
^https?:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){1,3}(:\d+)?\/api\/v\d\/advert url reject-200

[mitm]

hostname = *.qyfxgd.cn, *.weilai555.com, *.ecoliving168.com

**********************************************/





let obj=JSON.parse($response.body);obj.data=obj.data.filter(t=>"advert_self"!==t.layout),obj.data.forEach(t=>{t.list=t.list.filter(t=>3!==t.type)}),$done({body:JSON.stringify(obj)});
