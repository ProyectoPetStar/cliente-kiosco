import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'textEllipsis' })
export class TextEllipsisPipeClass implements PipeTransform {
    transform(texto: string, longitud: number): string {
        let formato_texto = texto.toUpperCase();
        if (formato_texto.length > longitud) {
            return formato_texto.substring(0, longitud) + "...";
        } else {
            return formato_texto;
        }

    }
}