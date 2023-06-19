import { Component, Input } from '@angular/core';
import { extractClassInfoFromHtml } from '../htmlHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public textInput: string = '';
  public binaryOutput: string = '';
  public isConverting: boolean = false;

  convertToBinary() {
    this.isConverting = true;
    this.binaryOutput = '';
    this.binaryOutput = extractClassInfoFromHtml(this.textInput);
    console.log(this.binaryOutput);
    this.isConverting = false;
  }
}
