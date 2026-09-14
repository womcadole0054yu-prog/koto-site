//=============================================================================
// KotoMenu.js — 『ことの家』用のメニュー簡略化（2026-09-14）
// RPG向けの表示（職業・レベル・HP/MP・所持金・武器/防具タブ）を消し、顔と名前だけにする。
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 探索ホラー用にメニューを簡略化（職業/Lv/HP/MP/所持金を非表示）
 * @author エミリア
 */
(() => {
    // ステータス欄: 顔と名前だけ
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        const x = rect.x + ImageManager.faceWidth + 24;
        const y = rect.y + 12;
        this.drawActorName(actor, x, y, 168);
    };
    // 所持金の窓は作らない（コマンド窓の高さはその分だけ伸ばす）
    Scene_Menu.prototype.createGoldWindow = function() {};
    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    // アイテム画面: 「大事なもの」だけ（System の itemCategories で武器/防具は消しているが、念のため1列に）
    Window_ItemCategory.prototype.maxCols = function() {
        return this._list ? Math.max(1, this._list.length) : 4;   // 初期化中は _list が無い
    };
    // セーブ画面のキャラ表示はそのまま。HP/MP は戦闘が無いので触らない
})();
