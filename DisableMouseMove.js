/*:
 * @plugindesc 
 * @target MZ
 * @help 이 플러그인은 마우스 클릭으로 플레이어가 이동하는 기능을 비활성화합니다.
 */

(() => {
    // 기존 Game_Map.prototype.setupStartingMembers 함수를 백업
    const _Game_Temp_setDestination = Game_Temp.prototype.setDestination;

    // 새로운 setDestination 함수를 정의하여 마우스 이동을 비활성화
    Game_Temp.prototype.setDestination = function(x, y) {
        // 아무 동작도 하지 않도록 함으로써 마우스 이동을 비활성화
    };
})();