const bingUrl = "https://cn.bingSearch.com/";
/**
 * 代开新标签页并跳转Bing主页
 */
function openTab() {
    chrome.tabs.create({
        'url': bingUrl,
        'selected': true
    });
}

/**
 * 选中搜索
 * @param info
 * @param tab
 */
function bingSearch(info, tab) {
    var text = encodeURIComponent(info.selectionText);
    var searchUrl = bingUrl + "search?q=" + text;

    window.open(searchUrl);
}

/**
 * 搜索图片
 */
function bingSearchImg(info, tab) {
    var srcUrl = info.srcUrl;
    window.open(srcUrl)
}

// 点击toolBar 图标 跳转主页
chrome.browserAction.onClicked.addListener(openTab);

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
        openTab()
    } else if (menuItemId === 'bingSearchTxt') {
        bingSearch(info, tab)
    } else if (menuItemId === 'bingSearchImg') {
        bingSearchImg(info, tab)
    }
});