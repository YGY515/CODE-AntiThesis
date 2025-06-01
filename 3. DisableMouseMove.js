/*:
 * @plugindesc 
 * @target MZ
 * @help 마우스 클릭으로 플레이어가 이동하는 기능을 비활성화함.
 */

(() => {
    // 기존 함수 대체
    const _Game_Temp_setDestination = Game_Temp.prototype.setDestination;

    // setDestination 함수를 정의해서 마우스 이동 비활성화
    Game_Temp.prototype.setDestination = function(x, y) {
        // 아무 동작도 하지 않도록 함
    };
})();
