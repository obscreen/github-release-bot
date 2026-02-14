import 'universal-dotenv/register';
import getLatestRelease from './getLatestRelease';
import { store, compare } from './versionCache';
import createEmbedMessage from './createEmbedMessage';
import postToDiscord from './postToDiscord';

const {
  RUN_INTERVAL_MS
} = process.env;

(async () =>  {
  console.log('Bot started');

  const { version: initialVersion } = await getLatestRelease();

  console.log(`Latest version: ${initialVersion}`);
  store(initialVersion);

  console.log(`Polling every ${RUN_INTERVAL_MS}ms`);
  setInterval(async () => {
    try {
      const {
        version,
        ...rest
      } = await getLatestRelease();

      const isDiff = !compare(version);

      if (isDiff) {
        console.log(`New release detected: ${version}`);
        store(version);
        postToDiscord(
          createEmbedMessage({ version, ...rest })
        );
      }
    } catch (ex) {
      console.error('Something went wrong', ex);
    }
  }, RUN_INTERVAL_MS);
})();
