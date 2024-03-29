import logger, { logFile } from '@/logger';
import { procedure, router } from '@/tools/trpc';
import { pluginInstaller } from '@/utils';
import axios from 'axios';
import { exec } from 'child_process';
import { compareVersions } from 'compare-versions';
import path from 'path';
import { promisify } from 'util';
import { z } from 'zod';

const asyncExec = promisify(exec);

const changelogUrl = 'https://mirror.ghproxy.com/https://raw.githubusercontent.com/aijun-li/mockya/main/CHANGELOG.md';

async function getLatestVersionUrl() {
  const { stdout } = await asyncExec('npm config get registry');
  const registry = stdout.trim();
  logger.debug(`Registry: ${registry}`);

  const prefix = registry.endsWith('/') ? registry : `${registry}/`;
  return `${prefix}whistle.mockya/latest`;
}

async function getVersionInfo(mockVersion?: string) {
  const latestVersionUrl = await getLatestVersionUrl();

  const {
    data: { version: latestVersion },
  }: { data: { version: string } } = await axios.get(latestVersionUrl);

  const currentVersion = mockVersion ?? (require('../../../../package.json').version as string);

  const canUpdate = compareVersions(latestVersion, currentVersion) === 1;

  return {
    currentVersion,
    latestVersion,
    canUpdate,
  };
}

export default router({
  checkForUpdates: procedure
    .input(
      z
        .object({
          currentVersion: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const { currentVersion, latestVersion, canUpdate } = await getVersionInfo(input?.currentVersion);

      if (!canUpdate) {
        return {
          hasUpdates: false,
          changelog: {
            currentVersion,
            latestVersion,
            features: [],
            fixes: [],
          },
        };
      }

      const { data: rawChangelog }: { data: string } = await axios.get(changelogUrl);

      const features: string[] = [];
      const fixes: string[] = [];

      const findState = {
        active: false,
        inFeatureBlock: false,
        inFixBlock: false,
      };

      const entryRegex = /^-(.*)\(\[\w+\]\(.*\)\)$/;

      const valid = rawChangelog
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .some((line) => {
          if (line.startsWith('#') && line.includes(`[${latestVersion}]`)) {
            findState.active = true;
            return false;
          } else if (!findState.active) {
            return false;
          } else if (line.startsWith('#') && line.includes(`[${currentVersion}]`)) {
            return true;
          } else if (line.startsWith('#') && line.includes('Bug Fixes')) {
            findState.inFeatureBlock = false;
            findState.inFixBlock = true;
          } else if (line.startsWith('#') && line.includes('Features')) {
            findState.inFeatureBlock = true;
            findState.inFixBlock = false;
          } else {
            const match = line.match(entryRegex);
            if (!match) {
              return false;
            }
            const entry = match[1].trim();
            if (!entry) {
              return false;
            }
            if (findState.inFeatureBlock) {
              features.push(entry);
            } else if (findState.inFixBlock) {
              fixes.push(entry);
            }
          }
        });

      return {
        hasUpdates: true,
        changelog: {
          currentVersion,
          latestVersion,
          features: valid ? [...new Set(features)] : [],
          fixes: valid ? [...new Set(fixes)] : [],
        },
      };
    }),

  updateVersion: procedure.mutation(async () => {
    const { currentVersion, latestVersion, canUpdate } = await getVersionInfo();

    logger.debug(`Install Directory: ${path.resolve(__dirname, '../../../..')}`);
    logger.debug(`Plugin Installer: ${pluginInstaller}`);

    if (!canUpdate) {
      return false;
    }

    const command =
      pluginInstaller === 'whistle' ? 'w2 install whistle.mockya' : `${pluginInstaller} i -g whistle.mockya`;
    logger.debug(`Install Command: ${command}`);

    const { stdout } = await asyncExec(command);
    logger.debug(`Install Stdout: ${stdout}`);

    return true;
  }),

  getLogFileUrl: procedure.query(() => {
    if (process.env.WSL_DISTRO_NAME) {
      return `file://wsl$/${process.env.WSL_DISTRO_NAME}${logFile}`;
    } else {
      return `file://${logFile}`;
    }
  }),
});
