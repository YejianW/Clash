// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];

// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];

// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:microsoft": domesticNameservers,
    "geosite:onedrive": domesticNameservers,
    "geosite:apple": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};

// ====================
// 1. 高级设置 (用户修改区)
// ====================
// 【BIOS WiFi 专属白名单】
// 只有在连接 BIOS WiFi 时，这些业务才走 "自定义"。
// 在其他 WiFi 下，这些业务按正常规则集处理（例如B站直连，谷歌代理）。
const specificBusinessRules = [
  // YouTube
  ["DOMAIN-SUFFIX", "alphafoldserver.com"],
  ["DOMAIN-SUFFIX", "greasyfork.org"],
  ["DOMAIN-SUFFIX", "linux.do"]
];

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "onedrive": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/Providers/Ruleset/OneDrive.yaml",
    "path": "./ruleset/ACL4SSR/onedrive.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/blackmatrix7/google.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/Providers/Ruleset/Microsoft.yaml",
    "path": "./ruleset/ACL4SSR/microsoft.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/blackmatrix7/openai.yaml"
  },
  "gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/jinxinkai/clash-ai-rules/master/Gemini.yaml",
    "path": "./ruleset/jinxinkai/gemini.yaml"
  },
  "grok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/Accademia/Additional_Rule_For_Clash/main/Grok/Grok.yaml",
    "path": "./ruleset/accademia/grok.yaml"
  },
  "anthropic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://magicrule.pages.dev/data/_shared/artifacts/Anthropic_classical-rest_110041703b11ecf4.yaml"
  },
};

// ====================
// 3. 代理 Provider
// ====================
const proxyProviderKeys = [
  "ikuuu1",
  "ikuuu2",
  "赔钱机场",
  "free-node",
];


// ====================
// 5. 规则生成逻辑 (核心更新)
// ====================
function generateRules() {
  const finalRules = [];
  // =============================================
  // specificBusinessRules逻辑规则 (AND)
  // =============================================

  specificBusinessRules.forEach(([type, value]) => {
    finalRules.push(`${type},${value},自定义`);
  });

  //finalRules.push("MATCH,DIRECT");

  finalRules.push(
    "DOMAIN,localhost,DIRECT",
    "IP-CIDR,192.168.0.0/16,DIRECT",
    "IP-CIDR,10.0.0.0/8,DIRECT",
    "IP-CIDR,172.16.0.0/12,DIRECT", // 你的 IP 虽然在这，但如果匹配了上面的 AND 规则，这行不会执行
    "IP-CIDR,127.0.0.0/8,DIRECT",
    "IP-CIDR,fc00::/7,DIRECT",
    "IP-CIDR,fe80::/10,DIRECT",
    "DOMAIN,clash.razord.top,DIRECT",
    "DOMAIN,yacd.haishan.me,DIRECT",
    "GEOIP,LAN,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT,no-resolve"
  );

  // =============================================
  // 4. 通用规则
  // =============================================
  // 自定义规则
  finalRules.push(
    "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
    "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
    "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
    "DOMAIN,v2rayse.com,节点选择" // V2rayse节点工具
  );
  // blackmatrix7 规则集
  finalRules.push(
    "RULE-SET,openai,ChatGPT", 
    "RULE-SET,gemini,Gemini", 
    "RULE-SET,grok,Grok",
    "RULE-SET,anthropic,Anthropic",
    "RULE-SET,onedrive,微软服务",
    "RULE-SET,microsoft,微软服务",
    "RULE-SET,icloud,苹果服务",
    "RULE-SET,apple,苹果服务",
    "RULE-SET,google,谷歌服务",
    "RULE-SET,applications,全局直连",
    "RULE-SET,private,全局直连",
    "RULE-SET,reject,广告过滤",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,gfw,节点选择",
    "RULE-SET,tld-not-cn,节点选择",
    "RULE-SET,direct,全局直连",
    "RULE-SET,lancidr,全局直连,no-resolve",
    "RULE-SET,cncidr,全局直连,no-resolve",
    "RULE-SET,telegramcidr,电报消息,no-resolve",
    // 其他规则
    "GEOIP,LAN,全局直连,no-resolve",
    "GEOIP,CN,全局直连,no-resolve",
    // 兜底
    "MATCH,漏网之鱼"
  );

  return finalRules;
}

