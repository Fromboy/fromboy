/******************************************
 * @name 𝐙𝐈𝐏𝐏𝐎会员中心
 * @update 20240702
 * @version 1.0.0
 ******************************************
脚本声明:
1. 本脚本仅用于学习研究，禁止用于商业用途
2. 本脚本不保证准确性、可靠性、完整性和及时性
3. 任何个人或组织均可无需经过通知而自由使用
4. 作者对任何脚本问题概不负责，包括由此产生的任何损失
5. 如果任何单位或个人认为该脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明、所有权证明，我将在收到认证文件确认后删除
6. 请勿将本脚本用于商业用途，由此引起的问题与作者无关
7. 本脚本及其更新版权归作者所有
******************************************
脚本说明:
 - 微信小程序搜索"ZIPPO会员中心" - 注册/登录 - 右上角 ··· - 重新进入小程序 - 点击 "我的"
 - 提示数据获取成功即可食用该脚本
 - 为防止不必要的麻烦, 获取完必要数据后请关闭重写
BoxJs订阅地址:
 - https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/boxjs.json
BoxJs订阅地址： - https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/boxjs.json
*****************************************
QuantumultX配置:
[mitm]
hostname = wx-center.zippo.com.cn
QuantumultX配置： [mitm] hostname = wx-center.zippo.com.cn
[rewrite_local]
# 𝐙𝐈𝐏𝐏𝐎会员中心获取Authorization
^https?:\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile url script-request-header https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js
[rewrite_local] # ZIPPO会员中心获取授权 ^https？：\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile url script-request-header https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js
[task_local]
0 6 * * * https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js, tag=𝐙𝐈𝐏𝐏𝐎会员中心签到, img-url=https://raw.githubusercontent.com/Yuheng0101/X/main/Assets/zippo.jpg, enabled=true
******************************************
Loon配置:
[MITM]
hostname = wx-center.zippo.com.cn
[task_local] 0 6 * * * https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js， tag=ZIPPO会员中心签到， img-url=https：//raw.githubusercontent.com/Yuheng0101/X/main/Assets/zippo.jpg， enabled=true ****************************************** Loon配置： [MITM] 主机名 = wx-center.zippo.com.cn
[Script]
http-request ^https?:\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile tag=𝐙𝐈𝐏𝐏𝐎会员中心获取Authorization, script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js,requires-body=0
[脚本] http-request ^https？：\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile tag=ZIPPO会员中心获取Authorization， script-path=https：//raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js，requires-body=0
cron "0 6 * * *" script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js, timeout=10, tag=𝐙𝐈𝐏𝐏𝐎会员中心签到, img-url=https://raw.githubusercontent.com/Yuheng0101/X/main/Assets/zippo.jpg
******************************************
Surge配置:
[MITM]
hostname = %APPEND% wx-center.zippo.com.cn
cron “0 6 * * *” script-path=https：//raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js， timeout=10， tag=ZIPPO会员中心签到， img-url=https：//raw.githubusercontent.com/Yuheng0101/X/main/Assets/zippo.jpg ****************************************** Surge配置： [MITM] hostname = %APPEND% wx-center.zippo.com.cn
[Script]
𝐙𝐈𝐏𝐏𝐎会员中心获取Authorization = type=http-request ^https?:\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js
[脚本] ZIPPO会员中心获取Authorization = type=http-request ^https？：\/\/wx-center\.zippo\.com\.cn\/api\/users\/profile，requires-body=0，max-size=0，script-path=https：//raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js
𝐙𝐈𝐏𝐏𝐎会员中心签到 = type=cron,cronexp=0 6 * * *,wake-system=1,script-path=https://raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js,timeout=60
******************************************
青龙配置:
# 是否开启调试模式
export ZIPPO_MP_DEBUG = 'false'
# 账号 => 多账号使用&分隔 注意要去掉Bearer前缀
export ZIPPO_MP_AUTH = 'AUTH1&AUTH2'
******************************************/
const SCRIPT_NAME = '𝐙𝐈𝐏𝐏𝐎'
const CACHE_BEGIN = `ZIPPO_MP`
const NAMESPACE = 'ONZ3V'
const VERSION = '1.0.0'
const $ = new Env(SCRIPT_NAME, {
    apis: apis$1(),
    utils: utils$1()
})
typeof require !== 'undefined' && require('dotenv').config()
$.logLevel = $.toObj($.utils.getEnv('debug')) ? 'debug' : 'info'
// $.debug(`当前模式: ${$.logLevel === 'debug' ? '调试模式' : '日志模式'}`)
const AUTH_ARR = $.utils.getEnv('AUTH')?.split('&') || []
// $.debug(`缓存账号: ${$.toStr(AUTH_ARR)}`)
;(async () => {
    await $.utils.getNotice()
    await $.utils.getVersion('Tasks/zippo.js')
    $.utils.consoleMe()
    $.AUTH_ARR = $.utils.checkEnv(AUTH_ARR)
    $.debug(`有效账号: ${$.toStr($.AUTH_ARR)}`)
    if ($.utils.isRequest()) return $.utils.getAuth()
    if (!$.AUTH_ARR.length) return $.msg($.name, '未配置有效账号，请前往脚本设置中配置')
    for (let i = 0; i < $.AUTH_ARR.length; i++) {
        $.auth = 'Bearer '.concat($.AUTH_ARR[i].value)
        // 获取用户个人信息
        const userinfo = await $.apis.getUser()
        if (userinfo?.phone) {
            const memberLevel = userinfo.memberLevels.find((it) => it.levelCode === userinfo.memberLevel)
            $.message = `[${userinfo.phone}](${memberLevel.alias})`
            $.message += `\n有效期至: ${$.AUTH_ARR[i].expStr}`
            // 签到
            const signinResult = await $.apis.signin()
            $.debug($.toStr(signinResult))
            if (signinResult?.signInDate) {
                $.message += `\n签到结果: 签到成功${signinResult?.rewards?.[0]?.count && `，获得${signinResult.rewards[0].count}积分`}${
                    signinResult?.rewards?.[0]?.days && `，连续签到${signinResult.rewards[0].days}天`
                }`
            } else if (signinResult?.code === 'already_signed') {
                $.message += `\n签到结果: ${signinResult.message}`
            } else {
                $.message += `\n签到结果: ${signinResult}`
            }
            // 喜爱
            const collectResult = await $.apis.collect(1)
            if (collectResult?.favorited === true) {
                // console.log(collectResult)
                $.debug(`收藏成功`)
            }
            const receiveResult = await $.apis.receiveReward(5)
            $.debug($.toStr(receiveResult))
            if (receiveResult?.rewardValue > 0) {
                $.message += `\n领取结果: 获得${receiveResult.rewardValue}积分`
            } else if (receiveResult?.code) {
                $.message += `\n领取结果: ${receiveResult.message}`
            } else {
                $.message += `\n领取结果: ${receiveResult}`
            }
            // 取消喜爱
            const cancelCollectResult = await $.apis.collect(0)
            if (cancelCollectResult?.favorited === false) {
                // console.log(cancelCollectResult)
                $.debug(`取消收藏成功`)
            }
            // 获取用户积分
            const points = await $.apis.getPoints()
            $.message += `\n当前积分: ${points.balance}`
        } else {
            continue
        }
    }
    // $.log($.message)
    $.msg($.name, '', $.message)
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done({}))
function apis$1() {
    const baseURL = `https://wx-center.zippo.com.cn/`
    /**
     * 发起网络请求
     *
     * @param config 请求配置
     * @param config.url 请求的URL地址，支持相对路径，默认为空字符串
     * @param config.method 请求的HTTP方法，支持get、post等，默认为'get'
     * @param config.headers 请求头，默认为固定的请求头信息
     * @param config.body 请求体，支持对象类型，会自动转换为JSON字符串，默认为空字符串
     * @returns Promise<any> 返回Promise对象，resolve为请求响应结果，reject为错误信息
     */
    async function request() {
        const name = arguments[0]?.name || ''
        let url = arguments[0]?.url || ''
        if (!url) return Promise.reject(`请求链接必传!`)
        url = $.utils.mergeUrl(baseURL, url)
        let method = arguments[0]?.method ? arguments[0].method.toLocaleLowerCase() : arguments[1]?.toLocaleLowerCase() || 'get'
        let headers = {
            'x-environment': '',
            'content-type': 'application/json;charset=UTF-8',
            'x-platform-id': 'wxaa75ffd8c2d75da7',
            Authorization: $.auth,
            'x-platform-env': 'release',
            'x-app-id': 'zippo',
            'x-platform': 'wxmp',
            'accept-encoding': 'gzip,compress,br,deflate',
            'user-agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.49(0x18003137) NetType/WIFI Language/zh_CN'
        }
        if (arguments[0]?.headers) {
            Object.assign(headers, Object.fromEntries(Object.entries(arguments[0].headers).map(([k, v]) => ({ [k.toLocaleLowerCase()]: v }))))
        }
        let body = arguments[0]?.body || undefined
        body && typeof body === 'object' && (body = JSON.stringify(body))
        const req = {
            url,
            headers
        }
        method === 'post' && Object.assign(req, { body })
        return new Promise((resolve, reject) => {
            $[method](req, (error, _, body) => {
                if (error) {
                    try {
                        error = JSON.parse(body).message
                    } catch {
                        return reject(error)
                    }
                    $.error(`${name}请求失败: ${error}`)
                    resolve(error)
                }
                $.debug(`[${name}]请求成功: ${body}`)
                resolve($.toObj(body, body))
            })
        })
    }
    // 用户信息
    async function getUser() {
        return request({ name: '获取用户信息', url: '/api/users/profile' })
    }
    // 积分查询
    async function getPoints() {
        return request({ name: '获取用户积分', url: '/api/users/points?withoutList=1' })
    }
    // 签到
    async function signin() {
        return request({ name: '用户签到', url: '/api/daily-signin', method: 'POST' })
    }
    // 收藏
    async function collect(favorited) {
        return request({
            name: favorited ? '收藏' : '取消收藏',
            url: '/api/favorites',
            method: 'POST',
            body: {
                targetType: 'sku',
                targetId: '225',
                favorited
            }
        })
    }
    // 领取奖励
    async function receiveReward(id) {
        return request({ name: '领取收藏奖励', url: '/api/missions/5/rewards', method: 'POST', body: { id } })
    }
    return {
        signin,
        getUser,
        getPoints,
        collect,
        receiveReward
    }
}
function utils$1() {
    const getNotice = async () => {
        let noticeArr = [
            '本脚本仅用于技术学习，禁止非法使用。',
            '不得将本脚本用于任何商业或违法用途，违者后果自负。',
            '在中国大陆地区，严禁传播本脚本。',
            '开发者不对脚本的滥用承担任何责任。',
            '违规使用导致的后果由使用者自行承担。',
            '如有违反相关法规，将立即删除本脚本。',
            '使用者若违反声明规定，将自动视为放弃使用权。',
            '本声明的最终解释权归开发者所有。'
        ]
        const url = `https://fastly.jsdelivr.net/gh/Yuheng0101/X@main/Utils/notice.json`
        try {
            const { body } = await $.http.get({ url, timeout: 2e3 })
            noticeArr = $.toObj(body)
            $.debug(`获取远程声明成功`)
        } catch (e) {
            $.debug(`获取远程声明失败, 使用本地声明`)
        }
        $.log('==============📣脚本声明📣==============', noticeArr.join('\n'))
    }
    const getVersion = async (path = '') => {
        // const url = `http://192.168.10.2:5500/src/tasks/Zippo/source/zippo.js${path}`
        const url = `https://fastly.jsdelivr.net/gh/Yuheng0101/X@main/${path}`
        // console.log(url)
        try {
            const { body } = await $.http.get({ url, timeout: 4e3 })
            const v = body.match(/@\s*version\s*([\d.]+)/)?.[1]
            if (v !== VERSION) {
                $.msg($.name, `请及时更新脚本`, `当前版本: ${VERSION}  最新版本: ${v}`, { $open: url })
                throw new Error(`需要更新哦~`)
            } else {
                $.debug(`当前版本: ${v}, 与线上同步`)
            }
        } catch (e) {
            throw new Error(`获取脚本版本失败: ${e}`)
        }
    }
    const isRequest = () => typeof $request !== 'undefined'
    const consoleMe = () => {
        let string = function () {
            /* 
 ___   _     ____ ___   _     
/ / \ | |\ |  / /  ) ) \ \  / 
\_\_/ |_| \| /_/_ _)_)  \_\/
ZIPPO会员中心签到 = type=cron，cronexp=0 6 * * *，wake-system=1，script-path=https：//raw.githubusercontent.com/Yuheng0101/X/main/Tasks/zippo.js，timeout=60 ****************************************** 青龙配置： # 是否开启调试模式 export ZIPPO_MP_DEBUG = 'false' # 账号 => 多账号使用&分隔 注意要去掉Bearer前缀 export ZIPPO_MP_AUTH = 'AUTH1&AUTH2' ******************************************/ const SCRIPT_NAME = 'ZIPPO' const CACHE_BEGIN = 'ZIPPO_MP' const NAMESPACE = 'ONZ3V' const VERSION = '1.0.0' const $ = new Env（SCRIPT_NAME， { apis： apis$1（）， utils： utils$1（） }） typeof require ！== 'undefined' && require（'dotenv'）.config（） $.logLevel = $.toObj（$.utils.getEnv（'debug'）） ？'debug' ： 'info' // $.debug（'当前模式： ${$.logLevel === 'debug' ？'调试模式' ： '日志模式'}'） const AUTH_ARR = $.utils.getEnv（'AUTH'）？.split（'&'） ||[] // $.debug（'缓存账号： ${$.toStr（AUTH_ARR）}'） ;(async （） => { await $.utils.getNotice（） await $.utils.getVersion（'Tasks/zippo.js'） $.utils.consoleMe（） $.AUTH_ARR = $.utils.checkEnv（AUTH_ARR） $.debug（'有效账号： ${$.toStr（$.AUTH_ARR）}'） if （$.utils.isRequest（）） return $.utils.getAuth（） if （！$.AUTH_ARR.length） return $.msg（$.name， '未配置有效账号，请前往脚本设置中配置'） for （let i = 0; i < $.AUTH_ARR.长度;i++） { $.auth = '持有者 '.concat（$.AUTH_ARR[i].value） // 获取用户个人信息 const userinfo = await $.apis.getUser（） if （userinfo？.phone） { const memberLevel = userinfo.memberLevels.find（（it） => it.levelCode === userinfo.memberLevel） $.message = '[${userinfo.phone}]（${memberLevel.alias}）' $.message += '\n有效期至： ${$.AUTH_ARR[i].expStr}' // 签到 const signinResult = await $.apis.signin（） $.debug（$.toStr（signinResult）） if （signinResult？.signInDate） { $.message += '\n签到结果： 签到成功${signinResult？.奖励？。[0]?.count && '，获得${signinResult.rewards[0].count}积分'}${ signinResult？.奖励？。[0]?.days && '，连续签到${signinResult.rewards[0].days}天' }' } else if （signinResult？.code === 'already_signed'） { $.message += '\n签到结果： ${signinResult.message}' } else { $.message += '\n签到结果： ${signinResult}' } // 喜爱 const collectResult = await $.apis.collect（1） if （collectResult？.favorited === true） { // console.log（collectResult） $.debug（'收藏成功'） } const receiveResult = await $.apis.receiveReward（5） $.debug（$.toStr（receiveResult）） if （receiveResult？.rewardValue > 0） { $.message += '\n领取结果： 获得${receiveResult.rewardValue}积分' } else if （receiveResult？.code） { $.message += '\n领取结果： ${receiveResult.message}' } else { $.message += '\n领取结果： ${receiveResult}' } // 取消喜爱 const cancelCollectResult = await $.apis.collect（0） if （cancelCollectResult？.favorited === false） { // console.log（cancelCollectResult） $.debug（'取消收藏成功'） } // 获取用户积分 const points = await $.apis.getPoints（） $.message += '\n当前积分： ${points.balance}' } else { continue } } // $.log（$.message） $.msg（$.name， ''， $.message） }）（） .catch（（e） => $.logErr（e）） .finally（（） => $.done（{}）） function apis$1（） { const baseURL = 'https://wx-center.zippo.com.cn/' /** * 发起网络请求 * * @param config 请求配置 * @param config.url 请求的URL地址，支持相对路径，默认为空字符串 * @param config.method 请求的HTTP方法，支持get、post等，默认为'get' * @param config.headers 请求头，默认为固定的请求头信息 * @param config.body 请求体，支持对象类型，会自动转换为JSON字符串，默认为空字符串 * @returns Promise<any> 返回Promise对象，resolve为请求响应结果，reject为错误信息 */ async function request（） { const name = arguments[0]？.名称 ||'' let url = arguments[0]？。网址 ||'' if （！url） return Promise.reject（'请求链接必传！'） url = $.utils.mergeUrl（baseURL， url） let method = arguments[0]？.方法？arguments[0].method.toLocaleLowerCase（） ： 参数[1]？.toLocaleLowerCase（） ||'get' let headers = { 'x-environment'： ''， 'content-type'： 'application/json;charset=UTF-8'， 'x-platform-id'： 'wxaa75ffd8c2d75da7'， 授权： $.auth， 'x-platform-env'： 'release'， 'x-app-id'： 'zippo'， 'x-platform'： 'wxmp'， 'accept-encoding'： 'gzip，compress，br，deflate'， 'user-agent'： 'Mozilla/5.0 （iPhone;CPU iPhone OS 17_3_1 like Mac OS X） AppleWebKit/605.1.15 （KHTML， like Gecko） Mobile/15E148 MicroMessenger/8.0.49（0x18003137） NetType/WIFI Language/zh_CN' } if （arguments[0]？.headers） { Object.assign（headers， Object.fromEntries（Object.entries（arguments[0].headers）.map（（[k， v]） => （{ [k.toLocaleLowerCase（）]： v }）））） } let body = arguments[0]？.正文 ||undefined body && typeof body === 'object' && （body = JSON.stringify（body）） const req = { url， headers } method === 'post' && Object.assign（req， { body }） return new Promise（（resolve， reject） => { $[method]（req， （error， _， body） => { if （error） { try { error = JSON.parse（body）.message } catch { return reject（error） } $.error（'${name}请求失败： ${error}'） resolve（error） } $.debug（'[${name}]请求成功： ${body}'） resolve（$.toObj（body， body）） }） }） } // 用户信息 async function getUser（） { return request（{ name： '获取用户信息'， url： '/api/users/profile' }） } // 积分查询 async function getPoints（） { return request（{ name： '获取用户积分'， url： '/api/users/points？withoutList=1' }） } // 签到 async function signin（） { return request（{ name： '用户签到'， url： '/api/daily-signin'， method： 'POST' }） } // 收藏 async function collect（favorited） { return request（{ name： favorited ？ '收藏' ： '取消收藏'， url： '/api/favorites'， method： 'POST'， body： { targetType： 'sku'， targetId： '225'， 收藏 } }） } // 领取奖励 async function receiveReward（id） { return request（{ name： '领取收藏奖励'， url： '/api/missions/5/rewards'， method： 'POST'， body： { id } }） } return { signin， getUser， getPoints， collect， receiveReward } } function utils$1（） { const getNotice = async （） => { let noticeArr = [ '本脚本仅用于技术学习，禁止非法使用。', '不得将本脚本用于任何商业或违法用途，违者后果自负。', '在中国大陆地区，严禁传播本脚本。', '开发者不对脚本的滥用承担任何责任。', '违规使用导致的后果由使用者自行承担。', '如有违反相关法规，将立即删除本脚本。', '使用者若违反声明规定，将自动视为放弃使用权。', '本声明的最终解释权归开发者所有。' ] const url = 'https://fastly.jsdelivr.net/gh/Yuheng0101/X@main/Utils/notice.json' try { const { body } = await $.http.get（{ url， timeout： 2e3 }） noticeArr = $.toObj（body） $.debug（'获取远程声明成功'） } catch （e） { $.debug（'获取远程声明失败， 使用本地声明'） } $.log（'==============📣脚本声明📣=============='， noticeArr.join（'\n'）） } const getVersion = async （path = ''） => { // const url = 'http://192.168.10.2:5500/src/tasks/Zippo/source/zippo.js${path}' const url = 'https://fastly.jsdelivr.net/gh/Yuheng0101/X@main/${path}'console.log（url） try { const { body } = await $.http.get（{ url， timeout： 4e3 }） const v = body.match（/@\s*version\s*（[\d.]+)/)?.[1] if （v ！== VERSION） { $.msg（$.name， '请及时更新脚本'， '当前版本： ${VERSION} 最新版本： ${v}'， { $open： url }） throw new Error（'需要更新哦~'） } else { $.debug（'当前版本： ${v}， 与线上同步'） } } catch （e） { throw new Error（'获取脚本版本失败： ${e}'） } } const isRequest = （） => typeof $request ！== 'undefined' const consoleMe = （） => { let string = function （） { /* ___ _ __ / \ | |\ | / / ） ） \ \ / \_\/ |_|\|/_/_ _)_) \_\/
              */
        }
        let str = new String(string)
        str = str.substring(str.indexOf('/*') + 3, str.lastIndexOf('*/'))
        $.log(str)
    }
    /**
     * 合并URL
     *
     * @param baseURL 基础URL
     * @param url 要合并的URL
     * @returns 合并后的URL
     */
    const mergeUrl = (baseURL, url) => {
        if (url.startsWith('http')) return url
        const baseSlash = baseURL.endsWith('/')
        const urlSlash = url.startsWith('/')
        if (baseSlash && urlSlash) {
            return baseURL.slice(0, -1) + url
        } else if (!baseSlash && !urlSlash) {
            return `${baseURL}/${url}`
        } else {
            return baseURL + url
        }
    }
    // JWT查看有效期
    const getJWTExp = (jwt) => {
        const text = jwt.split('.')[1]
        // 加载atob模块
        if (typeof atob == 'undefined') {
            // prettier-ignore
            !function(o){o.atob=function(o){for(var e,n,r=String(o).replace(/=+$/,""),t=0,a=0,i="";n=r.charAt(a++);~n&&(e=t%4?64*e+n:n,t++%4)?i+=String.fromCharCode(255&e>>(-2*t&6)):0)n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);return i}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global);
        }
        $.debug(atob(text))
        const result = JSON.parse(atob(text))
        return result
    }
    // 传入一个时间戳, 与当前时间对比是否超出
    const isEffectiveTime = (timestamp) => {
        timestamp = timestamp.toString().length < 10 ? timestamp * 1e3 : timestamp
        const now = new Date().getTime()
        return timestamp > now ? false : true
    }
    const isEffectiveVal = (val) => typeof val !== 'undefined' && val !== null && val !== ''
    const getEnv = (name) =>
        ($.isNode() ? process.env[`${CACHE_BEGIN}_${name}`.toUpperCase()] : $.getdata(`${CACHE_BEGIN}_${name}`.toLowerCase())) || null
*/ } let str = new String（string） str = str.substring（str.indexOf（'/*'） + 3， str.lastIndexOf（'*/'）） $.log（str） } /** * 合并URL * * @param baseURL 基础URL * @param url 要合并的URL * @returns 合并后的URL */ const mergeUrl = （baseURL， url） => { if （url.startsWith（'http'）） return url const baseSlash = baseURL.endsWith（'/'） const urlSlash = url.startsWith（'/'） if （baseSlash && urlSlash） { return baseURL.slice（0， -1） + url } else if （！baseSlash && ！urlSlash） { return '${baseURL}/${url}' } else { return baseURL +url } } // JWT查看有效期 const getJWTExp = （jwt） => { const text = jwt.split（'.'）[1] // 加载atob模块 if （typeof atob == 'undefined'） { // prettier-ignore ！function（o）{o.atob=function（o）{for（var e，n，r=String（o）.replace（/=+$/，“”），t=0，a=0，i=“”;n=r.charAt（a++）;~n&&（e=t%4？64*e+n：n，t++%4）？i+=String.fromCharCode（255&e>>（-2*t&6））：0）n=“ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=”.indexOf（n）;return i}}（“undefined”！=typeof globalThis？globalThis：“undefined”！=typeof self？self：“undefined”！=typeof window？window：global）;} $.debug（atob（text）） const result = JSON.parse（atob（text）） return result } // 传入一个时间戳， 与当前时间对比是否超出 const isEffectiveTime = （timestamp） => { timestamp = timestamp.toString（）.length < 10 ？ timestamp * 1e3 ： timestamp const now = new Date（）.getTime（） return timestamp > now ？ false ： true } const isEffectiveVal = （val） => typeof val ！== 'undefined' && val ！== null && val ！== '' const getEnv = （name） => （$.isNode（） ？ process.env['${CACHE_BEGIN}_${name}'.toUpperCase（）] ： $.getdata（'${CACHE_BEGIN}_${name}'.toLowerCase（））） ||零
    const checkEnv = (arr) => {
        const result = []
        if (!arr.length) return result
        for (let i = 0; i < arr.length; i++) {
            const { iat, exp, sub } = $.utils.getJWTExp(arr[i])
            $.debug(`当前SID: ${sub}`)
            $.debug(`更新时间: ${$.time('yyyy-MM-dd HH:mm:ss', iat * 1e3)}`)
            $.debug(`失效时间: ${$.time('yyyy-MM-dd HH:mm:ss', exp * 1e3)}`)
            const isValid = $.utils.isEffectiveTime(exp)
            $.debug(isValid ? '正常使用' : '已过期')
            if (isValid)
                result.push({
                    value: arr[i],
                    sub, // 唯一标识
                    exp,
                    expStr: $.time('yyyy-MM-dd HH:mm:ss', exp * 1e3)
                })
            else {
                $.msg($.name, `【${sub}】账号失效`, `请前往小程序重新获取\n失效时间: ${$.time('yyyy-MM-dd qq HH:mm:ss', exp * 1e3)}`)
            }
        }
        return result
    }
    const getAuth = () => {
        let headers = Object.fromEntries(Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v]))
        const authorization = headers?.authorization?.replace('Bearer ', '') || ''
        if (!authorization) return $.msg($.name, '未获取到有效的Authorization', '请检查登录状态')
        const obj = getJWTExp(authorization)
        const index = $.AUTH_ARR.findIndex((item) => item.sub === obj.sub)
        // 直接添加
        if (index === -1) {
            AUTH_ARR.push(authorization)
            $.msg($.name, `【${obj.sub}】账号添加成功`, `有效期至: ${$.time('yyyy-MM-dd qq HH:mm:ss', obj.exp * 1e3)}`)
        } else {
            if (AUTH_ARR[index] === authorization) {
                $.info(`当前authorization与缓存一致, 无需更新`)
                return
            } else {
                AUTH_ARR[index] = authorization
                $.msg($.name, `【${obj.sub}】账号更新成功`, `有效期至: ${$.time('yyyy-MM-dd qq HH:mm:ss', obj.exp * 1e3)}`)
            }
        }
        $.debug($.toStr(AUTH_ARR))
        $.setdata(AUTH_ARR.join('&'), `${CACHE_BEGIN}_auth`.toLowerCase())
    }
    return { getNotice, getVersion, isRequest, consoleMe, mergeUrl, isEffectiveVal, getEnv, checkEnv, getJWTExp, isEffectiveTime, getAuth }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;"POST"===e&&(s=this.post);const i=new Promise(((e,i)=>{s.call(this,t,((t,s,o)=>{t?i(t):e(s)}))}));return t.timeout?((t,e=1e3)=>Promise.race([t,new Promise(((t,s)=>{setTimeout((()=>{s(new Error("请求超时"))}),e)}))]))(i,t.timeout):i}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,i)=>e(i)))}))}runScript(t,e){return new Promise((s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},policy:"DIRECT",timeout:o};this.post(n,((t,e,i)=>s(i)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))}));break}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then((t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))}));break}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o={}){const r=t=>{const{$open:e,$copy:s,$media:i,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||s;if(n&&Object.assign(r,{action:"clipboard",text:n}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[t]=i.split(";"),[,o]=i.split(",");e=o,s=t.replace("data:","")}else{e=i,s=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in e)if(0===t.indexOf(s))return e[s];return null})(i)}Object.assign(r,{"media-url":t,"media-base64":e,"media-base64-mime":o??s})}return Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),r}case"Loon":{const s={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(s,{openUrl:o});let r=t.mediaUrl||t["media-url"];return i?.startsWith("http")&&(r=i),r&&Object.assign(s,{mediaUrl:r}),console.log(JSON.stringify(s)),s}case"Quantumult X":{const o={};let r=t["open-url"]||t.url||t.openUrl||e;r&&Object.assign(o,{"open-url":r});let a=t["media-url"]||t.mediaUrl;i?.startsWith("http")&&(a=i),a&&Object.assign(o,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard||s;return n&&Object.assign(o,{"update-pasteboard":n}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,i,r(o));break;case"Quantumult X":$notify(e,s,i,r(o));break;case"Node.js":break}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack);break}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

 const checkEnv = （arr） => { const result = [] if （！arr.length） return result for （let i = 0; i < arr.length; i++） { const { iat， exp， sub } = $.utils.getJWTExp（arr[i]） $.debug（'当前SID： ${sub}'） $.debug（'更新时间： ${$.time（'yyyy-MM-dd HH：mm：ss'， iat * 1e3）}'） $.debug（'失效时间： ${$.time（'yyyy-MM-dd HH：mm：ss'， exp * 1e3）}'） const isValid = $.utils.isEffectiveTime（exp） $.debug（isValid ？'正常使用' ： '已过期'） if （isValid） result.push（{ value： arr[i]， sub， // 唯一标识 exp， expStr： $.time（'yyyy-MM-dd HH：mm：ss'， exp * 1e3） }） else { $.msg（$.name， '【${sub}】号账失效'， '请前往小程序重新获取\n失效时间： ${$.time（'yyyy-MM-dd qq HH：mm：ss'， exp * 1e3）}'） } } 返回结果 } const getAuth = （） => { let headers = Object.fromEntries（Object.entries（$request.headers）.map（（[k， v]） => [k.toLowerCase（）， v]）） const authorization = headers？.授权？。replace（'持有者 '， ''） ||'' if （！authorization） return $.msg（$.name， '未获取到有效的Authorization'， '请检查登录状态'） const obj = getJWTExp（authorization） const index = $.AUTH_ARR.findIndex（（item） => item.sub === obj.sub） // 直接添加 if （index === -1） { AUTH_ARR..push（authorization） $.msg（$.name， '【${obj.sub}】账号添加成功'， '有效期至： ${$.time（'yyyy-MM-dd qq HH：mm：ss'， obj.exp * 1e3）}'） } else { if （AUTH_ARR[index] === authorization） { $.info（'当前授权与缓存一致， 无需更新'） return } else { AUTH_ARR[index] = authorization $.msg（$.name， '【${obj.sub}】账号更新成功'， '有效期至： ${$.time（'yyyy-MM-dd qq HH：mm：ss'， obj.exp * 1e3）}'） } } $.debug（$.toStr（AUTH_ARR）） $.setdata（AUTH_ARR.join（'&'）， '${CACHE_BEGIN}_auth'.toLowerCase（）） } return { getNotice， getVersion， isRequest， consoleMe， mergeUrl， isEffectiveVal， getEnv， checkEnv， getJWTExp， isEffectiveTime， getAuth } } // prettier-ignore 函数 Env（t，e）{class s{constructor（t）{this.env=t}send（t，e=“GET”）{t=“string”==typeof t？{网址：t}：t;让 s=this.get;”POST“===e&&（s=this.帖子）;const i=new Promise（（（e，i）=>{s.call（this，t，（（t，s，o）=>{t？i（t）：e（s）}））}））;返回 t.timeout？（（t，e=1e3）=>Promise.race（[t，new Promise（（（t，s）=>{setTimeout（（（）=>{s（new Error（“请求超时”）））}），e）}））]））（i，t.timeout）：i}get（t）{return this.send.call（this.env，t）}post（t）{return this.send.call（this.env，t，“POST”）}}return new class{constructor（t，e）{this.logLevels={debug：0，info：1，warn：2，error：3}，this.logLevelPrefixs={debug：“[DEBUG] ”，info：“[INFO] ”，warn：“[WARN] ”，error：“[ERROR] ”}，this.logLevel=“info”，this.name=t，this.http=new s（this），this.data=null，this.dataFile=“box.dat”，this.logs=[]，this.isMute=！1，this.isNeedRewrite=！1，this.logSeparator=“\n”，this.encoding=“utf-8”，this.startTime=（new Date）.getTime（），Object.assign（this，e），this.log（“”，'🔔${this.name}， 开始！'）}getEnv（）{return“undefined”！=typeof $environment&&$environment[“surge-version”]？”Surge“：”undefined“！=typeof $environment&$environment[”stash-version“]？”Stash“：”undefined“！=typeof module&&module.exports？”Node.js“：”undefined“！=typeof $task？”Quantumult X“：”undefined“！=typeof $loon？”Loon“：”undefined“！=typeof $rocket？”Shadowrocket“：void 0}isNode（）{return”Node.js“===this.getEnv（）}isQuanX（）{return”Quantumult X“===this.getEnv（）}isSurge（）{return”Surge“===this.getEnv（）}isLoon（）{return”Loon“===this.getEnv（）}isShadowrocket（）{return”Shadowrocket“===this.getEnv（）}isStash（）{return”Stash“===this.getEnv（）}toObj（t，e=null）{try{return JSON.parse（t）}catch{return e}}toStr（t，e=null,...s）{try{返回 JSON.stringify（t,...s）}catch{return e}}getjson（t，e）{let s=e;if（this.getdata（t））try{s=JSON.parse（this.getdata（t））}catch{}return s}setjson（t，e）{try{return this.setdata（JSON.stringify（t），e）}catch{return！1}}getScript（t）{return new Promise（（e=>{this.get（{url：t}，（（t，s，i）=>e（i）））}））}runScript（t，e）{return new Promise（（s=>{let i=this.getdata（“@chavy_boxjs_userCfgs.httpapi“）;i=i？i.replace（/\n/g，“”）.trim（）：i;let o=this.getdata（“@chavy_boxjs_userCfgs.httpapi_timeout”）;o=o？1*o：20，o=e&&e.timeout？e.timeout：o;const[r，a]=i.split（“@”），n={url：'http：//${a}/v1/scripting/evaluate'，body：{script_text：t，mock_type：“cron”，timeout：o}，headers：{“X-Key”：r，Accept：“*/*”}，policy：“DIRECT”，timeout：o};this.post（n，（（t，e，i）=>s（i）））}））.catch（（t=>this.logErr（t）））}loaddata（）{if（！this.isNode（））return{};{this.fs=this.fs？this.fs：require（“fs”），this.path=this.path？this.path：require（“path”）;const t=this.path.resolve（this.dataFile），e=this.path.resolve（process.cwd（），this.dataFile），s=this.fs.existsSync（t），i=！s&&this.fs.existsSync（e）;if（！s&&！i）返回{};{常量 i=s？t：e;try{return JSON.parse（this.fs.readFileSync（i））}catch（t）{return{}}}}}writedata（）{if（this.isNode（））{this.fs=this.fs？this.fs：require（“fs”），this.path=this.path？this.path：require（“path”）;const t=this.path.resolve（this.dataFile），e=this.path.resolve（process.cwd（），this.dataFile），s=this.fs.existsSync（t），i=！s&&this.fs.existsSync（e），o=JSON.stringify（this.data）;s？this.fs.writeFileSync（t，o）：i？this.fs.writeFileSync（e，o）：this.fs.writeFileSync（t，o）}}lodash_get（t，e，s）{const i=e.replace（/\[（\d+）\]/g，“.$1”）.split（“.”）;设 o=t;for（const t of i）if（o=Object（o）[t]，void 0===o）返回 s;return o}lodash_set（t，e，s）{return Object（t）！==t||（Array.isArray（e）||（e=e.toString（）.match（/[^.[\]]+/g）||[]），e.slice（0，-1）.reduce（（（t，s，i）=>Object（t[s]）===t[s]？t[s]：t[s]=Math.abs（e[i+1]）>>0==+e[i+1]？[]：{}），t）[e[e.length-1]]=s），t}getdata（t）{let e=this.getval（t）;if（/^@/.test（t））{const[，s，i]=/^@（.*？）\.(.*?)$/.exec（t），o=s？this.getval（s）：“”;if（o）try{const t=JSON.parse（o）;e=t？this.lodash_get（t，i，“”）：e}catch（t）{e=“”}}return e}setdata（t，e）{let s=！1;if（/^@/.test（e））{const[，i，o]=/^@（.*？）\.(.*?)$/.exec（e），r=this.getval（i），a=i？”null“===r？空：r||”{}":"{}";try{const e=JSON.parse（a）;this.lodash_set（e，o，t），s=this.setval（JSON.stringify（e），i）}catch（e）{const r={};this.lodash_set（r，o，t），s=this.setval（JSON.stringify（r），i）}}else s=this.setval（t，e）;return s}getval（t）{switch（this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”：return $persistentStore.read（t）;case“Quantumult X”：return $prefs.valueForKey（t）;case“Node.js”：return this.data=this.loaddata（），this.data[t];默认值：return this.data&&this.data[t]||null}}setval（t，e）{switch（this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”：return $persistentStore.write（t，e）;case“Quantumult X”：return $prefs.setValueForKey（t，e）;case“Node.js”：return this.data=this.loaddata（），this.data[e]=t，this.writedata（），！0;默认值：return this.data&&this.data[e]||null}}initGotEnv（t）{this.got=this.got？this.got：require（“got”），this.cktough=this.cktough？this.cktough：require（“tough-cookie”），this.ckjar=this.ckjar？this.ckjar：new this.cktough.CookieJar，t&&（t.headers=t.headers？t.headers：{}，t&&（t.headers=t.headers？t.headers：{}，void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&（t.cookieJar=this.ckjar）））}get（t，e=（（）=>{}））{switch（t.headers&&（delete t.headers[“Content-Type”]，delete t.headers[”Content-Length“]，delete t.headers[”content-type“]，delete t.headers[”content-length“]），t.params&&（t.url+=”？”+this.queryStr（t.params）），void 0===t.followRedirect||t.follow重定向||（（this.isSurge（）||this.isLoon（））&&（t[“auto-redirect”]=！1），this.isQuanX（）&&（t.opts？t.opts.redirection=！1：t.opts={redirection：！1}）），this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”:d efault：this.isSurge（）&&this.isNeedRewrite&&（t.headers=t.headers||{}，Object.assign（t.headers，{“X-Surge-Skip-Scripting”：！1}）），$httpClient.get（t，（（t，s，i）=>{！t&&s&&（s.body=i，s.statusCode=s.status？s.status：s.statusCode，s.status=s.statusCode），e（t，s，i）}））;破;case“Quantumult X”：this.isNeedRewrite&&（t.opts=t.opts||{}，Object.assign（t.opts，{hints：！1}）），$task.fetch（t）.then（（t=>{const{statusCode：s，statusCode：i，headers：o，body：r，bodyBytes：a}=t;e（null，{status：s，statusCode：i，headers：o，body：r，bodyBytes：a}，r，a）}），（t=>e（t&&t.error||”UndefinedError“）））;破;case“Node.js”：let s=require（“iconv-lite”）;this.initGotEnv（t），this.got（t）.on（“重定向”，（（t，e）=>{try{if（t.headers[“set-cookie”]）{const s=t.headers[“set-cookie”].map（this.cktough.Cookie.parse）.toString（）;s&&this.ckjar.setCookieSync（s，null），e.cookieJar=this.ckjar}}catch（t）{this.logErr（t）}}））.then（（t=>{const{statusCode：i，statusCode：o，headers：r，rawBody：a}=t，n=s.decode（a，this.encoding）;e（null，{status：i，statusCode：o，headers：r，rawBody：a，body：n}，n）}），（t=>{const{message：i，response：o}=t;e（i，o，o&&s.decode（o.rawBody，this.encoding））}））;break}}post（t，e=（（）=>{}））{const s=t.method？t.method.toLocaleLowerCase（）：“post”;switch（t.body&&t.headers&&！t.headers[“Content-Type”]&&！t.headers[“content-type”]&&（t.headers[“content-type”]=“application/x-www-form-urlencoded”），t.headers&&（delete t.headers[“Content-Length”]，delete t.headers[“content-length”]），void 0===t.followRedirect||t.follow重定向||（（this.isSurge（）||this.isLoon（））&&（t[“auto-redirect”]=！1），this.isQuanX（）&&（t.opts？t.opts.redirection=！1：t.opts={redirection：！1}）），this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”:d efault：this.isSurge（）&&this.isNeedRewrite&&（t.headers=t.headers||{}，Object.assign（t.headers，{“X-Surge-Skip-Scripting”：！1}）），$httpClient[s]（t，（（t，s，i）=>{！t&&s&&（s.body=i，s.statusCode=s.status？s.status：s.statusCode，s.statusCode，s.statusCode=s.statusCode），e（t，s，i）}））;破;case“Quantumult X”：t.method=s，this.isNeedRewrite&&（t.opts=t.opts||{}，Object.assign（t.opts，{hints：！1}）），$task.fetch（t）.then（（t=>{const{statusCode：s，statusCode：i，headers：o，body：r，bodyBytes：a}=t;e（null，{status：s，statusCode：i，headers：o，body：r，bodyBytes：a}，r，a）}），（t=>e（t&&t.error||”UndefinedError“）））;破;case“Node.js”：let i=require（“iconv-lite”）;this.initGotEnv（t）;常量{url：o,...r}=t;this.got[s]（o，r）.then（（t=>{const{statusCode：s，statusCode：o，headers：r，rawBody：a}=t，n=i.decode（a，this.encoding）;e（null，{status：s，statusCode：o，headers：r，rawBody：a，body：n}，n）}），（t=>{const{message：s，response：o}=t;e（s，o，o&&i.decode（o.rawBody，this.encoding））}））;break}}time（t，e=null）{const s=e？new Date（e）：new Date;let i={“M+”：s.getMonth（）+1，“d+”：s.getDate（），“H+”：s.getHours（），“m+”：s.getMinutes（），“s+”：s.getSeconds（），“q+”：Math.floor（（s.getMonth（）+3）/3），S：s.getMilliseconds（）};/（y+）/.test（t）&&（t=t.replace（RegExp.$1，（s.getFullYear（）+“”）.substr（4-RegExp.$1.length）））;for（let e in i）new RegExp（“（”+e+“）”）.test（t）&&（t=t.replace（RegExp.$1,1==RegExp.$1.length？i[e]:(“00”+i[e]）.substr（（“”+i[e]）.length）））;返回 t}queryStr（t）{let e=“”;for（const s in t）{let i=t[s];null！=i&&“”！==i&&（“object”==typeof i&&（i=JSON.stringify（i）），e+='${s}=${i}&'）}return e=e.substring（0，e.length-1），e}msg（e=t，s=“”，i=“”，o={}）{const r=t=>{const{$open：e，$copy：s，$media：i，$mediaMime：o}=t;switch（typeof t）{大小写 void 0：return t;case“string”：switch（this.getEnv（））{case“Surge”：case“Stash”:d efault：return{url：t};case“Loon”：case“Shadowrocket”：返回t;案例“Quantumult X”：return{“open-url”：t};case“Node.js”：return}case“object”：switch（this.getEnv（））{case“Surge”：case“Stash”：case“Shadowrocket”:d efault：{const r={};让 a=t.openUrl||网址||t[“打开网址”]||e;a&&Object.assign（r，{action：“open-url”，url：a}）;let n=t[“更新粘贴板”]||t.update粘贴板||s;if（n&&Object.assign（r，{action：“剪贴板”，text：n}），i）{let t，e，s;if（i.startsWith（“http”））t=i;else if（i.startsWith（“data：”））{const[t]=i.split（“;”），[，o]=i.split（“，”）;e=o，s=t.replace（“data：”，“”）}else{e=i，s=（t=>{const e={JVBERi0：“application/pdf”，R0lGODdh：“image/gif”，R0lGODlh：“image/gif”，iVBORw0KGgo：“image/png”，“/9j/”：“image/jpg”};for（var s in e）if（0===t.indexOf（s））返回 e[s];return null}）（i）}Object.assign（r，{“media-url”：t，“media-base64”：e，“media-base64-mime”：o？？s}）}return Object.assign（r，{“auto-dismiss”：t[“auto-dismiss”]，sound：t.sound}），r}case“Loon”：{const s={};让 o=t.openUrl||网址||t[“打开网址”]||e;o&&Object.assign（s，{openUrl：o}）;让 r=t.mediaUrl||t[“媒体网址”];返回 i？。startsWith（“http”）&&（r=i），r&&Object.assign（s，{mediaUrl：r}），console.log（JSON.stringify（s）），s}case“Quantumult X”：{const o={};let r=t[“open-url”]||网址||t.openUrl||e;r&&Object.assign（o，{“open-url”：r}）;let a=t[“media-url”]||t.mediaUrl;我？。startsWith（“http”）&&（a=i），a&&Object.assign（o，{“media-url”：a}）;let n=t[“更新粘贴板”]||t.update粘贴板||s;return n&&Object.assign（o，{“update-pasteboard”：n}），console.log（JSON.stringify（o）），o}case“Node.js”：return}default：return}};if（！this.isMute）switch（this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”:d efault：$notification.post（e，s，i，r（o））;破;案例“Quantumult X”：$notify（e，s，i，r（o））;破;case“Node.js”：break}if（！this.isMuteLog）{let t=[“”，“==============📣系统通知📣==============”];t.push（e），s&&t.push（s），i&&t.push（i），console.log（t.join（“\n”）），this.logs=this.logs.concat（t）}}debug（...t）{this.logLevels[this.logLevel]<=this.logLevels.debug&&（t.length>0&&（this.logs=[...this.logs,...t]），console.log（'${this.logLevelPrefixs.debug}${t.map（（t=>t？？String（t）））.join（this.logSeparator）}'））}info（...t）{this.logLevels[this.logLevel]<=this.logLevels.info&&（t.length>0&&（this.logs=[...this.logs,...t]），console.log（'${this.logLevelPrefixs.info}${t.map（（t=>t？？String（t）））。join（this.logSeparator）}'））}warn（...t）{this.logLevels[this.logLevel]<=this.logLevels.warn&&（t.length>0&&（this.logs=[...this.logs,...t]），console.log（'${this.logLevelPrefixs.warn}${t.map（（t=>t？？String（t）））.join（this.logSeparator）}'））}error（...t）{this.logLevels[this.logLevel]<=this.logLevels.error&&（t.length>0&&（this.logs=[...this.logs,...t]），console.log（'${this.logLevelPrefixs.error}${t.map（（t=>t？？String（t）））.join（this.logSeparator）}'））}log（...t）{t.length>0&&（this.logs=[...this.logs,...t]），console.log（t.map（（t=>t？？String（t）））.join（this.logSeparator））}logErr（t，e）{switch（this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”：case“Quantumult X”:default:this.log（“”，'❗️${this.name}， 错误！'，e，t）;破;case“Node.js”:this.log（“”，'❗️${this.name}， 错误！'，e，void 0！==t.message？t.message：t，t.stack）;break}}wait（t）{return new Promise（（e=>setTimeout（e，t）））}done（t={}）{const e=（（new Date）.getTime（）-this.startTime）/1e3;switch（this.log（“”，'🔔${this.name}， 结束！🕛 ${e} 秒'），this.log（），this.getEnv（））{case“Surge”：case“Loon”：case“Stash”：case“Shadowrocket”：case“Quantumult X”:d efault：$done（t）;破;case“Node.js”:p rocess.退出（1）}}}（t，e）}
