# GitHub Action for BuildBeaver: setup-bb

This GitHub Action provides the following functionality for BuildBeaver users:
- Downloading `bb` (the BuildBeaver CLI tool) and adding it to the Runner's path
- Executing `bb run` with arguments.

See [Using BuildBeaver with GitHub Actions](https://buildbeaver.github.io/docs/github-actions/github-actions-intro) for
usage instructions, and [action.yml](./action.yml) for the available inputs.

BuildBeaver **Tutorials** and **Guides** can be found on the [BuildBeaver Documentation](https://buildbeaver.github.io/) site.

## Basic Usage

The following workflow YAML will install the default version of BB CLI 
into your Runner's path and execute `bb run` to build your repo:

```yaml
name: BuildBeaver

on:
  push:
  workflow_dispatch:

jobs:
  build-acme:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    # Run BB CLI within your repository
    - name: Build using BB CLI
      uses: buildbeaver/setup-bb@main
```

---

## What is BuildBeaver?

The *BuildBeaver Team* are a group of DevOps and Build System enthusiasts who believe there is a better way to
define builds and CI/CD pipelines. Better than a complex spaghetti of YAML and scripts that only the Build Expert
on the team dares to touch.

Our aim is to help you *ship better software, faster* - see the [Dynamic Builds Guide](https://buildbeaver.github.io/docs/category/guide-to-dynamic-builds) for details.
