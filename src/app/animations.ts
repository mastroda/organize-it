import {
    trigger,
    style,
    animate,
    transition,
} from '@angular/animations';

const animationTimeout = .4;

const animationDelay = 1000;

export const fadeAnimation = [
    trigger(
        'fadeAnimation',
        [
            transition(
                ':enter',
                [
                    style({ opacity: 0 }),
                    animate(animationTimeout + 's ease-out', style({ opacity: 1 })),
                ]
            ),
            transition(
                ':leave',
                [
                    style({ opacity: 1 }),
                    animate(0 + 's ease-out', style({ opacity: 0 }))
                ]
            )
        ]
    )
];


