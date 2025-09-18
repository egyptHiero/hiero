import { PassThrough, Readable } from 'node:stream';
import { combFile } from '../loader';

const readData = vi.fn<() => string[]>();
const writeData: string[] = [];

vi.mock('node:fs', async () => {
  const actualFs = await vi.importActual<typeof import('node:fs')>('node:fs');

  return {
    ...actualFs,
    createReadStream: vi.fn(() => {
      return new Readable({
        read() {
          readData().forEach((line) => this.push(`${line}\n`));
          this.push(null);
        },
      });
    }),
    createWriteStream: vi.fn(() => {
      return new PassThrough({
        write(chunk, _encoding, callback) {
          writeData.push(chunk.toString().replace(/\n/, ''));
          callback();
        },
      });
    }),
  };
});

describe('combFile', () => {
  beforeEach(() => {
    writeData.length = 0;
  });

  it('should sort lines in file', async () => {
    readData.mockReturnValue([
      '{"name":"hieroglyphs-description", "type": "hieroglyphs", "language":"en" }',
      '["A39","man on two giraffes"]',
      '["A37","man in vessel"]',
    ]);

    await combFile('test');

    expect(writeData).toStrictEqual([
      '{"name":"hieroglyphs-description","type":"hieroglyphs","language":"en"}',
      '["A37","man in vessel"]',
      '["A39","man on two giraffes"]',
    ]);
  });

  it('should append values for the same keys', async () => {
    readData.mockReturnValue([
      '{"name":"hieroglyphs-description", "type": "hieroglyphs", "language":"en" }',
      '["A37","man in vessel"]',
      '["A39","man on two giraffes"]',
      '["A37","two men in vessel"]',
    ]);

    await combFile('test');

    expect(writeData).toStrictEqual([
      '{"name":"hieroglyphs-description","type":"hieroglyphs","language":"en"}',
      '["A37","man in vessel","two men in vessel"]',
      '["A39","man on two giraffes"]',
    ]);
  });

  it('should remove duplicates', async () => {
    readData.mockReturnValue([
      '{"name":"hieroglyphs-description", "type": "hieroglyphs", "language":"en" }',
      '["A37","man in vessel"]',
      '["A39","man on two giraffes"]',
      '["A37","two men in vessel"]',
      '["A37","man in vessel"]',
      '["A39","man on two giraffes"]',
      '["A37","two men in vessel"]',
      '["A37","man in vessel"]',
      '["A39","man on two giraffes"]',
      '["A37","two men in vessel"]',
    ]);

    await combFile('test');

    expect(writeData).toStrictEqual([
      '{"name":"hieroglyphs-description","type":"hieroglyphs","language":"en"}',
      '["A37","man in vessel","two men in vessel"]',
      '["A39","man on two giraffes"]',
    ]);
  });
});
