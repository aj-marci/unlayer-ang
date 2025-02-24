import { Component, ViewChild } from '@angular/core';
import { EmailEditorComponent, EmailEditorModule } from 'angular-email-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmailEditorModule],
})
export class AppComponent {
  title = 'angular-email-editor';
  projectId = 239206;
  editorOptions = {
    displayMode: 'email',
    mergeTags: {
      appearance: {
        theme: "modern_dark",
      },
    },
    // Add more options as needed
  };

  @ViewChild(EmailEditorComponent)
  private emailEditor!: EmailEditorComponent;

  private get unlayer() {
    return this.emailEditor.editor;
  }

  // called when the editor is created
  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    // you can get the design json by calling unlayer.exportHtml (see below)
    // this.unlayer.loadDesign({ /* json object here */ });
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');
  }

  exportHtml() {
    this.unlayer.exportHtml((result) => {
      // result object format: { html: string, design: object, amp: object, chunks: object }
      console.log('exportHtml', result);
    });
  }
}