import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEllipsisPipeClass } from './format.text.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TextEllipsisPipeClass
    ],
    exports: [
        TextEllipsisPipeClass

    ]
})
export class PipesCustomModule { }