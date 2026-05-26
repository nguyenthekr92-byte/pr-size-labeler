# PR Size Labeler

⚡ Automatically label pull requests based on lines changed — **XS / S / M / L / XL**

[![GitHub release](https://img.shields.io/github/v/release/nguyenthekr92-byte/pr-size-labeler)](https://github.com/nguyenthekr92-byte/pr-size-labeler/releases)
[![Marketplace](https://img.shields.io/badge/GitHub-Marketplace-brightgreen)](https://github.com/marketplace/actions/pr-size-labeler)

---

## ✨ Features

- **Zero config** — drop it in any workflow, works out of the box
- **Customisable** — adjust thresholds and label prefix to fit your project
- **Lightweight** — runs in <2 seconds, pure Node.js, no external deps
- **Open Source** — MIT license

## 📋 Label Breakdown

| Label | Lines Changed |
|-------|--------------|
| `XS`  | 0 – 10       |
| `S`   | 11 – 50      |
| `M`   | 51 – 200     |
| `L`   | 201 – 500    |
| `XL`  | 501+         |

## 🚀 Usage

```yaml
name: PR Size Label
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: nguyenthekr92-byte/pr-size-labeler@v1
```

## ⚙️ Configuration

```yaml
- uses: nguyenthekr92-byte/pr-size-labeler@v1
  with:
    # Label prefix (e.g. "size/" creates "size/xs", "size/s" ...)
    prefix: 'size/'

    # Line count thresholds (customise as needed)
    xs-max: 10    # 0-10 → XS
    s-max: 50     # 11-50 → S  
    m-max: 200    # 51-200 → M
    l-max: 500    # 201-500 → L
                  # 501+ → XL
```

## 📦 Output Labels

When `prefix` is empty (default), labels are: `XS`, `S`, `M`, `L`, `XL`.  
With `prefix: 'size/'`, labels become: `size/xs`, `size/s`, `size/m`, `size/l`, `size/xl`.

## 📄 License

MIT — use it anywhere, fork it, ship it.
