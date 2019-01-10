import { animate, state, style, transition, trigger, keyframes, query, stagger, AnimationBuilder, AnimationPlayer } from '@angular/animations';

const ANIMATION_BACKGROUND_WELCOME = 

trigger('fondoFirst', [
    state('inactive', style({
        position: 'absolute',     
        opacity: 0,
        display: 'none'
    })),
    state('active', style({
        position: 'absolute',    
        opacity: 1,
        display: 'block',
    })),
    state('void', style({
        opacity: 0,
        display: 'none'
    })),
    transition('inactive => active', animate('100ms')),
    transition('active => inactive', animate('50ms'))
]);

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
            position: 'absolute',
            right: '0',
            opacity: 0,
            display: 'none'
        })),
        state('active', style({
            opacity: 1,
            position: 'absolute',
            'z-index': 2,
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
    ANIMATION_BACKGROUND_WELCOME,
    ANIMATIONS_WELCOME1,
    ANIMATIONS_WELCOME2,
    AnimationPlayer,
    AnimationBuilder
}