#!/usr/bin/env node

import { program } from 'commander';
import { parse as parseCue } from 'cue-parser';
import { access } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import { ICueSheet } from 'cue-parser/lib/types';

class CustomError extends Error {
  constructor(readonly message: string) {
    super();
  }
}

const tz = (value: number): string => ('0' + value).slice(-2);

const main = async (file: string, options: { timestamps: boolean }) => {
  try {
    await access(file, fsConstants.R_OK).catch((reason: Error) => {
      throw new CustomError(reason.message);
    });

    let cueSheet: ICueSheet;

    try {
      cueSheet = parseCue(file);
    } catch {
      throw new CustomError('could not parse the file as a CUE file');
    }

    if (!cueSheet.files) {
      throw new CustomError('CUE file does not contain any audio files');
    }

    const validCueFiles = cueSheet.files.filter((item) => item.tracks?.length);
    const allTracks = validCueFiles.map((item) => item.tracks![0]);
    const allTracksWithValidTime = allTracks.filter(
      (item) => item.indexes?.length,
    );

    const allObjTracks = allTracksWithValidTime.map((item) => ({
      name: item.title,
      artist: item.performer,
      time: item.indexes![0].time,
    }));

    const allStringTracks: string[] = [];

    allObjTracks.forEach(({ artist, name, time }) => {
      if (
        !allStringTracks.find((item) => item.includes(`${artist} - ${name}`))
      ) {
        if (options.timestamps) {
          return allStringTracks.push(
            `[${time.min > 0 ? tz(time.min) + ':' : ''}${tz(time.sec)}:${tz(
              time.frame,
            )}] ${artist} - ${name}`,
          );
        }

        return allStringTracks.push(`${artist} - ${name}`);
      }
    });

    allStringTracks.forEach((item) => console.log(item));
  } catch (error) {
    if (error instanceof CustomError) {
      console.log('error: ' + error.message);

      process.exit(1);
    }

    throw error;
  }
};

program
  .name('trbltrbl-cue-parser')
  .description(
    'Script for parsing a CUE file and generating a tracklist for YouTube descriptions.',
  )
  .version('0.0.1')
  .argument('<file>', 'file to process')
  .option(
    '--no-timestamps',
    'do not include timestamps at the beginning of each track',
  )
  .action(main);

program.parse();
