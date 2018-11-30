import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEllipsisPipeClass } from './format.text.pipe';
import { Safepipe } from './safepipe.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TextEllipsisPipeClass,
        Safepipe
    ],
    exports: [
        TextEllipsisPipeClass,
        Safepipe

    ]
})
export class PipesCustomModule { }