// 代理组通用配置
const groupBaseOption = {
  "interval": 600,
  "timeout": 3000,
  "tolerance": 100,
  "url": "https://www.gstatic.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false,
  "include-all": false
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 1. 获取物理局域网 IP (Clash Verge 会传入这个字段)
  // 如果是 TUN 模式，这个字段通常还是能取到物理网卡的 IP (取决于 Verge 版本)
  const realLanIp = config.metadata?.clash_lan_ip || "";
  console.log("Source IP:", config.metadata?.sourceIP);
  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 获取 YAML 中已定义的 Proxy Providers
  const existingProviders = config["proxy-providers"] || {};
  // 只保留 YAML 中实际定义的 Provider
  const allProviderKeys = proxyProviderKeys.filter(
    name => Object.prototype.hasOwnProperty.call(existingProviders, name)
  );

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = generateRules();


  // 定义地区分组
  const regionGroups = [
{
  ...groupBaseOption,
  "name": "🇭🇰香港节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇭🇰|(?<![A-Za-z])HK(?![A-Za-z])|Hong|香港|深港|沪港|京港|港)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇹🇼台湾节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇹🇼|(?<![A-Za-z])TW(?![A-Za-z])|(?<![A-Za-z])TWN(?![A-Za-z])|Taiwan|Taipei|台湾|台灣|台北|台中|新北|彰化)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇯🇵日本节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇯🇵|(?<![A-Za-z])JP(?![A-Za-z])|Japan|Tokyo|日本|东京|大阪|京日|苏日|沪日|上日|川日|深日|广日|日)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇸🇬新加坡节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇸🇬|(?<![A-Za-z])SG(?![A-Za-z])|Sing|新加坡|狮城|沪新|京新|深新|杭新|广新)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇰🇷韩国节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇰🇷|(?<![A-Za-z])KR(?![A-Za-z])|Korea|(?<![A-Za-z])KOR(?![A-Za-z])|韩国|首尔|韩|韓|春川)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇺🇸美国节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇺🇸|(?<![A-Za-z])US(?![A-Za-z])|(?<![A-Za-z])USA(?![A-Za-z])|America|United States|美国|凤凰城|洛杉矶|西雅图|芝加哥|纽约|沪美|美)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇦🇺澳大利亚节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇦🇺|(?<![A-Za-z])AU(?![A-Za-z])|Australia|Sydney|澳大利亚|悉尼)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇬🇧英国节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇬🇧|(?<![A-Za-z])GB(?![A-Za-z])|(?<![A-Za-z])UK(?![A-Za-z])|United Kingdom|England|London|英国|伦敦|英格兰|伯明翰|泰恩河畔纽卡斯尔|利兹|爱丁堡|格拉斯哥|苏格兰)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇷🇺俄罗斯节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇷🇺|(?<![A-Za-z])RU(?![A-Za-z])|Russia|Moscow|俄罗斯|莫斯科|圣彼得堡|喀山|哈尔科夫|乌法|新西伯利亚|下诺夫哥罗德|沃罗涅什)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇩🇪德国节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇩🇪|(?<![A-Za-z])DEU(?![A-Za-z])|(?<![A-Za-z])DE(?![A-Za-z])|Germany|Berlin|德国|柏林|慕尼黑|汉堡|科隆)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇨🇦加拿大节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇨🇦|(?<![A-Za-z])CA(?![A-Za-z])|Canada|Toronto|Vancouver|加拿大|多伦多|温哥华)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇨🇭瑞士节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇨🇭|(?<![A-Za-z])CH(?![A-Za-z])|Switzerland|Zurich|瑞士|苏黎世)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇦🇪迪拜节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇦🇪|(?<![A-Za-z])AE(?![A-Za-z])|Dubai|(?<![A-Za-z])UAE(?![A-Za-z])|迪拜)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇮🇳印度节点",
  "type": "url-test",
  "include-all-providers": true, 
  "filter": "(?i)(🇮🇳|(?<![A-Za-z])IN(?![A-Za-z])|India|Mumbai|New Delhi|印度|孟买|新德里)",
  "hidden": true
},
{
  ...groupBaseOption,
  "name": "🇮🇹意大利节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇮🇹|(?<![A-Za-z])IT(?![A-Za-z])|ITA|Italy|Italian|Milano|Milan|Roma|Rome|意大利|米兰|罗马)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇹🇷土耳其节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇹🇷|(?<![A-Za-z])TR(?![A-Za-z])|Turkey|Türkiye|Istanbul|Ankara|土耳其)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇸🇪瑞典节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇸🇪|(?<![A-Za-z])SE(?![A-Za-z])|SWE|Sweden|Stockholm|瑞典)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇸🇨塞舌尔节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇸🇨|(?<![A-Za-z])SC(?![A-Za-z])|SYC|Seychelles|塞舌尔)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇳🇱荷兰节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇳🇱|(?<![A-Za-z])NL(?![A-Za-z])|NLD|Netherlands|Holland|Amsterdam|荷兰)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇲🇩摩尔多瓦节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇲🇩|(?<![A-Za-z])MD(?![A-Za-z])|MDA|Moldova|Chisinau|摩尔多瓦)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇮🇷伊朗节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇮🇷|(?<![A-Za-z])IR(?![A-Za-z])|IRN|Iran|Tehran|伊朗)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇮🇱以色列节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇮🇱|(?<![A-Za-z])IL(?![A-Za-z])|ISR|Israel|Tel Aviv|Jerusalem|以色列)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇮🇪爱尔兰节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇮🇪|(?<![A-Za-z])IE(?![A-Za-z])|IRL|Ireland|Dublin|爱尔兰)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇫🇮芬兰节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇫🇮|(?<![A-Za-z])FI(?![A-Za-z])|FIN|Finland|Helsinki|芬兰)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇪🇪爱沙尼亚节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇪🇪|(?<![A-Za-z])EE(?![A-Za-z])|EST|Estonia|Tallinn|爱沙尼亚)",
  "hidden": true
},
{
   ...groupBaseOption,
  "name": "🇧🇬保加利亚节点",
  "type": "url-test",
  "include-all-providers": true,
  "filter": "(?i)(🇧🇬|(?<![A-Za-z])BG(?![A-Za-z])|BGR|Bulgaria|Sofia|保加利亚)",
  "hidden": true
}
  ];
  // 提取所有已有地区组的 filter
  const existingRegionFilters = regionGroups
    .map(group => group.filter)
    .filter(Boolean)
    .map(filter => filter.replace(/^\(\?i\)/i, ""));

  // 构造兜底组的反向匹配规则，不匹配任何已有地区组的节点，才会进入其他国家节点组
  const otherRegionFilter =
    `(?i)^(?!.*(?:${existingRegionFilters.join("|")})).+$`;

  // 添加其他国家节点组
  regionGroups.push({
    ...groupBaseOption,
    name: "🌐其他国家节点",
    type: "url-test",
    "include-all-providers": true,
    filter: otherRegionFilter,
    hidden: true
  });

  // 提取所有地区组的名字
  const regionGroupNames = regionGroups.map(g => g.name);

  // 定义代理组
  const sourceGroups = [
    { ...groupBaseOption, "name": "机场A优先", "type": "url-test", "use": ["ikuuu1","ikuuu2","free-node"], "hidden":true },
    { ...groupBaseOption, "name": "低倍率优先", "type": "url-test", "use": ["赔钱机场"],  "hidden":true, "filter":"0\\.[0-9]+倍" },
    { ...groupBaseOption, "name": "普通高速", "type": "url-test", "use": ["赔钱机场"],  "hidden":true, "exclude-filter": "0\\.[0-9]+倍" }
  ];
  
//expected-delay: 500, 检查第1顺位（机场A优先）：延迟是200ms？ -> 很好，用它。延迟是 800ms？ -> 虽然它活着，但太慢了（>500ms），跳过！
//include-all-providers会包含allProviderKeys中没有但config中有的所有机场的节点，用include-all会导致与外面选择的基础订阅有重复
  const logicGroups = [
    { ...groupBaseOption, "name": "自定义", "type": "fallback", "proxies": ["机场A优先", "低倍率优先", "普通高速"], "expected-delay": 800, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/reddit.svg" },
    { ...groupBaseOption, "name": "自主选择", "type": "select", "include-all-providers": true, "expected-delay": 800, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/discord.svg" },
    { ...groupBaseOption, "name": "延迟选优", "type": "url-test", "include-all-providers": true, "hidden":true, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg" },
    { ...groupBaseOption, "name": "故障转移", "type": "fallback", "use": allProviderKeys, "hidden":true, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg" },
    { ...groupBaseOption, "name": "负载均衡(散列)", "type": "load-balance", "strategy": "consistent-hashing", "use": allProviderKeys, "hidden":true, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg" },
    { ...groupBaseOption, "name": "负载均衡(轮询)", "type": "load-balance", "strategy": "round-robin", "use": allProviderKeys, "hidden":true, "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg" }
  ];

  const logicGroupNames = logicGroups.map(g => g.name);

// 定义【节点选择】组
  const mainSelector = {
    ...groupBaseOption,
    "name": "节点选择",
    "type": "select", // 手动选择类型
    "proxies": [...logicGroupNames,"全局直连"], 
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
  };
// 定义 app 组
  const appGroups = [
    { ...groupBaseOption, "name": "谷歌服务", "type": "select", "proxies": ["节点选择", ...logicGroupNames, ...regionGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg" },
    { ...groupBaseOption, "name": "国外媒体", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg" },
    { ...groupBaseOption, "name": "电报消息", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg" },
    { ...groupBaseOption, "name": "ChatGPT", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg" },
    { ...groupBaseOption, "name": "Gemini", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini-color.svg", "url": "https://gemini.google.com/"},
    { ...groupBaseOption, "name": "Grok", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/grok.svg", "url": "https://grok.com/" },
    { ...groupBaseOption, "name": "Anthropic", "type": "select", "proxies": ["节点选择", ...logicGroupNames, "全局直连",...regionGroupNames], "icon": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/anthropic.png", "url": "https://cp.cloudflare.com/generate_204" },
    { ...groupBaseOption, "name": "微软服务", "type": "select", "proxies": ["全局直连", "节点选择", ...logicGroupNames, ...regionGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg" },
    { ...groupBaseOption, "name": "苹果服务", "type": "select", "proxies": ["全局直连", "节点选择", ...logicGroupNames, ...regionGroupNames], "icon": "https://app.unpkg.com/@lobehub/icons-static-svg@latest/files/icons/apple.svg" },
    { ...groupBaseOption, "name": "广告过滤", "type": "select", "proxies": ["REJECT", "DIRECT"], "icon": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Advertising.png" },
    { ...groupBaseOption, "name": "全局直连", "type": "select", "proxies": ["DIRECT"], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg" },
    { ...groupBaseOption, "name": "全局拦截", "type": "select", "proxies": ["REJECT", "DIRECT"], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg" },
    { ...groupBaseOption, "name": "漏网之鱼", "type": "select", "proxies": ["全局直连", "节点选择",  ...logicGroupNames], "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg" }
  ];

  config["proxy-groups"] = [mainSelector, ...sourceGroups, ...logicGroups, ...appGroups, ...regionGroups];

  // 返回修改后的配置
  return config;
}
