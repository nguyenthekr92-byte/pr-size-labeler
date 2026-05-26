# PR Size Labeler

Automatically label pull requests based on lines changed. Perfect for projects using size-based bounties, priority systems, or review workflows.

## Usage

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

## Configuration

```yaml
- uses: nguyenthekr92-byte/pr-size-labeler@v1
  with:
    # Label prefix (e.g. "size/" creates "size/xs", "size/s" ...)
    prefix: 'size/'

    # Line count thresholds
    xs-max: 10    # 0-10 → XS
    s-max: 50     # 11-50 → S  
    m-max: 200    # 51-200 → M
    l-max: 500    # 201-500 → L
                  # 501+ → XL
```

## License

MIT
