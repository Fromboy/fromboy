/***********************************************
> 应用名称：
> 脚本作者：
> 微信账号：
> 更新时间：2024-02-03
> 通知频道：
> 贡献投稿：
> 问题反馈：
> 特别提醒：如需转载请注明出处，谢谢合作！
***********************************************/	

const version = 'V1.0.2';


function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}var modifiedHeaders=$request.headers;setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag",""),$done({headers:modifiedHeaders});