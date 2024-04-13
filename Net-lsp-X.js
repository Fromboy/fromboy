const NAME = '网络信息'
const $ = 新环境（名称）

让arg
if (typeof $argument != '未定义') {
  arg = Object.fromEntries($argument.split('&').map(item => item.split('=')))
} 别的 {
  参数={}
}
$.log(`确定$argument: ${$.toStr(arg)}`)
// if (typeof $loon === 'string') {
// // const build = $loon.match(/\(\s*?(\d+)\s*?\)\s*?$/)?.[1]
// // $.log(`当前 Loon Build: ${build}`)
// $.log(`当前版本: ${$loon}`)
// }

arg = { ...arg, ...$.getjson(NAME, {}) }

$.log(`从持久化存储读取参数后: ${$.toStr(arg)}`)

if (typeof $environment !== 'undefined' && $.lodash_get($environment, 'executor') === 'event-network') {
  $.log(`QX事件脚本不能带参修改运行环境`)
  $.lodash_set(arg, '类型', '事件')
}

if (!isInteraction() && !isRequest() && !isTile() && !isPanel()) {
  $.log(`参数为空非可交互操作,非请求,非面板的情况下,修改运行环境`)
  $.lodash_set(arg, '类型', '事件')
}

如果（isRequest（））{
  // $.log($.toStr($request))
  arg = { ...arg, ...parseQueryString($request.url) }
  $.log(`从请求后读取参数后: ${$.toStr(arg)}`)
}

const keya = 'spe'
常量 keyb = 'ge'
const keyc = 'pin'
const keyd = 'gan'
常量 keye = 'pi'
常量 keyf = 'ob'
const bay = 'edtest'

