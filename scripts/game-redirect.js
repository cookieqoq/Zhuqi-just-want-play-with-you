// 載入遊戲網址配置並處理重定向
(function() {
    // 取得所有指向 game.html 的連結
    function initGameLinks() {
        // 從配置文件載入遊戲網址
        fetch('config/game-url.json')
            .then(response => response.json())
            .then(config => {
                if (config.enabled && config.gameUrl) {
                    // 更新所有指向 game.html 的連結
                    const gameLinks = document.querySelectorAll('a[href*="game.html"]');
                    gameLinks.forEach(link => {
                        link.href = config.gameUrl;
                        // 添加外部連結屬性
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                    });
                    console.log(`✅ 已將 ${gameLinks.length} 個遊戲連結更新為: ${config.gameUrl}`);
                }
            })
            .catch(error => {
                console.warn('⚠️ 無法載入遊戲網址配置，使用預設連結', error);
            });
    }

    // 當 DOM 載入完成後執行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGameLinks);
    } else {
        initGameLinks();
    }
})();