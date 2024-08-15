/*
// Quantumult X 节点名称和国旗替换脚本 (支持常见国家)
// 该脚本将根据节点名称中的关键词匹配替换相应的国家名称及国旗。

[rewrite_local]
^https?:\/\/.*\/path\/to\/nodeRename$ url script-response-body https://raw.githubusercontent.com/Fromboy/JavaScript/Scripts/Rename%20Node.js




*/

let body = $response.body;

// 创建国家和国旗的对应表
const countryFlags = {
  "香港": "Hong Kong 🇭🇰",
  "Hong Kong": "Hong Kong 🇭🇰",
  "台湾": "Taiwan 🇹🇼",
  "Taiwan": "Taiwan 🇹🇼",
  "日本": "Japan 🇯🇵",
  "Japan": "Japan 🇯🇵",
  "美国": "United States 🇺🇸",
  "USA": "United States 🇺🇸",
  "United States": "United States 🇺🇸",
  "新加坡": "Singapore 🇸🇬",
  "Singapore": "Singapore 🇸🇬",
  "韩国": "South Korea 🇰🇷",
  "South Korea": "South Korea 🇰🇷",
  "韩国": "South Korea 🇰🇷",
  "俄罗斯": "Russia 🇷🇺",
  "Russia": "Russia 🇷🇺",
  "德国": "Germany 🇩🇪",
  "Germany": "Germany 🇩🇪",
  "英国": "United Kingdom 🇬🇧",
  "UK": "United Kingdom 🇬🇧",
  "United Kingdom": "United Kingdom 🇬🇧",
  "法国": "France 🇫🇷",
  "France": "France 🇫🇷",
  "印度": "India 🇮🇳",
  "India": "India 🇮🇳",
  "澳大利亚": "Australia 🇦🇺",
  "Australia": "Australia 🇦🇺",
  "加拿大": "Canada 🇨🇦",
  "Canada": "Canada 🇨🇦",
  "巴西": "Brazil 🇧🇷",
  "Brazil": "Brazil 🇧🇷",
  "意大利": "Italy 🇮🇹",
  "Italy": "Italy 🇮🇹",
  "西班牙": "Spain 🇪🇸",
  "Spain": "Spain 🇪🇸",
  "瑞士": "Switzerland 🇨🇭",
  "Switzerland": "Switzerland 🇨🇭",
  "荷兰": "Netherlands 🇳🇱",
  "Netherlands": "Netherlands 🇳🇱",
  "瑞典": "Sweden 🇸🇪",
  "Sweden": "Sweden 🇸🇪",
  "挪威": "Norway 🇳🇴",
  "Norway": "Norway 🇳🇴",
  "芬兰": "Finland 🇫🇮",
  "Finland": "Finland 🇫🇮",
  "丹麦": "Denmark 🇩🇰",
  "Denmark": "Denmark 🇩🇰",
  "比利时": "Belgium 🇧🇪",
  "Belgium": "Belgium 🇧🇪",
  "南非": "South Africa 🇿🇦",
  "South Africa": "South Africa 🇿🇦",
  "墨西哥": "Mexico 🇲🇽",
  "Mexico": "Mexico 🇲🇽",
  "阿根廷": "Argentina 🇦🇷",
  "Argentina": "Argentina 🇦🇷"
};

// 遍历每个国家，进行替换操作
for (const [country, replacement] of Object.entries(countryFlags)) {
  const regex = new RegExp(country, 'gi');
  body = body.replace(regex, replacement);
}

// 返回修改后的内容
$done({ body });