令结果 = {}
让 proxy_policy = ''
让标题=''
让内容=''
!(异步() => {
  if ($.lodash_get(arg, 'TYPE') === 'EVENT') {
    const eventDelay = parseFloat($.lodash_get(arg, 'EVENT_DELAY') || 3)
    $.log(`网络变化, 等待${eventDelay}秒后开始查询`)
    如果（事件延迟）{
      等待 $.wait(1000 * eventDelay)
    }
  }
  如果（isTile（））{
    wait notification('网络信息', '面板', '开始查询')
  }

  让 SSID = ''
  让局域网=''
  让 LAN_IPv4 = ''
  让 LAN_IPv6 = ''
  if (typeof $network !== '未定义') {
    $.log($.toStr($网络))
    const v4 = $.lodash_get($network, 'v4.primaryAddress')
    const v6 = $.lodash_get($network, 'v6.primaryAddress')
    if ($.lodash_get(arg, 'SSID') == 1) {
      SSID = $.lodash_get($network, 'wifi.ssid')
    }
    if (v4 && $.lodash_get(arg, 'LAN') == 1) {
      LAN_IPv4 = v4
    }
    if (v6 && $.lodash_get(arg, 'LAN') == 1 && $.lodash_get(arg, 'IPv6') == 1) {
      LAN_IPv6 = v6
    }
  } else if (typeof $config !== '未定义') {
    尝试 {
      让conf = $config.getConfig()
      $.log(conf)
      conf = JSON.parse(conf)
      if ($.lodash_get(arg, 'SSID') == 1) {
        SSID = $.lodash_get(conf, 'ssid')
      }
    } 捕捉 (e) {}
  } else if (typeof $environment !== '未定义') {
    尝试 {
      $.log($.toStr($环境))
      const 版本 = $.lodash_get($environment, '版本')
      const os = 版本?.split(' ')?.[0]
      // QX 上 macOS/iOS 不一致
      if (os !== 'macOS' && $.lodash_get(arg, 'SSID') == 1) {
        SSID = $.lodash_get($environment, 'ssid')
      } else if (os === 'macOS' && $.lodash_get(arg, 'LAN') == 1) {
        LAN_IPv4 = $.lodash_get($environment, 'ssid')
      }
    } 捕捉 (e) {}
  }
  如果（LAN_IPv4 || LAN_IPv6）{
    LAN = ['LAN:', LAN_IPv4, maskIP(LAN_IPv6)].filter(i => i).join(' ')
  }
  如果（局域网）{
    局域网 = `${LAN}\n\n`
  }
  如果（SSID）{
    SSID = `SSID: ${SSID}\n\n`
  } 别的 {
    SSID = ''
  }
  让 { PROXIES = [] } = 等待 getProxies()
  让 [
    { CN_IP = '', CN_INFO = '', CN_POLICY = '' } = {},
    { PROXY_IP = '', PROXY_INFO = '', PROXY_PRIVACY = '', PROXY_POLICY = '', ENTRANCE_IP = '' } = {},
    { CN_IPv6 = '' } = {},
    { PROXY_IPv6 = '' } = {}，
  ] = 等待 Promise.all(
    $.lodash_get(arg, 'IPv6') == 1
      ？ [getDirectRequestInfo({ PROXIES })、getProxyRequestInfo({ PROXIES })、getDirectInfoIPv6()、getProxyInfoIPv6()]
      : [getDirectRequestInfo({ PROXIES }), getProxyRequestInfo({ PROXIES })]
  ）
  让 continueFlag = true
  if ($.lodash_get(arg, 'TYPE') === 'EVENT') {
    const lastNetworkInfoEvent = $.getjson('lastNetworkInfoEvent')
    如果 （
      CN_IP !== $.lodash_get(lastNetworkInfoEvent, 'CN_IP') ||
      CN_IPv6 !== $.lodash_get(lastNetworkInfoEvent, 'CN_IPv6') ||
      PROXY_IP !== $.lodash_get(lastNetworkInfoEvent, 'PROXY_IP') ||
      PROXY_IPv6 !== $.lodash_get(lastNetworkInfoEvent, 'PROXY_IPv6')
    ）{
      // 有任何一个不同都继续
      $.setjson({ CN_IP, PROXY_IP, CN_IPv6, PROXY_IPv6 }, 'lastNetworkInfoEvent')
    } 别的 {
      //否则直接结束
      $.log('网络信息未发生变化, 不继续')
      继续标志 = false
    }
  }
  如果（继续标志）{
    if ($.lodash_get(arg, 'PRIVACY') == '1' && PROXY_PRIVACY) {
      PROXY_PRIVACY = `\n${PROXY_PRIVACY}`
    }
    让入口 = ''
    如果（ENTRANCE_IP）{
      const { IP:resolvedIP } = 等待resolveDomain(ENTRANCE_IP)
      if (解析的IP) {
        $.log(`入口域名解析: ${ENTRANCE_IP} ➟ ${resolvedIP}`)
        ENTRANCE_IP = 已解析IP
      }
    }
    if (ENTRANCE_IP && ENTRANCE_IP !== PROXY_IP) {
      const EntryDelay = parseFloat($.lodash_get(arg, 'ENTRANCE_DELAY') || 0)
      $.log(`入口: ${ENTRANCE_IP} 与落地 IP: ${PROXY_IP} 不一致, 等待 ${entranceDelay} 秒后入口查询`)
      如果（入口延迟）{
        等待 $.wait(1000 * 入口延迟)
      }
      让 [{ CN_INFO: ENTRANCE_INFO1 = '', isCN = false } = {}, { PROXY_INFO: ENTRANCE_INFO2 = '' } = {}] =
        等待 Promise.all([
          getDirectInfo(ENTRANCE_IP, $.lodash_get(arg, 'DOMESTIC_IPv4')),
          getProxyInfo(ENTRANCE_IP, $.lodash_get(arg, 'LANDING_IPv4')),
        ]）
      // 接口国内的国外IP 解析超出谱 排除掉
      如果（ENTRANCE_INFO1 && isCN）{
        ENTRANCE = `入口：${maskIP(ENTRANCE_IP) || '-'}\n${maskAddr(ENTRANCE_INFO1)}`
      }
      如果（ENTRANCE_INFO2）{
        如果（入口）{
          入口 = `${ENTRANCE.replace(/^(.*?):/gim, '$11:')}\n${maskAddr(
            ENTRANCE_INFO2.replace(/^(.*?):/gim, '$1²:')
          )}`
        } 别的 {
          ENTRANCE = `入口：${maskIP(ENTRANCE_IP) || '-'}\n${maskAddr(ENTRANCE_INFO2)}`
        }
      }
    }
    如果（入口）{
      入口 = `${ENTRANCE}\n\n`
    }

    if (CN_IPv6 && isIPv6(CN_IPv6) && $.lodash_get(arg, 'IPv6') == 1) {
      CN_IPv6 = `\n${maskIP(CN_IPv6)}`
    } 别的 {
      CN_IPv6 = ''
    }
    if (PROXY_IPv6 && isIPv6(PROXY_IPv6) && $.lodash_get(arg, 'IPv6') == 1) {
      PROXY_IPv6 = `\n${maskIP(PROXY_IPv6)}`
    } 别的 {
      PROXY_IPv6 = ''
    }
    if ($.isSurge() || $.isStash()) {
      如果（CN_POLICY ==='直接'）{
        CN_政策=``
      } 别的 {
        CN_POLICY = `策略: ${maskAddr(CN_POLICY) || '-'}\n`
      }
    }

    如果（CN_INFO）{
      CN_INFO = `\n${CN_INFO}`
    }
    const policy_prefix = $.isQuanX() || $.isLoon() ？ '节点: ' : '代理策略: '
    如果（PROXY_POLICY ==='直接'）{
      PROXY_POLICY = `${policy_prefix}直连`
    } 否则如果 (PROXY_POLICY) {
      PROXY_POLICY = `${policy_prefix}${maskAddr(PROXY_POLICY) || '-'}`
    } 别的 {
      PROXY_POLICY = ''
    }
    如果（PROXY_POLICY）{
      proxy_policy = PROXY_POLICY
    } 别的 {
      代理策略 = ''
    }

    如果（代理信息）{
      PROXY_INFO = `\n${PROXY_INFO}`
    }
    标题 = `${PROXY_POLICY}`
    内容 = `${SSID}${LAN}${CN_POLICY}IP: ${maskIP(CN_IP) || '-'}${CN_IPv6}${maskAddr(
      CN_信息
    )}\n\n${ENTRANCE} 落地 IP: ${maskIP(PROXY_IP) || '-'}${PROXY_IPv6}${maskAddr(PROXY_INFO)}${PROXY_PRIVACY}`
    if (!isInteraction()) {
      content = `${content}\n执行时间: ${new Date().toTimeString().split(' ')[0]}`
    }

    标题=标题|| '网络信息𝕏'
    如果（isTile（））{
      wait notification('网络信息', '面板', '查询完成')
    } else if (!isPanel()) {
      if ($.lodash_get(arg, 'TYPE') === 'EVENT') {
        等待通知（
          `🄳 ${maskIP(CN_IP) || '-'} 🅿 ${maskIP(PROXY_IP) || '-'}`.replace(/\n+/g, '\n').replace(/\ +/g, ' ').trim(),
          `${maskAddr(CN_INFO.replace(/(位置|运营商).*?:/g, '').replace(/\n/g, ' '))}`
            .replace(/\n+/g, '\n')
            .replace(/\ +/g, ' ')
            。修剪（），
          `${maskAddr(PROXY_INFO.replace(/(位置|运营商).*?:/g, '').replace(/\n/g, ' '))}${
            CN_IPv6 ？ `\n🄳 ${CN_IPv6.replace(/\n+/g, '')}` : ''
          }${PROXY_IPv6 ？ `\n🅿 ${PROXY_IPv6.replace(/\n+/g, '')}` : ''}${SSID ? `\n${SSID}` : '\n'}${LAN}`
            .replace(/\n+/g, '\n')
            .replace(/\ +/g, ' ')
            。修剪（）
        ）
      } 别的 {
        wait notification('网络信息𝕏', 标题, 内容)
      }
    }
  }
})()
  .catch(异步e => {
    $.logErr(e)
    $.logErr($.toStr(e))
    const msg = `${$.lodash_get(e, '消息') || $.lodash_get(e, '错误') || e}`
    标题=`❌`
    内容 = 消息
    wait notification('网络信息𝕏', 标题, 内容)
  })
  .finally(异步() => {
    如果（isRequest（））{
      结果={
        回复： {
          状态：200，
          正文：JSON.stringify(
            {
              标题，
              内容，
            },
            无效的，
            2
          ),
          标题：{
            '内容类型': '应用程序/json;字符集=UTF-8',
            '访问控制允许来源': '*',
            '访问控制允许方法': 'POST,GET,OPTIONS,PUT,DELETE',
            'Access-Control-Allow-Headers': '来源、X-Requested-With、内容类型、接受',
          },
        },
      }
    } 别的 {
      结果 = { 标题, 内容, ...arg }
    }
    $.log($.toStr(结果))
    if (isInteraction()) {
      const html = `<div style="font-family: -apple-system; font-size: large">${`\n${内容}${
        代理策略？ `\n\n${proxy_policy.replace(/^(.*?:\s*)(.*)$/, '$1<span style="color: #467fcf">$2</span>')} `：''
      }`
        .replace(/^(.*?):/gim, '<span style="font-weight: bold">$1</span>:')
        .replace(/\n/g, '<br/>')}</div>`
      // $.log(html)
      $.完成({
        title: '网络信息𝕏',
        html消息：html，
      })
    } 别的 {
      $.done(结果)
    }
  })

异步函数 getEntranceInfo() {
  让 IP = ''
  让策略=''
  if (isInteraction()) {
    尝试 {
      如果 ($.isQuanX()) {
        const 节点名称 = $environment.params
        const { ret, error } = wait $configuration.sendMessage({ action: 'get_server_description', content: nodeName })
        如果（错误）抛出新的错误（错误）
        // $.log(JSON.stringify(ret, null, 2))
        const proxy = Object.values(ret)[0]
        // $.log(代理)
        IP = proxy.match(/.+?\s*?=\s*?(.+?):\d+\s*?,.+/)[1]
        POLICY = 节点名称
      } 否则 if ($.isLoon()) {
        IP = $.lodash_get($environment, 'params.nodeInfo.address')
        POLICY = $.lodash_get($environment, 'params.node')
      }
    } 捕获 (e) {
      $.logErr(`获取入口信息发生错误: ${e.message || e}`)
      $.logErr(e)
      $.logErr($.toStr(e))
    }
  }
  返回 { IP, 策略 }
}
异步函数 getDirectRequestInfo({ PROXIES = [] } = {}) {
  const { CN_IP, CN_INFO } =等待 getDirectInfo(未定义, $.lodash_get(arg, 'DOMESTIC_IPv4'))
  const { 政策 } = 等待 getRequestInfo(
    新的正则表达式(
      `cip\\.cc|for${keyb}\\.${keya}${bay}\\.cn|rmb\\.${keyc}${keyd}\\.com\\.cn|api -v3\\.${keya}${bay}\\.cn|ipservice\\.ws\\.126\\.net|api\\.bilibili\\.com|api\\.live\\. bilibili\\.com|myip\\.ipip\\.net|ip\\.ip233\\.cn|ua${keye}\\.wo${keyf}x\\.cn|ip\\.im |ips\\.market\\.alicloudapi\\.com|api\\.ip\\.plus`
    ),
    代理
  ）
  返回 { CN_IP, CN_INFO, CN_POLICY: POLICY }
}
异步函数 getProxyRequestInfo({ PROXIES = [] } = {}) {
  const { PROXY_IP，PROXY_INFO，PROXY_PRIVACY } =等待 getProxyInfo（未定义，$ .lodash_get（arg，'LANDING_IPv4'））
  让结果
  if ($.isSurge() || $.isStash()) {
    结果 =等待 getRequestInfo(/ipinfo\.io|ip-score\.com|ipwhois\.app|ip-api\.com|api-ipv4\.ip\.sb/, PROXIES)
  } else if ($.isQuanX() || $.isLoon()) {
    结果 = 等待 getEntranceInfo()
  }
  返回 {
    代理服务器的IP，
    代理信息，
    代理_隐私，
    PROXY_POLICY: $.lodash_get(结果, '政策'),
    ENTRANCE_IP: $.lodash_get(结果, 'IP'),
  }
}
异步函数 getRequestInfo(regexp, PROXIES = []) {
  让策略=''
  让 IP = ''

  尝试 {
    如果 ($.isSurge()) {
      const { requests } = 等待 httpAPI('/v1/requests/recent', 'GET')
      const request = requests.slice(0, 10).find(i => regexp.test(i.URL))
      // $.log('最近请求', $.toStr(request))
      POLICY = 请求.策略名称
      if (/\(Proxy\)/.test(request.remoteAddress)) {
        IP = request.remoteAddress.replace(/\s*\(Proxy\)\s*/, '')
      }
    } 否则 if ($.isStash()) {
      const res = 等待 $.http.get({
        网址：`http://127.0.0.1:9090/connections`，
      })

      让 body = String($.lodash_get(res, 'body') || $.lodash_get(res, 'rawBody'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      const 连接 = $.lodash_get(body, '连接') || []

      常量连接 =
        连接.slice(0, 10).find(i => {
          const dest = $.lodash_get(i, 'metadata.host') || $.lodash_get(i, 'metadata.destinationIP')
          返回 regexp.test(dest)
        }) || {}
      const chain = $.lodash_get(connection, 'metadata.chain') || []
      常量代理=链[0]
      POLICY = proxy // chain.reverse().join(' ➟ ')
      IP = PROXIES?.[代理]?.match(/^(.*?):\d+$/)?.[1]
    }
  } 捕获 (e) {
    $.logErr(`从最近请求中获取${regexp}发生错误: ${e.message || e}`)
    $.logErr(e)
    $.logErr($.toStr(e))
  }

  返回 {
    政策，
    知识产权,
  }
}
异步函数 getDirectInfo(ip, 提供商) {
  让CN_IP
  让 CN_INFO
  让 isCN
  const msg = `使用 ${provider || 'spcn'} 查询 ${ip ? ip : '分流'}信息`
  if (provider == 'cip') {
    尝试 {
      const res = 等待 http({
        网址：`http://cip.cc/${ip ?编码URIComponent（ip）：''}`，
        headers: { '用户代理': 'curl/7.16.3 (powerpc-apple-darwin9.0) libcurl/7.16.3' },
      })
      让 body = String($.lodash_get(res, 'body'))
      const addr = body.match(/地址\s*(:|：)\s*(.*)/)[2]
      isCN = addr.includes('中国')
      CN_IP = ip || body.match(/IP\s*(:|：)\s*(.*?)\s/)[2]
      CN_信息 = [
        ['位置:', isCN ? getflag('CN') : 未定义, addr.replace(/中国\s*/, '') || ''].filter(i => i).join(' '),
        ['运营商:', body.match(/运营商\s*(:|：)\s*(.*)/)[2].replace(/中国\s*/, '') || ''].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (!ip && 提供商 == 'ipip') {
    尝试 {
      const res = 等待 http({
        url: `https://myip.ipip.net/json`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      isCN = $.lodash_get(body, 'data.location.0') === '中国'
      CN_IP = $.lodash_get(body, 'data.ip')
      CN_信息 = [
        [
          '位置：',
          是CN？ getflag('CN') ：未定义，
          $.lodash_get(body, 'data.location.0'),
          $.lodash_get(body, 'data.location.1'),
          $.lodash_get(body, 'data.location.2'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'data.location.4')].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (!ip && 提供商 == 'bilibili') {
    尝试 {
      const res = 等待 http({
        url: `https://api.bilibili.com/x/web-interface/zone`,
        // url: `https://api.live.bilibili.com/ip_service/v1/ip_service/get_ip_addr`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      isCN = $.lodash_get(body, 'data.country') === '中国'
      CN_IP = $.lodash_get(body, 'data.addr')
      CN_信息 = [
        [
          '位置：',
          是CN？ getflag('CN') ：未定义，
          $.lodash_get(body, 'data.country'),
          $.lodash_get(body, 'data.province'),
          $.lodash_get(body, 'data.city'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'data.isp')].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (!ip && 提供商 == '126') {
    尝试 {
      const res = 等待 http({
        网址：`https://ipservice.ws.126.net/locate/api/getLocByIp`，
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      const CountryCode = $.lodash_get(body, '结果.countrySymbol')
      isCN = 国家代码 === 'CN'
      CN_IP = $.lodash_get(body, '结果.ip')
      CN_信息 = [
        [
          '位置：',
          getflag(国家代码),
          $.lodash_get(body, '结果.国家'),
          $.lodash_get(body, '结果.省'),
          $.lodash_get(body, '结果.city'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'result.operator')].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (!ip && 提供商 == 'ip233') {
    尝试 {
      const res = 等待 http({
        url: `https://ip.ip233.cn/ip`,
        标题：{
          引用地址：'https://ip233.cn/',
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      const CountryCode = $.lodash_get(body, '国家')
      isCN = 国家代码 === 'CN'
      CN_IP = $.lodash_get(body, 'ip')
      CN_INFO = CN_INFO = [
        ['位置:', getflag(countryCode), $.lodash_get(body, 'desc').replace(/中国\s*/, '')].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'org') || '-'].filter(i => i).join(' ')
          ： 不明确的，
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == '平安') {
    尝试 {
      const res = 等待 http({
        url: `https://rmb.${keyc}${keyd}.com.cn/itam/mas/linden/ip/request`,
        参数: { ip },
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      const CountryCode = $.lodash_get(body, 'data.countryIsoCode')
      isCN = 国家代码 === 'CN'
      CN_IP = ip || $.lodash_get(body, 'data.ip')
      CN_信息 = [
        [
          '位置：',
          getflag(国家代码),
          $.lodash_get(body, 'data.country').replace(/\s*中国\s*/, ''),
          $.lodash_get(body, 'data.region'),
          $.lodash_get(body, 'data.city'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'data.isp') || '-'].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'org') || '-'].filter(i => i).join(' ')
          ： 不明确的，
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ipplus') {
    尝试 {
      const res = 等待 http({
        url: `https://api.ip.plus${ip ? `/${encodeURIComponent(ip)}` : ''}`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      const CountryCode = $.lodash_get(body, 'data.country_code')
      isCN = 国家代码 === 'CN'
      CN_IP = ip || $.lodash_get(body, 'data.ip')
      CN_信息 = [
        [
          '位置：',
          getflag(国家代码),
          $.lodash_get(body, 'data.country').replace(/\s*中国\s*/, ''),
          $.lodash_get(body, 'data.subdivisions'),
          $.lodash_get(body, 'data.city'),
        ]
          .filter(i => i)
          。加入（' '），
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'data.as_name') || '-'].filter(i => i).join(' ')
          ： 不明确的，
        $.lodash_get(arg, 'ASN') == 1
          ？ ['ASN:', $.lodash_get(body, 'data.asn') || '-'].filter(i => i).join(' ')
          ： 不明确的，
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'muhan') {
    尝试 {
      const res = 等待 http({
        url: `https://ua${keye}.wo${keyf}x.cn/app/ip-location`,
        参数: { ip },
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      const CountryCode = $.lodash_get(body, 'data.showapi_res_body.en_name_short')
      isCN = 国家代码 === 'CN'
      CN_IP = ip || $.lodash_get(body, 'data.showapi_res_body.ip')
      CN_信息 = [
        [
          '位置：',
          getflag(国家代码),
          $.lodash_get(body, 'data.showapi_res_body.country').replace(/\s*中国\s*/, ''),
          $.lodash_get(body, 'data.showapi_res_body.region'),
          $.lodash_get(body, 'data.showapi_res_body.city'),
          $.lodash_get(body, 'data.showapi_res_body.county'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'data.showapi_res_body.isp') || '-'].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ipim') {
    尝试 {
      const res = 等待 ipim(ip)
      isCN = $.lodash_get(res, 'isCN')
      CN_IP = $.lodash_get(res, 'IP')
      CN_INFO = $.lodash_get(res, 'INFO')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ali') {
    尝试 {
      让 APPCODE = $.lodash_get(arg, 'DOMESTIC_IPv4_KEY')
      if (!APPCODE) throw new Error('请在 DOMESTIC_IPv4_KEY 填写阿里云IP接口的APPCODE')
      应用代码=应用代码.split(/,|，/)
        .map(i => i.trim())
        .filter(i => i)
      APPCODE = APPCODE[Math.floor(Math.random() * APPCODE.length)]
      if (APPCODE.length > 1) {
        $.log(`随机使用阿里云IP接口的APPCODE: ${APPCODE}`)
      }
      让ali_ip = ip
      如果（！ali_ip）{
        $.log('阿里云接口需要IP。未提供IP，先使用默认IP查询')
        const res = 等待 getDirectInfo()
        ali_ip = $.lodash_get(res, 'CN_IP')
        if (!ali_ip) throw new Error('阿里云接口需要IP。未提供IP,使用默认IP查询失败')
      }
      const res = 等待 ali(ali_ip, APPCODE)
      isCN = $.lodash_get(res, 'isCN')
      CN_IP = $.lodash_get(res, 'IP')
      CN_INFO = $.lodash_get(res, 'INFO')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } 别的 {
    尝试 {
      如果（IP）{
        const res = 等待 http({
          url: `https://api-v3.${keya}${bay}.cn/ip`,
          参数: { ip },
          标题：{
            '用户代理'：
              'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
          },
        })
        让 body = String($.lodash_get(res, 'body'))
        尝试 {
          正文 = JSON.parse(正文)
        } 捕捉 (e) {}
        const CountryCode = $.lodash_get(body, 'data.countryCode')
        isCN = 国家代码 === 'CN'
        CN_IP = ip || $.lodash_get(body, 'data.ip')
        CN_信息 = [
          [
            '位置：',
            getflag(国家代码),
            $.lodash_get(body, 'data.country').replace(/\s*中国\s*/, ''),
            $.lodash_get(body, 'data.province'),
            $.lodash_get(body, 'data.city'),
            $.lodash_get(body, 'data.district'),
          ]
            .filter(i => i)
            。加入（' '），
          ['运营商:', $.lodash_get(body, 'data.operator') || $.lodash_get(body, 'data.isp') || '-']
            .filter(i => i)
            。加入（' '），
        ]
          .filter(i => i)
          .join('\n')
      } 别的 {
        const res = 等待 http({
          url: `https://for${keyb}.${keya}${bay}.cn/api/location/info`,
          标题：{
            '用户代理'：
              'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
          },
        })
        让 body = String($.lodash_get(res, 'body'))
        尝试 {
          正文 = JSON.parse(正文)
        } 捕捉 (e) {}
        const 国家代码 = body.国家代码
        isCN = 国家代码 === 'CN'
        CN_IP = 正文.ip
        CN_信息 = [
          [
            '位置：',
            getflag(国家代码),
            body.country.replace(/\s*中国\s*/, ''),
            身体.省份,
            身体.城市,
            身体不同，
          ]
            .filter(i => i)
            。加入（' '），
          ['运营商：', body.net_str || body.operator || body.isp].filter(i => i).join(' '),
        ]
          .filter(i => i)
          .join('\n')
      }
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  }
  返回 { CN_IP，CN_INFO：simplifyAddr（CN_INFO），isCN }
}
异步函数 getDirectInfoIPv6() {
  让CN_IPv6
  const msg = `使用 ${$.lodash_get(arg, 'DOMESTIC_IPv6') || 'ddnspod'} 查询IPv6分流信息`
  if ($.lodash_get(arg, 'DOMESTIC_IPv6') == 'neu6') {
    尝试 {
      const res = 等待 http({
        网址：`https://speed.neu6.edu.cn/getIP.php`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      CN_IPv6 = body.trim()
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } 别的 {
    尝试 {
      const res = 等待 http({
        url: `https://ipv6.ddnspod.com`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      CN_IPv6 = body.trim()
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  }
  返回 { CN_IPv6 }
}
异步函数 getProxyInfo(ip, 提供商) {
  让PROXY_IP
  让PROXY_INFO
  让 PROXY_PRIVACY

  const msg = `使用 ${provider || 'ipapi'} 查询 ${ip ? ip : '分流'}信息`

  if (provider == 'ipinfo') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        网址：`https://ipinfo.io/widget/${ip ?编码URIComponent（ip）：''}`，
        标题：{
          引用者：'https://ipinfo.io/',
          '用户代理'：
            'Mozilla/5.0（iPhone CPU iPhone OS 13_2_3，如 Mac OS X）AppleWebKit/605.1.15（KHTML，如 Gecko）版本/13.0.3 Mobile/15E148 Safari/604.1 Edg/109.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      PROXY_IP = ip || $.lodash_get(body, 'ip')
      代理信息 = [
        ['位置:', getflag(body.country), body.country.replace(/\s*中国\s*/, ''), body.region, body.city]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'company.name') || $.lodash_get(body, 'asn.name')].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'asn.name') || $.lodash_get(body, 'org') || '-'].filter(i => i).join(' ')
          ： 不明确的，
        $.lodash_get(arg, 'ASN') == 1
          ？ ['ASN:', $.lodash_get(body, 'asn.asn') || '-'].filter(i => i).join(' ')
          ： 不明确的，
      ]
        .filter(i => i)
        .join('\n')
      if (!ip && $.lodash_get(arg, '隐私') == '1') {
        const PrivacyObj = $.lodash_get(body, '隐私') || {}
        让隐私=[]
        常量隐私映射 = {
          正确：'✓'，
          假：'✗'，
          '': '-',
        }
        Object.keys(privacyObj).forEach(key => {
          Privacy.push(`${key.toUpperCase()}: ${privacyMap[privacyObj[key]]}`)
        })
        if (隐私长度 > 0) {
          PROXY_PRIVACY = `隐私安全：\n${privacy.join('\n')}`
        } 别的 {
          PROXY_PRIVACY = `隐私安全：-`
        }
      }
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ipscore') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        网址：`https://ip-score.com/json`，
        参数: { ip },
        标题：{
          '用户代理'：
            'Mozilla/5.0（iPhone CPU iPhone OS 13_2_3，如 Mac OS X）AppleWebKit/605.1.15（KHTML，如 Gecko）版本/13.0.3 Mobile/15E148 Safari/604.1 Edg/109.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      PROXY_IP = ip || $.lodash_get(body, 'ip')
      代理信息 = [
        [
          '位置1:',
          getflag($.lodash_get(body, 'geoip1.countrycode')),
          $.lodash_get(body, 'geoip1.country'),
          $.lodash_get(body, 'geoip1.region'),
          $.lodash_get(body, 'geoip1.city'),
        ]
          .filter(i => i)
          。加入（' '），
        [
          '位置²:',
          getflag($.lodash_get(body, 'geoip2.countrycode')),
          $.lodash_get(body, 'geoip2.country'),
          $.lodash_get(body, 'geoip2.region'),
          $.lodash_get(body, 'geoip2.city'),
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商：', body.isp || body.org || body.asn].filter(i => i).join(' '),
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ipsb') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        网址：`https://api-ipv4.ip.sb/geoip${ip ? `/${encodeURIComponent(ip)}` : ''}`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（iPhone CPU iPhone OS 13_2_3，如 Mac OS X）AppleWebKit/605.1.15（KHTML，如 Gecko）版本/13.0.3 Mobile/15E148 Safari/604.1 Edg/109.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      PROXY_IP = ip || $.lodash_get(body, 'ip')
      代理信息 = [
        [
          '位置：',
          getflag($.lodash_get(body, '国家代码')),
          $.lodash_get(body, '国家'),
          $.lodash_get(body, '区域'),
          $.lodash_get(body, '城市'),
        ]
          .filter(i => i)
          。加入（' '），

        ['运营商：', body.isp || body.organization].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'asn_organization') || '-'].filter(i => i).join(' ')
          ： 不明确的，

        $.lodash_get(arg, 'ASN') == 1 ? ['ASN:', $.lodash_get(body, 'asn') || '-'].filter(i => i).join(' ') : 未定义，
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if (provider == 'ipwhois') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        url: `https://ipwhois.app/widget.php`,
        参数：{
          lang: 'zh-CN',
          ip,
        },
        标题：{
          主机：'ipwhois.app'，
          '用户代理': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
          接受： '*/*'，
          '接受语言': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
          '接受编码': 'gzip, deflate, br',
          来源：'https://ipwhois.io',
          连接：“保持活动”，
          推荐人：'https://ipwhois.io/',
          'Sec-Fetch-Dest': '空',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': '跨站',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      PROXY_IP = ip || $.lodash_get(body, 'ip')
      代理信息 = [
        ['位置:', getflag(body.country_code), body.country.replace(/\s*中国\s*/, ''), body.region, body.city]
          .filter(i => i)
          。加入（' '），
        ['运营商:', $.lodash_get(body, 'connection.isp') || '-'].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'connection.org') || '-'].filter(i => i).join(' ')
          ： 不明确的，

        $.lodash_get(arg, 'ASN') == 1
          ？ ['ASN:', $.lodash_get(body, 'connection.asn') || '-'].filter(i => i).join(' ')
          ： 不明确的，
      ]
        .filter(i => i)
        .join('\n')
      if (!ip && $.lodash_get(arg, '隐私') == 1) {
        常量安全映射 = {
          正确：'✓'，
          假：'✗'，
          '': '-',
        }
        const securityObj = $.lodash_get(body, '安全') || {}
        让安全=[]
        Object.keys(securityObj).forEach(key => {
          security.push(`${key.toUpperCase()}: ${securityMap[securityObj[key]]}`)
        })
        if (security.length > 0) {
          PROXY_PRIVACY = `隐私安全：\n${security.join('\n')}`
        } 别的 {
          PROXY_PRIVACY = `隐私安全：-`
        }
      }
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } 别的 {
    尝试 {
      常量 p = ip ? `/${encodeURIComponent(ip)}` : ''
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        url: `http://ip-api.com/json${p}?lang=zh-CN`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（iPhone CPU iPhone OS 13_2_3，如 Mac OS X）AppleWebKit/605.1.15（KHTML，如 Gecko）版本/13.0.3 Mobile/15E148 Safari/604.1 Edg/109.0.0.0',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}
      PROXY_IP = ip || $.lodash_get(body, '查询')
      代理信息 = [
        [
          '位置：',
          getflag(body.国家代码),
          body.country.replace(/\s*中国\s*/, ''),
          body.regionName ? body.regionName.split(/\s+or\s+/)[0] : body.regionName,
          身体.城市,
        ]
          .filter(i => i)
          。加入（' '），
        ['运营商：', body.isp || body.org || body.as].filter(i => i).join(' '),
        $.lodash_get(arg, 'ORG') == 1
          ？ ['组织:', $.lodash_get(body, 'org') || '-'].filter(i => i).join(' ')
          ： 不明确的，

        $.lodash_get(arg, 'ASN') == 1 ? ['ASN:', $.lodash_get(body, 'as') || '-'].filter(i => i).join(' ') : 未定义，
      ]
        .filter(i => i)
        .join('\n')
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  }

  返回 { PROXY_IP，PROXY_INFO：simplifyAddr（PROXY_INFO），PROXY_PRIVACY }
}
异步函数 getProxyInfoIPv6(ip) {
  让PROXY_IPv6
  const msg = `使用 ${$.lodash_get(arg, 'LANDING_IPv6') || 'ipsb'} 查询IPv6分流信息`
  if ($.lodash_get(arg, 'LANDING_IPv6') == 'ident') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        网址：`https://v6.ident.me`，
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      PROXY_IPv6 = body.trim()
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } else if ($.lodash_get(arg, 'LANDING_IPv6') == 'ipify') {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        网址：`https://api6.ipify.org`，
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      PROXY_IPv6 = body.trim()
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  } 别的 {
    尝试 {
      const res = 等待 http({
        ...(ip ? {} : getNodeOpt()),

        url: `https://api-ipv6.ip.sb/ip`,
        标题：{
          '用户代理'：
            'Mozilla/5.0（Macintosh；Intel Mac OS X 10_15_7）AppleWebKit/537.36（KHTML，如 Gecko）Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.14',
        },
      })
      让 body = String($.lodash_get(res, 'body'))
      PROXY_IPv6 = body.trim()
    } 捕获 (e) {
      $.logErr(`${msg} 发生错误: ${e.message || e}`)
    }
  }

  返回 { PROXY_IPv6 }
}
异步函数 ipim(ip) {
  让 isCN
  让IP
  让信息
  const res = 等待 http({
    网址：`https://ip.im/${ip ? encodeURIComponent(ip) : '信息'}`,
    headers: { '用户代理': 'curl/7.16.3 (powerpc-apple-darwin9.0) libcurl/7.16.3' },
  })
  让 body = String($.lodash_get(res, 'body'))
  IP = body.match(/(^|\s+)Ip\s*(:|：)\s*(.*)/m)?.[3]
  const Country = body.match(/(^|\s+)Country\s*(:|：)\s*(.*)/m)?.[3]
  常量省=
    body.match(/(^|\s+)省份\s*(:|：)\s*(.*)/m)?.[3] || body.match(/(^|\s+)区域\s*(:|：)\s*(.*)/m)?.[3]
  const city = body.match(/(^|\s+)City\s*(:|：)\s*(.*)/m)?.[3]
  const District = body.match(/(^|\s+)Districts\s*(:|：)\s*(.*)/m)?.[3]
  const isp = body.match(/(^|\s+)Isp\s*(:|：)\s*(.*)/m)?.[3]
  const org = body.match(/(^|\s+)Org\s*(:|：)\s*(.*)/m)?.[3]

  isCN = Country.includes('中国')

  信息 = [
    ['位置:', isCN ? getflag('CN') : getflag(国家), 国家, 省, 市, 区].filter(i => i). join(' '),
    ['运营商：', isp || '-'].filter(i => i).join(' '),
    $.lodash_get(arg, 'ORG') == 1 ? ['组织：', org || '-'].filter(i => i).join(' ') : 未定义，
  ]
    .filter(i => i)
    .join('\n')
  返回 { IP, INFO, isCN }
}
异步函数 ali(ip, key) {
  让 isCN
  让IP
  让信息
  const res = 等待 http({
    url: `https://ips.market.alicloudapi.com/iplocaltion`,
    参数: { ip },
    headers: { 授权: `APPCODE ${key}` },
  })
  让 body = String($.lodash_get(res, 'body'))
  尝试 {
    正文 = JSON.parse(正文)
  } 捕捉 (e) {}

  IP = $.lodash_get(body, 'ip')
  const CountryCode = $.lodash_get(body, 'result.en_short')
  isCN = 国家代码 === 'CN'

  信息 = [
    [
      '位置：',
      getflag(国家代码),
      $.lodash_get(body, 'result.nation').replace(/中国\s*/, ''),
      $.lodash_get(body, '结果.省'),
      $.lodash_get(body, '结果.city'),
      $.lodash_get(body, '结果.district'),
    ]
      .filter(i => i)
      。加入（' '），
  ]
    .filter(i => i)
    .join('\n')
  返回 { IP, INFO, isCN }
}
函数简化地址（地址）{
  if (!addr) 返回 ''
  返回地址
    .split(/\n/)
    .map(i => Array.from(new Set(i.split(/\ +/))).join(' '))
    .join('\n')
}
函数 maskAddr(addr) {
  if (!addr) 返回 ''
  if ($.lodash_get(arg, 'MASK') == 1) {
    让结果=''
    const parts = addr.split(' ')

    if (parts.length >= 3) {
      // 如果有两个或更多的空格，按空格分组后将中间的部分替换为"*"
      结果 = [parts[0], '*', parts[parts.length - 1]].join(' ')
    } 别的 {
      // 如果空格缺少2个，将字符串三等分，将中间的部分替换为"*"
      const 第三 = Math.floor(addr.length / 3)
      结果 = addr.substring(0, 第三) + '*'.repeat(third) + addr.substring(2 * 第三)
    }
    返回结果
  } 别的 {
    返回地址
  }
}
函数掩码IP(ip) {
  if (!ip) 返回 ''
  if ($.lodash_get(arg, 'MASK') == 1) {
    让结果=''
    if (ip.includes('.')) {
      // IPv4
      让parts = ip.split('.')
      结果 = [...parts.slice(0, 2), '*', '*'].join('.')
    } 别的 {
      // IPv6
      让parts = ip.split(':')
      结果 = [...parts.slice(0, 4), '*', '*', '*', '*'].join(':')
    }
    返回结果
  } 别的 {
    返回ip
  }
}

函数 getflag(e) {
  if ($.lodash_get(arg, 'FLAG', 1) == 1) {
    尝试 {
      常量 t = e
        .toUpperCase()
        。分裂（''）
        .map(e => 127397 + e.charCodeAt())
      // return String.fromCodePoint(...t).replace(/🇹🇼/g, '🇨🇳');
      return String.fromCodePoint(...t).replace(/🇹🇼/g, '🇼🇸')
    } 捕获 (e) {
      返回 '​​'
    }
  } 别的 {
    返回 '​​'
  }
}
// 参数与其他脚本逻辑一致
函数 parseQueryString(url) {
  const queryString = url.split('?')[1] // 获取查询字符串部分
  const regex = /([^=&]+)=([^&]*)/g // 匹配键值对的正则表达式
  常量参数 = {}
  让匹配

  while ((match = regex.exec(queryString))) {
    const key =decodeURIComponent(match[1]) // 解码键
    const value =decodeURIComponent(match[2]) // 解码值
    params[key] = value // 将键值对添加到对象中
  }

  返回参数
}
常量 DOMAIN_RESOLVERS = {
  谷歌：异步函数（域，类型）{
    const resp = 等待 http({
      网址：`https://8.8.4.4/resolve`，
      参数：{
        名称：域名，
        类型：类型==='IPv6'？ 'AAAA'：'A'，
      },
      标题：{
        接受：'应用程序/dns-json'，
      },
    })
    const body = JSON.parse(resp.body)
    if (body['状态'] !== 0) {
      抛出新错误（`状态为 ${body['Status']}`）
    }
    const 答案 = body['答案']
    if (answers.length === 0) {
      throw new Error('域名解析无结果')
    }
    返回答案[answers.length - 1].data
  },

  cf: 异步函数（域，类型）{
    const resp = 等待 http({
      url: `https://1.0.0.1/dns-query`,
      参数：{
        名称：域名，
        类型：类型==='IPv6'？ 'AAAA'：'A'，
      },
      标题：{
        接受：'应用程序/dns-json'，
      },
    })
    const body = JSON.parse(resp.body)
    if (body['状态'] !== 0) {
      抛出新错误（`状态为 ${body['Status']}`）
    }
    const 答案 = body['答案']
    if (answers.length === 0) {
      throw new Error('域名解析无结果')
    }
    返回答案[answers.length - 1].data
  },
  ali：异步函数（域，类型）{
    const resp = 等待 http({
      网址：`http://223.6.6.6/resolve`，
      参数：{
        名称：域名，
        短: 1,
        类型：类型==='IPv6'？ 'AAAA'：'A'，
      },
      标题：{
        接受：'应用程序/dns-json'，
      },
    })
    const 答案 = JSON.parse(resp.body)
    if (answers.length === 0) {
      throw new Error('域名解析无结果')
    }
    返回答案[answers.length - 1]
  },
  腾讯：异步函数（域，类型）{
    const resp = 等待 http({
      网址：`http://119.28.28.28/d`，
      参数：{
        dn：域名，
        类型：类型==='IPv6'？ 'AAAA'：'A'，
      },
      标题：{
        接受：'应用程序/dns-json'，
      },
    })
    const 答案 = resp.body.split(';').map(i => i.split(',')[0])
    if (answers.length === 0 || String(answers) === '0') {
      throw new Error('域名解析无结果')
    }
    返回答案[answers.length - 1]
  },
}
异步函数resolveDomain（域）{
  让IPv4
  让IPv6
  if (isIPv4(域)) {
    IPv4 = 域
  } else if (isIPv6(域)) {
    IPv6 = 域
  } 别的 {
    让resolverName = $.lodash_get(arg, 'DNS') || '阿里'
    让解析器 = DOMAIN_RESOLVERS[解析器名称]
    如果（！解析器）{
      解析器名称 = 'ali'
      解析器 = DOMAIN_RESOLVERS[解析器名称]
    }
    const msg = `使用 ${resolverName} 解析域名 ${domain}`
    const res = 等待 Promise.all([
      （异步（）=> {
        尝试 {
          返回等待解析器（域，'IPv4'）
        } 捕获 (e) {
          // $.logErr(`${msg} 发生错误: ${e.message || e}`)
        }
      })(),
      （异步（）=> {
        尝试 {
          返回等待解析器（域，'IPv6'）
        } 捕获 (e) {
          // $.logErr(`${msg} 发生错误: ${e.message || e}`)
        }
      })(),
    ]）
    const [v4, v6] = 资源

    如果 (isIPv4(v4)) {
      IPv4 = v4
    } 别的 {
      $.logErr(`${msg} 解析 IPv4 失败`)
    }
    如果（isIPv6（v6））{
      IPv6=v6
    } 别的 {
      $.logErr(`${msg} 解析 IPv6 失败`)
    }
  }
  返回 { IP: IPv4 || IPv6、IPv4、IPv6 }
}
// 来源：https://stackoverflow.com/a/36760050
const IPV4_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4 }$/

// 来源：https://ihateregex.io/expr/ipv6/
常量 IPV6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F] {1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4 }|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0 -9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA- F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1, 4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((: [0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)| fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4 }){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0 -9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9] )|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0 -9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9] ){0,1}[0-9]))$/

函数 isIPv4(ip) {
  返回 IPV4_REGEX.test(ip)
}

函数 isIPv6(ip) {
  返回 IPV6_REGEX.test(ip)
}
函数 isIP(ip) {
  返回 isIPv4(ip) ||是IPv6(ip)
}
异步函数 getProxies() {
  让代理=[]
  如果 ($.isStash()) {
    尝试 {
      const res = 等待 $.http.get({
        网址：`http://127.0.0.1:9090/providers/proxies`，
      })
      让 body = String($.lodash_get(res, 'body') || $.lodash_get(res, 'rawBody'))
      尝试 {
        正文 = JSON.parse(正文)
      } 捕捉 (e) {}

      // $.log(JSON.stringify(body, null, 2))
      PROXIES = Object.values(body.providers)
        .map(i => i.proxies)
        。平坦的（）
        .reduce((obj, i) => {
          obj[i.名称] = i.地址
          返回对象
        }, {})
    } 捕获 (e) {
      $.logErr(e)
      $.logErr($.toStr(e))
    }
  }
  返回 { 代理 }
}
异步函数 httpAPI(path = '/v1/requests/recent', method = 'GET', body = null) {
  返回新的 Promise((解决, 拒绝) => {
    $httpAPI(方法、路径、正文、结果=> {
      解决（结果）
    })
  })
}
函数 isRequest() {
  返回 $request 的类型 !== '未定义'
}
函数 isPanel() {
  return $.isSurge() && typeof $input != 'undefined' && $.lodash_get($input, '目的') === '面板'
}
函数 isTile() {
  返回 （
    $.isStash() &&
    ((typeof $script != '未定义' && $.lodash_get($script, 'type') === 'tile') ||
      $.lodash_get(arg, 'TYPE') === 'TILE')
  ）
}
函数 isInteraction() {
  返回 （
    ($.isQuanX() &&
      typeof $environment != '未定义' &&
      $.lodash_get($environment, 'executor') === '事件交互') ||
    ($.isLoon() && typeof $environment != '未定义' && $.lodash_get($environment, 'params.node'))
  ）
}
函数 getNodeOpt() {
  让选择= {}
  if (isInteraction()) {
    如果 ($.isQuanX()) {
      选择={
        选择：{
          策略：$environment.params，
        },
      }
    } 否则 if ($.isLoon()) {
      选择={
        节点：$environment.params.node，
      }
    }
  }
  返回选择
}
// 请求
异步函数 http(opt = {}) {
  const TIMEOUT = parseFloat(opt.timeout || $.lodash_get(arg, 'TIMEOUT') || 5)
  const RETRIES = parseFloat(opt.retries || $.lodash_get(arg, 'RETRIES') || 1)
  const RETRY_DELAY = parseFloat(opt.retry_delay || $.lodash_get(arg, 'RETRY_DELAY') || 1)

  让超时 = 超时 + 1
  超时= $.isSurge() ？超时 : 超时 * 1000

  让计数 = 0
  const fn = async () => {
    尝试 {
      如果（超时）{
        // Surge、Loon、Stash默认为5秒
        返回等待 Promise.race([
          $.http.get({ ...opt, 超​​时 }),
          新的承诺（（_，拒绝）=> setTimeout（（）=>拒绝（新的错误（“HTTP超时”）），超时* 1000）），
        ]）
      }
      返回等待 $.http.get(opt)
    } 捕获 (e) {
      if (计数 < 重试次数) {
        计数++
        $.log(`第${count}次请求失败: ${e.message || e},等待${RETRY_DELAY}s后重试`)
        等待 $.wait(RETRY_DELAY * 1000)
        返回等待 fn()
      }
    }
  }
  返回等待 fn()
}
// 通知
异步函数notify(title, subt, desc, opts) {
  if ($.lodash_get(arg, 'TYPE') === 'EVENT' || $.lodash_get(arg, 'notify') == 1) {
    $.msg(标题、副标题、描述、选项)
  } 别的 {
    $.log('🔕', 标题, subt, desc, opts)
  }
}

// 更漂亮-忽略
函数 Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t ;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r) =>{t?a(t):e(s)})})}get(t){返回this.send.call(this.env,t)}post(t){返回this.send.call( this.env,t,"POST")}}返回新类{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile=" box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=( new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $环境&&$环境["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"节点。 js":"未定义"!=typeof $task?"Quantumult X":"未定义"!=typeof $loon?"Loon":"未定义"!=typeof $rocket?"Shadowrocket":void 0}isNode(){ return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()} isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv() }toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e} }getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson (t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url: t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi"); a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r =e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body :{script_text:t,mock_type:"cron",超时:r},标题:{"X-Key":i,Accept:"*/*"},超时:r};this.post(n,(t ,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs= this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e= this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{} ;{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode( )){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve( this.dataFile),e=this.path。解析(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this .fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace (/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t], void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString( ).match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s]) ===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t) [e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a ]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON. parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}返回 e}setdata(t,e){let s=!1; if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval( a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r, t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify (i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash ":case"Shadowrocket":返回 $persistentStore.read(t);case"Quantumult X":返回 $prefs.valueForKey(t);case"Node.js":返回 this.data=this.loaddata(),this .data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case" Stash":case"Shadowrocket":返回 $persistentStore.write(t,e);case"Quantumult X":返回 $prefs.setValueForKey(t,e);case"Node.js":返回 this.data=this. loaddata(),this.data[e]=t,this.writedata(),!0;默认:返回this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got ?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:新 this.cktough。 CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t ,e=(()=>{})){switch(t.headers&&(删除 t.headers["Content-Type"],删除 t.headers["Content-Length"],删除 t.headers["content -type"],删除 t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge ":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{" X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s .status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{} ,Object.assign(t.opts,{提示:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes :o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError "));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("重定向",(t,e) =>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this. ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers :i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n )},t=>{const{消息:a,响应:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=( ()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t. headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(删除 t.headers["Content-Length"],删除 t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&& (t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s) ,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)}) ;break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task .fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a, headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require(" iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s ,statusCode:r,标头:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,标头:i,rawBody:o, body:n},n)},t=>{const{消息:s,响应:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}时间(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+ ":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S :s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length )));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a [e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"= =typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg( e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()) {case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t}; case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t .openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s= t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url|| t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url ":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case "Loon":case"Stash":case"Shadowrocket":默认:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a, i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣 ============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n" )),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]), console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket": case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️$ {this.name}, 错误!`,t.stack)}}wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date) ).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default: $done(t);break;case"Node.js":process.exit(1)}}}(t,e)}js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl|| t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl| |t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl, s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s, "update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon": case"Stash":case"Shadowrocket":默认:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r) );break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣==== ========="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this .logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log( t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X ":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name }, 错误!`,t.stack)}}wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime( ),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default: $done(t);break;case"Node.js":process.exit(1)}}}(t,e)}js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl|| t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl| |t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl, s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s, "update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon": case"Stash":case"Shadowrocket":默认:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r) );break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣==== ========="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this .logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log( t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X ":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name }, 错误!`,t.stack)}}wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime( ),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default: $done(t);break;case"Node.js":process.exit(1)}}}(t,e)}this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log (t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this. name}, 错误!`,t.stack)}}wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime (),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name},结束！🕛${s}秒`),this.log(), this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js": process.exit(1)}}}(t,e)}this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log (t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this. name}, 错误!`,t.stack)}}wait(t){返回新的 Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime (),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name},结束！🕛${s}秒`),this.log(), this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js": process.exit(1)}}}(t,e)}
