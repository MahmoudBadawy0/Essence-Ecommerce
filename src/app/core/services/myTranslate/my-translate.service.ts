import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer: Renderer2;

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private id: object,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.id)) {
      //default lan
      this.translateService.setDefaultLang('en');

      //get lang from local
      localStorage.getItem('lang')
        ? this.translateService.use(localStorage.getItem('lang')!)
        : this.translateService.use('en');
      
      // const savedLang = localStorage.getItem('lang');

      //use lang in local
      // if (savedLang) {
      //   this.translateService.use(savedLang!);
      // }

      this.changeDir();
    }
  }

  changeDir() {
    if (localStorage.getItem('lang') === 'en') {
      //ltr
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      //rtl
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLangAndDir(lang: string): void {
    //local storage
    localStorage.setItem('lang', lang);
    //use it
    this.translateService.use(lang);
    //change dir
    this.changeDir();
  }
}
