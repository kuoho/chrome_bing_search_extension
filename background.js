const bingUrl = "https://cn.bing.com/";

/**
 * 代开新标签页并跳转
 */
function openTab(url) {
    chrome.tabs.create({
        'url': url,
        'selected': true
    });
}

/**
 * 选中搜索
 * @param info
 * @param tab
 */
function bingSearch(info, tab) {
    let queryStr = encodeURIComponent(info.selectionText);
    let searchUrl = bingUrl + "search?q=" + queryStr;
    openTab(searchUrl);
}

/**
 * 搜索图片
 */
function bingSearchImg(info, tab) {
    let srcUrl = info.srcUrl;
    let formData = {
        "view": "detailv2",
        "iss": "sbi",
        "form": "SBIIRP",
        "rtpu": "https://www.bing.com/images/discover?FORM=ILPMFT",
        "sbisrc": "UrlPaste",
        "q": "imgurl:" + srcUrl,
        "selectedindex": "0",
        "id": srcUrl,
        "mediaurl": srcUrl,
        "exph": 0,
        "expw": 0,
        "vt": 0
    };
    openTab("https://www.bing.com/images/search?" + new URLSearchParams(formData).toString())
}

// 绑定点击toolBar 图标 跳转主页
chrome.browserAction.onClicked.addListener(function () {
    openTab(bingUrl)
});

// 安装时绑定右键菜单
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({"title": "Bing 首页", "id": "bingExtNewTab", "contexts": ['page']});
    chrome.contextMenus.create({"title": "使用 bingSearch 搜索“%s”", "id": "bingSearchTxt", "contexts": ["selection"]});
    chrome.contextMenus.create({"title": "通过 Bing 搜索此图片", "id": "bingSearchImg", "contexts": ["image"]});

});

// 增加监听事件
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    let menuItemId = info.menuItemId;
    if (menuItemId === "bingExtNewTab") {
        openTab(bingUrl)
    } else if (menuItemId === 'bingSearchTxt') {
        bingSearch(info, tab)
    } else if (menuItemId === 'bingSearchImg') {
        bingSearchImg(info, tab)
    }
});