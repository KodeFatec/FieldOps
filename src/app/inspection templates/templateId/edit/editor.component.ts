import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../../../menu-base/menu-base.behavior';
import { initializeTemplateEditor } from './editor.behavior';

@Component({selector:'app-template-editor',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class TemplateEditorComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeTemplateEditor();
  }
}
