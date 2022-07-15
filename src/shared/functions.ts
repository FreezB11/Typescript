import logger from 'jet-logger';

export function pErr(err?: Error): void {
    if (!!err) {
        logger.err(err);
    }
};

export function getRandomInt(): number {
    return Math.floor(Math.random() * 1_000_000_000_000);
};
