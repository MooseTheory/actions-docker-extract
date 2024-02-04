const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const shell = core.getInput('shell_command') || "/bin/bash -c";
    console.log(shell);
    console.log(core.getInput('shell_command'));
    const image = core.getInput('image');
    const path = core.getInput('path');
    const destination = core.getInput('destination') || `.extracted-${Date.now()}`;

    const create = `docker cp $(docker create ${image}):/${path} ${destination}`;

    await exec.exec(`mkdir -p ${destination}`);
    await exec.exec(`${shell} "${create}"`, []);

    core.setOutput('destination', destination);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
