import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeMenuBase } from '../../../menu-base/menu-base.behavior';
import { initializeTemplateEditor } from './editor.behavior';

@Component({selector:'app-template-editor',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class TemplateEditorComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeTemplateEditor(url => void this.router.navigateByUrl(url));
  }
}
