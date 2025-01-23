if (Utils.isNwjs()) {
    const win = nw.Window.get();

    // 처음 게임이 시작될 때 창 크기 조정 불가 설정
    win.setResizable(false);

    SceneManager._screenWidth = 1280;
    SceneManager._screenHeight = 720;
    SceneManager._boxWidth = 1280;
    SceneManager._boxHeight = 720;

    // F4 키로 전체화면 전환 설정
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F4') {
            if (!win.isFullscreen) {
                win.enterFullscreen();
            } else {
                win.leaveFullscreen();
                win.resizeTo(1280, 720);
            }
        }
    });

    // 전체화면일 때 창 크기 조정 허용
    win.on('enter-fullscreen', function() {
        win.setResizable(true);
    });

    // 전체화면 종료 시 창 크기 조정 불가
    win.on('leave-fullscreen', function() {
        win.setResizable(false);
        // 전체화면을 나왔을 때 창 크기를 초기 크기로 설정 (예: 1280x720)
        win.resizeTo(1280, 720);
    });

    // 창 크기를 수동으로 변경할 수 없도록 무시 처리
    win.on('resize', function() {
        if (!win.isFullscreen) {
            win.setResizable(false);
            win.resizeTo(1280, 720); // 창모드에서 크기가 조정되지 않도록 고정
        }
    });
}