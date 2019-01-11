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
            opacity: 0.8,
            display: 'block',
        })),
        state('void', style({
            opacity: 0,
            display: 'none'
        })),
        transition('inactive => active', animate('100ms')),
        transition('active => inactive', animate('50ms'))
    ]);

const ANIMATION_BACKGROUND_APP =

    trigger('fondoSecond', [
        state('inactive', style({
            position: 'absolute',
            opacity: 0,
            display: 'none'
        })),
        state('active', style({
            position: 'absolute',
            opacity: 0.8,
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

const ANIMATIONS_BOTELLIN =
    trigger('botellin', [
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

const ANIMATION_COLABORADOR =
    trigger('colaborador', [
        state('inactive', style({
            position: 'absolute',
            right: '5%',
            top: '40%',
            opacity: 0,
            display: 'none'
        })),
        state('active', style({
            opacity: 1,
            position: 'absolute',
            'z-index': 2,
            top: '30%',
            right: '5%',
            display: 'block',
        })),
        state('void', style({
            opacity: 0,
            display: 'none'
        })),
        transition('inactive => active', animate('1400ms')),
        transition('active => inactive', animate('1000ms'))
    ]);

const ANIMATION_CAROUSEL =
    trigger('carousel', [
        state('inactive', style({
            opacity: 0,
            position: 'absolute',
            top: '70%',
            left: '7%'
        })),
        state('active', style({
            opacity: 1,
            position: 'absolute',
            top: '30%',
            left: '7%'
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
    ANIMATION_BACKGROUND_APP,
    ANIMATIONS_WELCOME1,
    ANIMATIONS_BOTELLIN,
    ANIMATION_COLABORADOR,
    ANIMATION_CAROUSEL,
    AnimationPlayer,
    AnimationBuilder
}