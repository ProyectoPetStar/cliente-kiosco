import { animate, state, style, transition, trigger, keyframes, query, stagger, AnimationBuilder, AnimationPlayer } from '@angular/animations';

const ANIMATIONS_WELCOME1 =
    trigger('welcome1', [
        state('inactive', style({
            transform: 'scale(.1)',
            opacity: 0,
            display: 'none'
        })),
        state('active', style({
            transform: 'scale(1)',
            opacity: 1,
            display: 'block',
        })),
        state('void', style({
            opacity: 0,
            display: 'none'
        })),
        transition('inactive => active', animate('1600ms')),
        transition('active => inactive', animate('1000ms'))
    ]);

const ANIMATIONS_WELCOME2 =
    trigger('welcome2', [
        state('inactive', style({
            opacity: 0,
            display: 'none'
        })),
        state('active', style({
            opacity: 1,
            right: '3%',
            display: 'block',
        })),
        state('void', style({
            opacity: 0,
            display: 'none'
        })),
        transition('inactive => active', animate('1400ms')),
        transition('active => inactive', animate('1000ms'))
    ]);


export {
    ANIMATIONS_WELCOME1,
    ANIMATIONS_WELCOME2,
    AnimationPlayer,
    AnimationBuilder
}