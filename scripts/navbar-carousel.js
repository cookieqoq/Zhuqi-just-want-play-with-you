// 導覽列背景圖片輪播功能
// 使用方式：確保頁面中有 class="navbar-image-container" 的元素

(function () {
    // 導覽列背景圖片陣列
    const navbarImages = [
        'index_img/index_bg1.jpg',
        'index_img/index_bg2.jpg',
        'index_img/index_bg3.jpg'
    ];

    let currentNavbarImage = 0;
    let navbarContainer = null;
    let carouselInterval = null;

    // 初始化導覽列輪播
    function initNavbarCarousel() {
        navbarContainer = document.querySelector('.navbar-image-container');

        if (!navbarContainer) {
            console.warn('⚠️ 找不到導覽列容器 (.navbar-image-container)');
            return;
        }

        // 設定初始背景圖片
        if (navbarImages.length > 0) {
            navbarContainer.style.backgroundImage = `url('${navbarImages[0]}')`;
        }

        // 啟動自動輪播
        startCarousel();

        console.log(`✅ 導覽列輪播已啟動，共 ${navbarImages.length} 張圖片`);
    }

    // 切換到下一張圖片
    function nextImage() {
        if (navbarImages.length === 0 || !navbarContainer) return;

        currentNavbarImage = (currentNavbarImage + 1) % navbarImages.length;
        navbarContainer.style.backgroundImage = `url('${navbarImages[currentNavbarImage]}')`;
    }

    // 啟動輪播
    function startCarousel(interval = 10000) {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }

        if (navbarImages.length > 1) {
            carouselInterval = setInterval(nextImage, interval);
        }
    }

    // 停止輪播
    function stopCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    // 跳轉到指定圖片
    function goToImage(index) {
        if (index >= 0 && index < navbarImages.length && navbarContainer) {
            currentNavbarImage = index;
            navbarContainer.style.backgroundImage = `url('${navbarImages[currentNavbarImage]}')`;
        }
    }

    // 頁面載入完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbarCarousel);
    } else {
        initNavbarCarousel();
    }

    // 將功能匯出到全域（如需手動控制）
    window.navbarCarousel = {
        start: startCarousel,
        stop: stopCarousel,
        next: nextImage,
        goTo: goToImage,
        getImages: () => [...navbarImages],
        getCurrentIndex: () => currentNavbarImage
    };
})();