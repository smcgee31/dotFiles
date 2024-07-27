#!/usr/bin/env node

/**
 * This file uses 'ag' to search and will take in two or more strings
 * to search for in your repo. When files that contain these strings
 * are found it will then reduce the list to the intersecting files and
 * return the list in the console.
 *
 * example:
 * ./searchForStrings.js string_one string_two string_three
 *
 * You may need to give this file permissions to be run as called
 * above: `chmod u+x searchForStrings.js`
 * else you will have to call it like: `node searchForStrings.js` and
 * calling it like that assumes you have node installed globally.
 *
 * As noted above, this file requires you to have 'ag' (the_silver_searcher)
 * installed, and well, you should... because it's awesome. On a mac you can
 * install it with `brew install the_silver_searcher` as seen in their
 * github readme: https://github.com/ggreer/the_silver_searcher
 */

import util from 'util';
import { colors } from './output-colors';

const execSync = util.promisify(require('child_process').exec);

const getFilesLists = async (args) => {
  const lists = [];
  try {
    for await (const arg of args) {
      console.log(`getting files for: '${arg}'`);
      const { err, stdout, stderr } = await execSync(`ag -wl ${arg} --silent`);
      // if (stdout) {
      //   console.log(`stdout: ${stdout}`);
      // }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      if (err) {
        console.error('Whoops - getFilesLists - Error:\n', err);
        return;
      }
      lists.push(stdout.toString().split('\n').slice(0, -1));
    }

    return lists;
  } catch (error) {
    throw error;
  }
};

const intersection = (arrays) => {
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
};

const isAgInstalled = async () => {
  const { err, stdout, stderr } = await execSync('which ag');
  // if (stdout) {
  //   console.log(`stdout: ${stdout}`);
  // }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  if (err) {
    console.error('Whoops - isAgInstalled - Error:\n', err);
    return;
  }
  return true;
};

(async () => {
  const agInstalled = await isAgInstalled();
  let lists, result;

  if (!agInstalled) {
    console.log(
      'You need to install `ag` for this to work...\n  On a mac you can use `brew install the_silver_searcher` otherwise please go to https://github.com/ggreer/the_silver_searcher for instructions on your system'
    );
    return;
  }

  const argsArr = process.argv.slice(2);

  if (argsArr.length < 2) {
    console.error(
      "\nNope...\nYou don't need this function, for a single string just use:\n`ag <your_string>`"
    );
    return;
  }

  try {
    lists = await getFilesLists(argsArr);
    if (lists) result = intersection(lists);
    const hasResults = result?.length > 0;

    if (hasResults) {
      console.log(colors.fgGreen, '\nSuccess!');
      console.log(
        `\nEach of these files have all of your searched strings...\n${result.join('\n')}`
      );
    } else {
      console.log(
        colors.fgRed,
        '\nSorry, there are no files that have ALL of your searched strings'
      );
    }

    return;
  } catch (error) {
    if (error.code === 1 && error.stdout === '' && error.stderr === '') {
      console.error(colors.fgRed, '...No results, you may have misspelled your search string...\n');
    } else {
      console.error('here is your Error:', error);
    }
  }
})();
