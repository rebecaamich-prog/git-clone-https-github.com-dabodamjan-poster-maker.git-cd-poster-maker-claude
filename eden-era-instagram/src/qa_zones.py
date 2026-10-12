# Flag text in Instagram unsafe zones on text-and-motion Reel frames.
# Zones: bottom 380px (caption/buttons) and right 140px (action buttons), inside the 28px border.
import sys, glob, json, os
from PIL import Image
import numpy as np
root = os.path.join(os.path.dirname(__file__), '..')
ids = {r['id'] for r in json.load(open(os.path.join(root, 'copy', 'reels.json')))}
bad = 0
for f in sorted(glob.glob(os.path.join(root, '.build', 'qa', '*.png'))):
    rid = os.path.basename(f).split('.mp4')[0]
    if rid not in ids: continue
    a = np.asarray(Image.open(f).convert('L')).astype(int)
    bg = np.median(a[300:400, 100:200])
    def ink(y0, y1, x0, x1): return float((np.abs(a[y0:y1, x0:x1] - bg) > 40).mean())
    zones = {'bottom': ink(1545, 1880, 40, 1040), 'right': ink(250, 1540, 945, 1040)}
    hit = {k: v for k, v in zones.items() if v > 0.002}
    if hit: bad += 1; print('UNSAFE', os.path.basename(f), hit)
print('zone check:', 'FAIL' if bad else 'ok', f'({bad} frames with text in unsafe zones)')
