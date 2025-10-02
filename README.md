# CODE: AntiThesis
### 출시가 목표인 1인 게임 개발 프로젝트
<div>
  <b>프로젝트 기간: 2024. 5~ 2024. 12</b>
  <br><br>
  <img width="60%" src="https://github.com/user-attachments/assets/30a07515-9a78-4565-8c65-37f2e954fc74">
  <br><br>
  <b><출시 링크><br></b>
  <b>스토브:</b> https://store.onstove.com/ko/games/4630 <br>
  <b>스팀:</b> https://store.steampowered.com/app/3473120/__Demo/ <br>

  <br>
  이 레포에는 개발에 사용한 플러그인 코드가 업로드 됩니다. (* 재배포를 금지하는 코드는 올려지지 않습니다)
  <br><br>
  * 여기서 <b>플러그인</b>이란?

  RPG Maker 엔진에서 사용자가 원하는 기능을 구현하기 위해 다른 사람들이 <b>만들어 놓은 코드 에셋</b>을 말합니다.<br> 게임 내에 import 하여 UI, 애니메이션, 편의성 등을 대폭 개선할 수 있습니다.
  <br><br><br>
</div>

---

### 트러블 슈팅
<b>1) 지도 오류</b>
<div>
  <img width="60%" src="https://github.com/user-attachments/assets/4a17b415-33ff-4ac8-8abf-480c10127f67"><br>
  빌드 후 게임 속 지도 기능을 사용하면 먹통이 되었던 적이 있습니다.<br>
  정확히는 인게임 내에서 테스트 할때가 아닌, <b>빌드 이후 테스트 진행 시</b> 발하였습니다.<br><br>

  이에 AI 도구와 함께 코드를 분석하고, 해당 코드가 생성되지 않은 객체에 접근하여 생긴 오류임을 알게 되었습니다.<br>
  지도 플러그인에는 <b>travelMaps</b>라는 객체와 그 하위에 <b>Maps</b>라는 객체가 있는데, 생성되기 전에 참고하여 생긴 것이었습니다.<br><br>

  <img width="60%" src="https://github.com/user-attachments/assets/9f3ab502-cee4-4a96-b50a-1d5d48a0708a"><br>
  따라서 지도 기능 사용 시 객체에 접근하기 전에 <b>초기화</b>하는 코드를 추가하였습니다.<br>
  (빨간 박스 내 코드는 원본 플러그인에 없습니다)<br><br>

  지도 기능이 게임 내에서 핵심적으로 사용되었기에, 오류를 고친 경험이 아직까지도 뜻깊게 남아 있습니다.
</div>
<br><br>


<b>2) 컷씬 내 그림자 오류</b>
<div>
  <img width="60%" src="https://github.com/user-attachments/assets/0d5f97a9-f180-4f5b-8e92-d7c07a8e67ac"><br>
   <b>같은 컷씬이라도 사용자와 제작자 화면에서 다르게 보이는 오류가 있었습니다.</b><br>
   당시 컷씬에서 잠시 플레이어의 그림자를 없앨 때는<br><br>
  
   const playerSprite = SceneManager._scene._spriteset._characterSprites?.find(sprite => sprite._character === $gamePlayer);<br>
   if (playerSprite) {<br>
    const shadowSprite = playerSprite._shadowSprite;<br>
    SceneManager._scene._spriteset._tilemap.removeChild(shadowSprite);<br>
    shadowSprite.destroy();<br>
    playerSprite._shadowSprite = null;<br>
  }

  <br>
  을 사용했고, 반대로 다시 생기게 하고 싶을 때는 <br><br>

  const playerSprite = SceneManager._scene._spriteset._characterSprites?.find(sprite => sprite._character === $gamePlayer);<br>
  if (playerSprite) {<br>
  SceneManager._scene._spriteset.createCharacterShadow(playerSprite);<br>
  }

  <br>
  이렇게 하였으나, 배포 후 사용자 컴퓨터 환경에 따라 정상적으로 작동하지 않는 것을 확인하였습니다.<br>

  <img width="60%" src="https://github.com/user-attachments/assets/b22b521d-97db-458c-93dd-42ac6186064f"><br>
  따라서 좀 더 직관적인 방법으로 투명한 그림자 파일을 하나 더 만들고,

  <br>
  const playerSprite = SceneManager._scene._spriteset._characterSprites?.find(sprite => sprite._character === $gamePlayer);<br>
  if (playerSprite && playerSprite._shadowSprite) {<br>
  playerSprite._shadowSprite.bitmap = ImageManager.loadSystem('<b>Shadow3</b>');<br>
  }

  <br><br>
  이런 방식으로 <b>그림자 파일을 교체</b>하도록 하여 사용자 기기 환경에 따라서도 변함이 없도록 하였습니다.<br>
  만약 다시 그림자가 생겨야 한다면 'Shadow1' 파일로 교체하도록 했습니다.<br>

  해당 컷씬이 스토리상 중요한 부분이었기에 사용자의 몰입감을 해치지 않도록 사소한 부분이라도 수정했습니다.<br>
</div>
<br>

---

### 패치 내역
<img width="70%" src="https://github.com/user-attachments/assets/29b2076f-536e-4cc6-afc1-f5745341392f"><br>
<b>2024년 12월 31일</b>에 스토브에 먼저 데모 출시를 진행하고 6차례의 업데이트를 진행했습니다.<br><br>
출시 이후 2025년 2월 경에 액션 타이밍이 빽빽해서 타이밍 맞추기가 어렵고, 반복된 게임 오버로 인해 피로도가 증가한다는 리뷰를 받은 적이 있었습니다.<br>
해당 리뷰: https://page.onstove.com/indie/global/view/10605730<br><br>

이 부분은 사용자가 인지하는 공격이 들어가는 범위보다 적이 공격을 가할 수 있는 범위가 더 컸기 때문으로 추정하고,<br>
판정 범위를 약간 완화하여 적의 공격 인식 범위를 줄이는 패치를 진행했습니다.<br><br>

<img width="70%" src="https://github.com/user-attachments/assets/a3d5cce6-0e91-4a2c-bade-5d2852401c94"><br>
이후 <b>2025년 4월 15일</b>에 스팀에 데모 출시를 진행하고, 3차례의 업데이트를 거쳤습니다.<br><br>

---

### 프로젝트를 돌아보며...
리뷰에서 체험판인데도 불구하고 4시간 이상의 분량을 제공한다는 점과 스토리 적으로 흥미를 돋우어 이어질 챕터가 기대된다는 평가를 받았습니다.<br>
사용자들에게 좋은 평가를 받은 부분은 추후 개발 시에도 적극적으로 반영할 것입니다.<br><br>
결과로 받은 피드백을 지속적으로 패치하는 과정을 겪으며, 결과 또한 과정의 일부가 될 수 있음을 깨달았습니다.<br>
무엇보다 출시까지 도와주신 분들을 엔딩 크레딧에 기재하며, 제작에 도움을 주신 분들에게 영원히 고마움을 표할 수 있음에 감사했습니다.<br><br>

또한 플랫폼 출시까지 있었던 일련의 시행착오를 블로그에 기록하며,<br>
추후 어느 1인 개발자가 저와 같은 불상스러운 일이 일어나지 않도록(?) 꿀팁을 작성했습니다.<br>
글 링크: https://sicarope-dev.tistory.com/79
