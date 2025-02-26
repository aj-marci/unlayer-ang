import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EmailEditorComponent, EmailEditorModule } from 'angular-email-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmailEditorModule],
})
export class AppComponent implements AfterViewInit {
  title = 'angular-email-editor';
  projectId = 1234; // replace with your projectId
  editorOptions: EmailEditorComponent['options'] = {
    displayMode: "email",
    appearance: {
      theme: "modern_dark",
    },
  };

  @ViewChild(EmailEditorComponent, { static: false })
  private emailEditor!: EmailEditorComponent;

  private get unlayer() {
    return this.emailEditor?.editor;
  }

  ngAfterViewInit() {
    if (this.unlayer) {
      // Ensure the editor is fully loaded before setting up the validator
      this.unlayer.addEventListener('editor:ready', () => this.editorReady());
    }
  }

  // called when the editor has finished loading
  editorReady() {
    console.log('editorReady');

    if (this.unlayer) {

      this.unlayer.setToolValidator('text', async (data: any) => {
        const { defaultErrors, values } = data;
      
        if (values.text.length > 400) {
          return Promise.resolve([
            {
              id: 'CHAR_COUNT_ERROR',
              icon: 'fa-exclamation-triangle',
              severity: 'ERROR',
              title: 'Character Count Exceeded',
              description: `A text block exceeds 400 characters. Current length: ${values.text.length}. Please break up into separate text blocks.`,
              dismissable: true // true/false boolean
            },
            ...defaultErrors,
          ]);
        }
      
        return Promise.resolve(defaultErrors);
      });
    }
  }

  // called when the editor is created
  editorLoaded() {
    console.log('editorLoaded');
    // load the design json here
    // you can get the design json by calling unlayer.exportHtml (see below)
    // this.unlayer.loadDesign({ /* json object here */ });
  }

  exportHtml() {
    this.unlayer?.exportHtml((result: any) => {
      // result object format: { html: string, design: object, amp: object, chunks: object }
      console.log('exportHtml', result);
    });
  }
}
