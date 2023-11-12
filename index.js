const core = require('@actions/core');
const { installBBCLI, runBBCommand } = require('./lib/utils');

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const bbCLI = await installBBCLI(version);

    // If install-only is provided then we are finished here
    const installOnly = core.getBooleanInput('install-only');
    if (installOnly) {
      return;
    }

    const workDir = core.getInput('work-dir');
    if (workDir && workDir !== '.') {
      core.debug(`Using ${workDir} as working directory`);
      process.chdir(workDir);
    }

    const args = core.getInput('args');
    await runBBCommand(bbCLI, 'run', args);
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}