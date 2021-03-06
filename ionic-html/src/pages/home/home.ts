import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content, MenuController } from 'ionic-angular';
import { Logger } from 'angular2-logger/core';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  ImageHeight: Number;
  Counter: number = 0; // 表示回数
  
  constructor(public navCtrl: NavController
    , public _logger: Logger
    , public menuCtrl: MenuController
    , public ngZone: NgZone) {
    // ウィンドウサイズの追従イベント
    // ベースクラスを作成し、全体で共有したほうが良いかも。
    window.onresize = (e) => {
      //ngZone.run will help to run change detection
      this.ngZone.run(() => {
        this.fitImageContainer();
      });
    };
  }

  /**
   * コンポーネントの初期化イベント
   */
  ionViewDidEnter() {
    this.fitImageContainer();

    this.Counter = this.Counter + 1;

    this._logger.info("Counter = " + this.Counter);

    // コンポーネント表示と同時に表示したいメニュー
    this.menuCtrl.enable(true, "menu_1");
    this.menuCtrl.enable(false, "menu_1b");
  }

  fitImageContainer(): void {
    let dimention = this.content.getContentDimensions();
    this._logger.info("コンテントのDimention", dimention);
    this.ImageHeight = dimention.contentHeight - dimention.contentTop + 56; // 56は、ヘッダー領域の高さ（環境依存）
  }

  /**
 * 左メニュー(ID:menu_1)の可視状態を切り替える
 */
  toggleMenuLeft(): void {
    // 下記のように2つのMenu定義を切り替えることで、メニュー表示内容を変更できる。
    if (this.menuCtrl.isEnabled("menu_1")) {
      this.menuCtrl.enable(false, "menu_1");
      this.menuCtrl.enable(true, "menu_1b");
    } else {
      this.menuCtrl.enable(true, "menu_1");
      this.menuCtrl.enable(false, "menu_1b");
    }
  }

  /**
   * メイン部にメニュー画面を表示する
   */
  showMenu(): void {
    this.navCtrl.push(MenuPage);
  }
}
