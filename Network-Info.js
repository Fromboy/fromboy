/*
 * 浪涌网络详情
 * 由@Nebulosa-Cat编写
 * 由@Rabbit-Spec翻译
 * 更新日期：2023.04.22
 * 版本：3.5
 */

/**
 * 网络请求封装为 Promise
 * 用法: httpMethod.get(option).then(response => { logger.log(data) }).catch(error => { logger.log(error) })
 * 用法: httpMethod.post(option).then(response => { logger.log(data) }).catch(error => { logger.log(error) })
 * 响应：{ 状态、标头、数据 }
 */
类http方法{
  /**
   * 回调函数
   * @param {*} 解析
   * @param {*} 拒绝
   * @param {*} 错误
   * @param {*} 响应
   * @param {*} 数据
   */
  静态_httpRequestCallback（解决，拒绝，错误，响应，数据）{
    如果（错误）{
      拒绝（错误）；
    } 别的 {
      解析（Object.分配（响应，{数据}））；
    }
  }

  /**
   * HTTP 获取
   * @param {Object} 选项 选项
   * @返回
   */
  静态获取（选项= {}）{
    返回新的 Promise((解决, 拒绝) => {
      $httpClient.get(选项, (错误, 响应, 数据) => {
        this._httpRequestCallback(解决、拒绝、错误、响应、数据);
      });
    });
  }

  /**
   * HTTP 发布
   * @param {Object} 选项 选项
   * @返回
   */
  静态帖子（选项= {}）{
    返回新的 Promise((解决, 拒绝) => {
      $httpClient.post(选项, (错误, 响应, 数据) => {
        this._httpRequestCallback(解决、拒绝、错误、响应、数据);
      });
    });
  }
}

类 loggerUtil {
  构造函数（）{
    this.id = randomString();
  }

  日志（消息）{
    消息 = `[${this.id}] [ LOG ] ${message}`;
    控制台.log(消息);
  }

  错误信息） {
    消息 = `[${this.id}] [错误] ${message}`;
    控制台.log(消息);
  }
}

var logger = new loggerUtil();

函数随机字符串（e = 6）{
  var t =“ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678”，
    a = t.长度，
    n =“”；
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  返回n；
}

函数 getFlagEmoji(国家代码) {

if (countryCode.toUpperCase() == 'TW') {
    国家/地区代码 = 'CN'
  }

  const codePoints = 国家/地区代码
    .toUpperCase()
    。分裂（''）
    .map((char) => 127397 + char.charCodeAt());
  返回 String.fromCodePoint(...codePoints);
}

