"""
Generate solid-color PNG icons for LanceEdit Chrome extension.
Uses only Python stdlib (zlib + struct) — no Pillow required.
"""
import os
import struct
import zlib


def make_png(size, r, g, b):
    """Create a minimal valid PNG of `size x size` filled with RGB color."""

    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        crc = zlib.crc32(name + data) & 0xFFFFFFFF
        return c + struct.pack('>I', crc)

    # PNG signature
    sig = b'\x89PNG\r\n\x1a\n'

    # IHDR: width, height, bit depth, color type (2=RGB), compression, filter, interlace
    ihdr_data = struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)
    ihdr = chunk(b'IHDR', ihdr_data)

    # IDAT: raw pixel data (filter byte 0 per row)
    row = b'\x00' + bytes([r, g, b] * size)
    raw = row * size
    idat = chunk(b'IDAT', zlib.compress(raw))

    # IEND
    iend = chunk(b'IEND', b'')

    return sig + ihdr + idat + iend


def main():
    icons_dir = os.path.join(os.path.dirname(__file__), 'icons')
    os.makedirs(icons_dir, exist_ok=True)

    # Lance red
    r, g, b = 0xe8, 0x19, 0x2c

    for size in (16, 48, 128):
        path = os.path.join(icons_dir, f'icon{size}.png')
        with open(path, 'wb') as f:
            f.write(make_png(size, r, g, b))
        print(f'Created {path}')


if __name__ == '__main__':
    main()
