const os = require('os');
const path = require('path');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');
const core = require('@actions/core');

const osPlatform = os.platform();
const osArch = os.arch();
const platformMappings = {
  darwin: 'osx',
  win32: 'win',
  linux: 'linux'
};
const archMappings = {
  arm64: 'arm64',
  x64: 'x64'
};

function getBBFilenameAndPath(version) {
  const arch = archMappings[osArch] || osArch;
  const platform = platformMappings[osPlatform] || osPlatform;
  const extension = platform == 'win' ? '.zip' : '.tar.gz';

  return `bb_${version}_${platform}_${arch}${extension}`;
}

function getDownloadObject(version) {
  const filename = getBBFilenameAndPath(version);
  const url = `https://github.com/buildbeaver/bb-cli/releases/download/v${version}/${filename}`;

  return url;
}

async function runBBCommand(cliPath, cmd, args) {
  core.startGroup(`Running BB CLI command ${cmd} ${args}`);
  await exec.exec(`${cliPath} ${cmd} ${args}`, undefined, {});
  core.endGroup();
}

async function installBBCLI(version) {
  core.startGroup(`Downloading and installing bb CLI v${version}`);
  const url = getDownloadObject(version);

  core.info(`Downloading ${url}`);
  const downloadedPath = await tc.downloadTool(url);
  core.debug(`Downloaded to ${downloadedPath}`);

  // Extract the tarball/zipball onto host runner
  const extract = url.endsWith('.zip') ? tc.extractZip : tc.extractTar;
  const extractedPath = await extract(downloadedPath);
  core.debug(`Extracted to ${extractedPath}`);

  core.addPath(extractedPath);
  core.debug(`Added ${extractedPath} to PATH`);

  // Expose the tool by adding it to the PATH
  let executableName = 'bb';
  if (osPlatform === 'win32') {
    executableName += '.exe';
  }

  const absolutePath = path.join(extractedPath, executableName);

  core.debug(`Executable can be found at ${absolutePath}`);

  core.endGroup();
  return absolutePath;
}

module.exports = { installBBCLI, runBBCommand }