函数 loadCarrierNames() {
  //整理逻辑：前三码相同->后两码相同运营商->剩余的
  返回 {
    //台湾运营商台湾
    '466-11': '中华电信', '466-92': '中华电信',
    '466-01': '远传电信', '466-03': '远传电信',
    '466-97': '台湾大哥大', '466-89': '台湾之星', '466-05': 'GT',
    // 大陆运营商 中国
    '460-03': '中国电信', '460-05': '中国电信', '460-11': '中国电信',
    '460-01': '中国联通', '460-06': '中国联通', '460-09': '中国联通',
    '460-00': '中国移动', '460-02': '中国移动', '460-04': '中国移动', '460-07': '中国移动', '460-08': '中国移动',
    '460-15': '中国广电', '460-20': '中移铁通',
    //香港运营商 HongKong
    '454-00'：'中超联赛'，'454-02'：'中超联赛'，'454-10'：'中超联赛'，'454-18'：'中超联赛'，
    '454-03': '3', '454-04': '3', '454-05': '3',
    '454-06': 'SMC HK', '454-15': 'SMC HK', '454-17': 'SMC HK',
    '454-09': '中国移动香港', '454-12': '中国移动香港', '454-13': '中国移动香港', '454-28': '中国移动香港', '454-31': '中国移动香港',
    '454-16': 'csl.', '454-19': 'csl.', '454-20': 'csl.', '454-29': 'csl.',
    '454-01': '中信国际电讯', '454-07': '联通香港', '454-08': 'Truphone', '454-11': 'CHKTL', '454-23': '莱卡莫比尔',
    //日本运营商日本
    '440-00': 'Y!mobile', '440-10': 'docomo', '440-11': '乐天', '440-20': '软银',
    '440-50': ' au', '440-51': ' au', '440-52': ' au', '440-53': ' au', '440-54': ' au',
    '441-00': 'WCP', '441-10': 'UQ WiMAX',
    // 韩国运营商 韩国
    '450-03': 'SKT', '450-05': 'SKT',
    '450-02'：'KT'，'450-04'：'KT'，'450-08'：'KT'，
    '450-06': 'LG U+', '450-10': 'LG U+',
    //美国运营商美国
    “310-030”：“AT&T”、“310-070”：“AT&T”、“310-150”：“AT&T”、“310-170”：“AT&T”、“310-280”：“AT&T”、 “310-380”：“AT&T”、“310-410”：“AT&T”、“310-560”：“AT&T”、“310-680”：“AT&T”、“310-980”：“AT&T”、
    “310-160”：“T-Mobile”、“310-200”：“T-Mobile”、“310-210”：“T-Mobile”、“310-220”：“T-Mobile”、“310” -230'：'T-Mobile'，'310-240'：'T-Mobile'，'310-250'：'T-Mobile'，'310-260'：'T-Mobile'，'310-270 ': 'T-Mobile', '310-300': 'T-Mobile', '310-310': 'T-Mobile', '310-660': 'T-Mobile', '310-800': “T-Mobile”、“311-660”：“T-Mobile”、“311-882”：“T-Mobile”、“311-490”：“T-Mobile”、“312-530”：“T” -移动”、“311-870”：“T-Mobile”、“311-880”：“T-Mobile”、
    '310-004'：'威瑞森'，'310-010'：'威瑞森'，'310-012'：'威瑞森'，'310-013'：'威瑞森'，'311-110'：'威瑞森'， '311-270'：'威瑞森'，'311-271'：'威瑞森'，'311-272'：'威瑞森'，'311-273'：'威瑞森'，'311-274'：'威瑞森'， '311-275'：'威瑞森'，'311-276'：'威瑞森'，'311-277'：'威瑞森'，'311-278'：'威瑞森'，'311-279'：'威瑞森'， '311-280'：'威瑞森'，'311-281'：'威瑞森'，'311-282'：'威瑞森'，'311-283'：'威瑞森'，'311-284'：'威瑞森'， '311-285'：'威瑞森'，'311-286'：'威瑞森'，'311-287'：'威瑞森'，'311-288'：'威瑞森'，'311-289'：'威瑞森'， '311-390'：'威瑞森'，'311-480'：'威瑞森'，'311-481'：'威瑞森'，'311-482'：'威瑞森'，'311-483'：'威瑞森'， '311-484'：'威瑞森'，'311-485'：'威瑞森'，'311-486'：'威瑞森'，'311-487'：'威瑞森'，'311-488'：'威瑞森'， '311-489'：'威瑞森'，'310-590'：'威瑞森'，'310-890'：'威瑞森'，'310-910'：'威瑞森'，
    '310-120': '冲刺',
    '310-850'：'Aeris 通讯。 Inc.”、“310-510”：“Airtel Wireless LLC”、“312-090”：“联合无线通信公司”、“310-710”：“北极坡电话协会合作公司”、“311-440” ：“Bluegrass Wireless LLC”、“311-800”：“Bluegrass Wireless LLC”、“311-810”：“Bluegrass Wireless LLC”、“310-900”：“有线与通信公司”、“311-590” ：“California RSA No. 3 Limited Partnership”、“311-500”：“Cambridge Telephone Company Inc.”、“310-830”：“Caprock Cellular Ltd.”、“312-270”：“Cellular Network Partnership LLC” 、“312-280”：“蜂窝网络合作伙伴 LLC”、“310-360”：“蜂窝网络合作伙伴 LLC”、“311-120”：“Choice Phone LLC”、“310-480”：“Choice Phone LLC” 、“310-420”：“辛辛那提贝尔无线有限责任公司”、“310-180”：“Cingular Wireless”、“310-620”：“科尔曼县电信/Trans TX”、“310-06”：“联合电信” 、“310-60”：“Consolidated Telcom”、“310-700”：“Cross Valliant Cellular Partnership”、“312-030”：“Cross Wireless Telephone Co.”、“311-140”：“Cross Wireless Telephone Co.” .'、'312-040'：'卡斯特电话合作公司'、'310-440'：'多布森蜂窝系统'、'310-990'：'ENMR 电话合作社'、'312-120'：'东肯塔基网络有限责任公司”，“312-130”：“东肯塔基网络有限责任公司”，“310-750”：“东肯塔基网络有限责任公司”，“310-090”：“边缘无线有限责任公司”，“310-610”：“埃尔克哈特电信公司/ Epic Touch Co.”、“311-311”：“Farmers”、“311-460”：“Fisher Wireless Services Inc.”、“311-370”：“GCI Communication Corp.”、“310-430”： “GCI Communication Corp.”、“310-920”：“Get Mobile Inc.”、“311-340”：“伊利诺伊谷蜂窝 RSA 2 合作伙伴”、“312-170”：“爱荷华州 RSA No. 2 有限合作伙伴” 、“311-410”：“爱荷华 RSA 第 2 号有限合伙企业”、“310-770”：“爱荷华无线服务有限责任公司”、“310-650”：“贾斯珀”、“310-870”：“卡普兰电话公司” Inc.'、'312-180'：'Keystone Wireless LLC'、'310-690'：'Keystone Wireless LLC'、'311-310'：'拉马尔县蜂窝'、'310-016'：'Leap Wireless International Inc.'，'310-040'：'马塔努斯卡电话。协会。 Inc.”、“310-780”：“Message Express Co. / Airlink PCS”、“311-330”：“密歇根无线有限责任公司”、“310-400”：“明尼苏达州南部”。威雷尔。 Co. / Hickory”，“311-010”：“密苏里州 RSA No 5 合作伙伴”，“312-010”：'密苏里 RSA 5 号合作伙伴'、'311-020'：'密苏里 RSA 5 号合作伙伴'、'312-220'：'密苏里 RSA 5 号合作伙伴'、'311-920'：'密苏里 RSA 5 号合作伙伴'、 “310-350”：“Mohave Cellular LP”，“310-570”：“MTPCS LLC”，“310-290”：“NEP Cellcorp Inc.”，“310-34”：“内华达无线有限责任公司”，“310” -600'：'New-Cell Inc.'，'311-300'：'Nexus Communications Inc.'，'310-130'：'北卡罗来纳州 RSA 3 蜂窝电话。 Co.”、“312-230”：“北达科他州网络公司”、“311-610”：“北达科他州网络公司”、“310-450”：“东北科罗拉多州蜂窝公司”、“311-710”： “东北无线网络有限责任公司”、“310-011”：“北极星”、“310-670”：“北极星”、“311-420”：“西北密苏里州蜂窝有限合伙企业”、“310-760”：“狭长地带电话” Cooperative Inc.”、“310-580”：“PCS ONE”、“311-170”：“PetroCom”、“311-670”：“Pine Belt Cellular, Inc.”、“310-100”：“高原电信” Inc.”、“310-940”：“Poka Lambro Telco Ltd.”、“310-500”：“公共服务蜂窝公司”、“312-160”：“RSA 1 有限合伙企业”、“311-430” ：“RSA 1 有限合伙企业”、“311-350”：“Sagebrush Cellular Inc.”、“310-46”：“SIMMETRY”、“311-260”：“SLO Cellular Inc / 圣路易斯的 Cellular One”、“ 310-320'：'史密斯巴格利公司'，'316-011'：'南方通信服务公司'，'310-740'：'Telemetrix公司'，'310-14'：'测试'，'310 -860'：'德克萨斯 RSA 15B2 有限合伙企业'，'311-050'：'Thumb Cellular 有限合伙企业'，'311-830'：'Thumb Cellular 有限合伙企业'，'310-460'：'TMP Corporation'，' 310-490'：'Triton PCS'，'312-290'：'尤因塔盆地电子电信公司'，'311-860'：'尤因塔盆地电子电信公司'，'310-960'：'尤因塔盆地电子公司电信公司”、“310-020”：“联合电话公司”、“311-220”：“美国移动通信公司”、“310-730”：“美国移动通信公司”、“311-650” ': '联合无线通信公司', '310-003': '未知', '310-15': '未知', '310-23': '未知', '310-24': '未知', “310-25”：“未知”、“310-26”：“未知”、“310-190”：“未知”、“310-950”：“未知”、“310-38”：“美国 3650 AT&T” ', '310-999': '各种网络', '310-520':“VeriSign”、“310-530”：“西弗吉尼亚无线”、“310-340”：“Westlink Communications, LLC”、“311-070”：“威斯康星州 RSA #7 有限合伙企业”、“310-390”： “约克维尔电话合作社”，
    //英国运营商英国
    '234-08'：'BT OnePhone UK'，'234-10'：'O2-UK'，'234-15'：'沃达丰英国'，'234-20'：'3'，'234-30' ：'EE'、'234-33'：'EE'、'234-38'：'处女'、'234-50'：'JT'、'234-55'：'当然'、'234-58' ：“马恩岛电信”，
    //菲律宾运营商
    '515-01'：'Islacom'，'515-02'：'环球'，'515-03'：'智能'，'515-04'：'太阳'，'515-08'：'下一个移动' , '515-18': '固化', '515-24': 'ABS-CBN',
    //越南运营商 越南
    '452-01'：'Mobifone'，'452-02'：'VinaPhone'，'452-03'：'S-Fone'，'452-04'：'Viettel'，'452-05'：'VietNamobile ', '452-06': '电子移动', '452-07': 'Gmobile',
  };
}

