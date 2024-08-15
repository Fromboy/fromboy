// Quantumult X Script to set specific country nodes with unified name and flag
// by ChatGPT 修改节点名字加国旗

// 定义规则：根据节点名称设置统一的名称和国旗
const modifyNodes = (nodeList) => {
  nodeList.forEach(node => {
    // 如果节点名称包含 "US" 或 "美国"
    if (node.name.includes("US") || node.name.includes("美国")) {
      node.name = "United States";  // 设置为 "United States"
      node.tag = "🇺🇸";  // 设置为美国国旗
    }

    // 如果节点名称包含 "JP" 或 "日本"
    if (node.name.includes("JP") || node.name.includes("日本")) {
      node.name = "Japan";  // 设置为 "Japan"
      node.tag = "🇯🇵";  // 设置为日本国旗
    }

    // 你可以在这里添加更多规则以支持其他国家
    // 例如：
    // if (node.name.includes("CN") || node.name.includes("中国")) {
    //   node.name = "China";  // 设置为 "China"
    //   node.tag = "🇨🇳";  // 设置为中国国旗
    // }
  });
  return nodeList;
};

// 获取订阅节点列表（替换为实际的获取方式）
let nodes = $sub.fetch();  // Fetch the nodes from the subscription

// 修改节点列表
nodes = modifyNodes(nodes);

// 输出修改后的节点列表
$sub.save(nodes);  // Save the modified nodesmo f
