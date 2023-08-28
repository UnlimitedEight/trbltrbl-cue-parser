## TREBLE TROUBLE CUE File Parser

[![npm version](https://badge.fury.io/js/trbltrbl-cue-parser.svg)](https://badge.fury.io/js/trbltrbl-cue-parser)

Script for parsing a CUE file and generating a tracklist for YouTube descriptions.

### Install

Install it using your favourite package manager:

`npm i -g trbltrbl-cue-parser`

`yarn global add trbltrbl-cue-parser`

### Usage

`trbltrbl-cue-parser /path/to/file`

Example input file:
```
REM DATE 2023-07-23 02:55 PM
REM RECORDED_BY "rekordbox-dj"
TITLE "REC-2023-07-23"
PERFORMER "DJ Controller"
FILE "01 REC-2023-07-23.wav" WAVE
	TRACK 01 AUDIO
		TITLE "Touch Me"
		PERFORMER "Rui Da Silva"
		FILE "/Users/DJ/Music/Rui Da Silva - Touch Me.flac" WAVE
		INDEX 01 00:00:00
	TRACK 02 AUDIO
		TITLE "Meet Her at the Loveparade"
		PERFORMER "Da Hool"
		FILE "/Users/DJ/Music/Da Hool - Meet Her at the Loveparade.flac" WAVE
		INDEX 01 00:01:52
	TRACK 03 AUDIO
		TITLE "Love Comes Again"
		PERFORMER "Tiesto"
		FILE "/Users/DJ/Music/Tiesto - Love Comes Again.flac" WAVE
		INDEX 01 00:03:41
```

Example output:
```
[00:00:00] Rui Da Silva - Touch Me
[00:01:52] Da Hool - Meet Her at the Loveparade
[00:03:41] Tiesto - Love Comes Again
```

Timestamps can be excluded if `--no-timestamps` is passed.
