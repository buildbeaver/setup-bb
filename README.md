# setup-bb

This action provides the following for GitHub Actions users:
- Downloading requested BB CLI and adding it to the Runner's path
- Executing `bb run` with arguments.

## Usage

see [action.yml](./action.yml)

```yaml
- uses: buildbeaver/setup-bb@v1
  with:
    # The version of BB CLI to install
    # See https://github.com/buildbeaver/bb-cli/releases for available versions
    # Example: 1.0.0
    version: ''

    # Set this option to true if you only want to install BB CLI and have it available on the Runners path.
    # Default: false
    install-only: false

    # Specify any optional arguments you want to pass into bb run
    # Default: ''
    args: ''
```

### Basic:

```yaml
    steps:
    - uses: actions/checkout@v4

    # Running BB CLI within your repository
    - name: Build using BB CLI
      uses: buildbeaver/setup-bb@main
      with:
        version: '1.0.0'
        args: '-v'
```