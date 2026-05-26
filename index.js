const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token');
    const xsMax = parseInt(core.getInput('xs-max'));
    const sMax = parseInt(core.getInput('s-max'));
    const mMax = parseInt(core.getInput('m-max'));
    const lMax = parseInt(core.getInput('l-max'));
    const prefix = core.getInput('prefix');

    const octokit = github.getOctokit(token);
    const { pull_request } = github.context.payload;

    if (!pull_request) {
      core.setFailed('Not run on a pull request event');
      return;
    }

    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const prNumber = pull_request.number;

    // Get PR details
    const { data: pr } = await octokit.rest.pulls.get({
      owner, repo, pull_number: prNumber
    });

    const additions = pr.additions || 0;
    const deletions = pr.deletions || 0;
    const totalChanges = additions + deletions;

    // Determine size label
    let size;
    if (totalChanges <= xsMax) size = 'xs';
    else if (totalChanges <= sMax) size = 's';
    else if (totalChanges <= mMax) size = 'm';
    else if (totalChanges <= lMax) size = 'l';
    else size = 'xl';

    const labelName = prefix + size;

    // Get existing labels
    const { data: existingLabels } = await octokit.rest.issues.listLabelsOnIssue({
      owner, repo, issue_number: prNumber
    });

    // Remove old size labels
    const sizeLabelsToRemove = existingLabels
      .filter(l => (prefix ? l.name.startsWith(prefix) : /^(xs|s|m|l|xl)$/i.test(l.name)))
      .filter(l => l.name !== labelName);

    for (const label of sizeLabelsToRemove) {
      await octokit.rest.issues.removeLabel({
        owner, repo, issue_number: prNumber, name: label.name
      });
    }

    // Create label if needed
    try {
      await octokit.rest.issues.getLabel({ owner, repo, name: labelName });
    } catch {
      const colorMap = { xs: '0E8A16', s: '1D76DB', m: 'FBCA04', l: 'FFA500', xl: 'D93F0B' };
      await octokit.rest.issues.createLabel({
        owner, repo, name: labelName,
        color: colorMap[size] || 'C0C0C0',
        description: `PR size: ${size.toUpperCase()} (${totalChanges} lines changed)`
      });
    }

    // Add label
    await octokit.rest.issues.addLabels({
      owner, repo, issue_number: prNumber, labels: [labelName]
    });

    core.setOutput('label', labelName);
    core.setOutput('total_changes', String(totalChanges));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