//获取手机运营商信息（通过内置的API调用设备信息）
函数 getCellularInfo() {
  常量无线电生成 = {
    'GPRS': '2.5G',
    'CDMA1x': '2.5G',
    '边缘'：'2.75G'，
    'WCDMA': '3G',
    'HSDPA': '3.5G',
    'CDMAEVDORev0': '3.5G',
    'CDMAEVDORevA': '3.5G',
    'CDMAEVDORevB': '3.75G',
    'HSUPA': '3.75G',
    'eHRPD': '3.9G',
    “LTE”：“4G”，
    “NRNSA”：“5G”，
    “NR”：“5G”，
  };

  让cellularInfo = '';
  const 载体名称 = loadCarrierNames();
  if ($network['蜂窝数据']) {
    const CarrierId = $network['蜂窝数据'].Carrier;
    const radio = $network['蜂窝数据'].radio;
    if ($network.wifi?.ssid == null && radio) {
      蜂窝信息 = 运营商名称[运营商 ID] ？
        `${载体名称[载体Id]} | ${radioGeneration[radio]} - ${radio} ` :
        ` 蜂窝数据 | ${radioGeneration[radio]} - ${radio}`;
    }
  }
  返回蜂窝信息；
}

函数 getSSID() {
  返回 $network.wifi?.ssid;
}

