import {Transform} from 'stream';

/**
 * Sort, remove duplicates and combine values for equal keys.
 */
export class CombTransformer extends Transform {
    private lines = [];

    constructor() {
        super({objectMode: true});
    }

    _transform(chunk, encoding, callback) {
        this.lines.push(chunk);
        callback();
    }

    _flush(callback) {
        this.lines.sort((a, b) => (Array.isArray(a) && Array.isArray(b)) ? a[0].localeCompare(b[0]) : true)
            .reduce((acc, value) => {
                const previous = acc[acc.length - 1];
                if (JSON.stringify(previous) !== JSON.stringify(value)) {
                    if (Array.isArray(value) && Array.isArray(previous)) {
                        const [key, ...values] = value;
                        const [previousKey] = previous;

                        if (key === previousKey) {
                            previous.push(...values);
                            return acc;
                        }
                    }
                    acc.push(value);
                }
                return acc;
            }, [])
            .forEach(line => this.push(line));
        callback();
    }
}
