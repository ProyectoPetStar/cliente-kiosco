import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textEllipsis' })
export class TextEllipsisPipeClass implements PipeTransform {
    transform(texto: string, logitud: number): string {
        let formato_texto = texto.toUpperCase();
        return formato_texto.substring(0,logitud) + "...";
    }
}