函数 getIP() {
  const { v4, v6 } = $网络;
  让信息=[]；
  如果 (!v4 && !v6) {
    info = ['网路可能中断', '请手动刷新以重新获取IP'];
  } 别的 {
    if (v4?.primaryAddress) info.push(`设备IP：${v4?.primaryAddress}`);
    if (v6?.primaryAddress) info.push(`IPv6地址：已分配`);
    if (v4?.primaryRouter && getSSID()) info.push(`路由器IP：${v4?.primaryRouter}`);
    if (v6?.primaryRouter && getSSID()) info.push(`IPv6地址：已分配`);
  }
  信息 = info.join("\n");
  返回信息+“\n”；
}

/**
 * 获取IP信息
 * @param {*} retryTimes // 重试次数
 * @param {*} retryInterval // 重试间隔 ms
 */
函数 getNetworkInfo(重试次数 = 5, 重试间隔 = 1000) {
  // 发送网络请求
  httpMethod.get('http://ip-api.com/json').then(response => {
    if (数字(响应.状态) > 300) {
      throw new Error(`请求错误，http状态代码：${response.status}\n${response.data}`);
    }
    const info = JSON.parse(response.data);
    $完成({
      标题： getSSID() ??获取蜂窝信息(),
      内容：
        获取IP() +
        `节点IP：${info.query}\n` +
        ` 节点ISP：${info.isp}\n` +
        ` 节点位置：${getFlagEmoji(info.countryCode)} | ${info.country} - ${info.city}`,
      图标：getSSID() ? 'wifi' : 'SIM卡',
      '图标颜色': getSSID() ? '#5A9AF9': '#8AB8DD',
    });
  }).catch(错误=> {
    // 网络切换
    if (String(error).startsWith("网络已更改")) {
      如果（获取SSID（））{
        $network.wifi = 未定义；
        $network.v4 = 未定义；
        $network.v6 = 未定义；
      }
    }
    //判断是否还有重试机会
    if (重试次数 > 0) {
      记录器.错误（错误）；
      logger.log(`${retryInterval}ms 后重试`);
      // retryInterval 时间后再次执行该函数
      setTimeout(() => getNetworkInfo(--retryTimes, retryInterval), retryInterval);
    } 别的 {
      // 打印日志
      记录器.错误（错误）；
      $完成({
        title: '发生错误',
        content: '无法获取当前网络信息\n请检查网络状态后重试',
        图标: 'wifi.感叹号',
        '图标颜色': '#CB1B45',
      });
    }
  });
}

/**
 * 主要逻辑，程序入口
 */
(() => {
  const 重试次数 = 5;
  常量重试间隔 = 1000;
  // Surge脚本超时时间设置为30s
  //提前500ms手动结束进程
  常量 SurgeMaxTimeout = 29500;
  // 脚本超时时间
  // retryTimes * 5000 为每次网络请求超时时间（Surge 网络请求超时为 5s）
  const scriptTimeout = 重试次数 * 5000 + 重试次数 * 重试间隔；
  设置超时（（）=> {
    logger.log("脚本超时");
    $完成({
      title: "请求超时",
      content: "连接请求超时\n请检查网络状态后重试",
      图标: 'wifi.感叹号',
      '图标颜色': '#CB1B45',
    });
  }, scriptTimeout > SurgeMaxTimeout ? SurgeMaxTimeout : 脚本超时);

  // 获取网络信息
  logger.log("脚本开始");
  getNetworkInfo(重试次数, 重试间隔);
})();
