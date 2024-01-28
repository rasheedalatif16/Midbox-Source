// Copyright (c) 2012-2022 John Nesky and contributing authors, distributed under the MIT license, see accompanying the LICENSE.md file.

import { HTML } from "imperative-html/dist/esm/elements-strict";
import { Prompt } from "./Prompt";
import { SongDocument } from "./SongDocument";
import { Config } from "../synth/SynthConfig";

const { button, div, p, h2, h3 } = HTML;

export class TipPrompt implements Prompt {
		private readonly _closeButton: HTMLButtonElement = button({class: "cancelButton"});
		
	public readonly container: HTMLDivElement;
		
	constructor(private _doc: SongDocument, type: string) {
		let message: HTMLDivElement;
			
		switch (type) {
			case "scale": {
				message = div(
					h2("Scale"),
					p("This setting limits the available pitches for adding notes. You may think that there's no point in limiting your choices, but the set of pitches you use has a strong influence on the mood and feel of your song, and these scales serve as guides to help you choose appropriate pitches. Don't worry, you can change the scale at any time, so you're not locked into it. Try making little melodies using all the available pitches of a scale to get a sense for how it sounds."),
					p("The most common scales are major and minor. Assuming your song uses all pitches in the scale and especially \"tonic\" pitches (the highlighted row for octaves in the pattern editor) then major scales tend to sound more playful or optimistic, whereas minor scales sound more serious or sad."),
				);
			} break;
			case "key": {
				message = div(
					h2("Song Key"),
					p("This setting can shift the frequency of every note in your entire song up or down, keeping the \"tonic\" pitches (the highlighted row for octaves in the pattern editor) aligned with the selected \"key\" pitch."),
					p("If you've already placed some notes but they don't emphasize \"tonic\" pitches then the selected key isn't very meaningful. You can select the \"Detect Key\" option in the key menu to automatically align the most emphasized notes with \"tonic\" pitches."),
					p("If you don't want specific instruments to be affected by this setting, go to that instrument's effects and check out Midbox's percussion effect!"),
				);
			} break;
			case "key_octave": {
				message = div(
					h2("Octave"),
					p("This setting can shift the \"key\" by an octave, allowing you to use a B- or C+ key. This goes from -2 to 2."),
					p("This feature was ported from Ultrabox!"),
				);
			} break;
			case "tempo": {
				message = div(
					h2("Song Tempo"),
					p("This setting controls the speed of your song, measured in beats-per-minute. A \"beat\" is the duration of the little rectangles in the pattern editor. (In conventional music notation, a \"quarter note\" is usually equivalent to \"beat\".)"),
					p("Tip: Alternating between two different tempos using a mod channel can create rhythm too! This can allow the creation of swing."),
				);
			} break;
			case "reverb": {
				message = div(
					h2("Reverb"),
					p("Reverb is like a continuous echo effect. A little bit helps instruments sound more natural. Adding a lot of reverb can add sense of depth or mystery, but too much reverb can kinda \"smear\" sounds so that it's harder to distinguish notes or instruments, especially for lower \"bass\" notes."),
					p("Tip: If you want to apply reverb to your instrument but reverb doesn't sound good with it, make a copy of that instrument, give it some \"EQ filter\" changes (more on the EQ filter in its own tip prompt) and lower the instrument volume so reverb sounds good on it, and then layer it with the beginning instrument that has no reverb. This allows adding reverb while keeping all of the original instrument's qualities."),
				);
			} break;
			case "rhythm": {
				message = div(
					h2("Rhythm"),
					p("This setting determines how beats are divided. The pattern editor helps you align notes to fractions of a beat based on this setting."),
					p("If you've already placed some notes but they don't align with the selected rhythm, you can select the \"Snap Notes To Rhythm\" option in the rhythm menu to force the notes in the currently selected pattern(s) to align with the selected rhythm. To apply this change to the whole song, press 'A' if you are on a keyboard to select all patterns in the song (For mobile, this option can be found in the \"Edit\" menu) and then press the \"Snap Notes To Rhythm\" option."),
				);
			} break;
			case "instrumentIndex": {
				message = div(
					h2("Instrument Number"),
					p("In the \"Channel Settings\" option from Midbox's \"Edit\" menu (If you are using keyboard, the keybind would be Q.), there are a few ways to enable multiple instruments per channel."),
					p("First, you could enable multiple simultaneous instruments per channel. All of the channel's instruments will play all of the notes in the channel at the same time, and you can click an instrument number to view and edit its settings."),
					p("Second, you could enable different instruments per pattern. Only one of the instruments will play at any given time, but you can click the instrument number to change which instrument is used for the currently selected pattern(s)."),
					p("Finally, you can enable them both, in which case you can click an instrument number once to view it, and again to toggle whether the instrument is used for the currently selected pattern(s)."),
					p("Either way, you can click the + button to add more instruments to a channel, and you can press shift and a number key on your keyboard to select an instrument as if you had clicked the corresponding button here."),
				);
			} break;
			case "instrumentVolume": {
				message = div(
					h2("Instrument Volume"),
					p("This setting controls the volume of the selected instrument without affecting the volume of the other instruments. This allows you to balance the loudness of each instrument relative to each other."),
					p("Please be careful when using volume settings above 0. This indicates amplification and too much of that can trip the audio limiter built into this tool. This can lead to your song sounding muffled if overused. But when used carefully, amplification can be a powerful tool!"),
					p("Tip: Refrain from having any instrument's volume from being above 10, and keep every instrument volume around 0 for the best results. If your song doesn't sound loud enough, you can press Shift + L if you are on keyboard, or got to the \"Edit\" menu, then to \"Limiter Settings...\" to open up the limiter settings. This is a very powerful mixing tool to help mix your songs with more potency. Mess with the master gain to give a boost to your song volume."),
				);
			} break;
			case "pan": {
				message = div(
					h2("Instrument Panning"),
					p("If you're listening through headphones or some other stereo sound system, this controls the position of the instrument and where the sound is coming from, ranging from left to right."),
					p("As a suggestion, composers often put lead melodies, drums, and basses in the center, and spread other instruments toward either side. If too many instruments seem like they're coming from the same place, it can feel crowded and harder to distinguish individual sounds, especially if they cover a similar pitch range."),
					p("Tip: If you have multiple of the same instrument, it is best to use panning to spread them out. You may also use panning to grab the feeling that a sound or piece of ambience is coming from a certain direction, which, if performed correctly, can be powerful."),
				);
			} break;
			case "panDelay":
				{
					message = div(
						h2("Stereo Delay"),
						p("When panning, a slight delay is often added between the left and right ear to help make a sound feel more 'directional'. For example, in the real world your left ear will hear a sound coming from the left just slightly before the right ear."),
						p("This setting controls how much delay is added. When this is set to minimum, panning only affects the volume of the left/right ear without changing the delay. This can help to get a more 'uniform' feeling sound, which can be desirable for making 8-bit music."),
					);
				}
				break;
			case "arpeggioSpeed":
				{
					message = div(
						h2("Arpeggio Speed"),
						p("This setting affects how fast your chord will 'arpeggiate', or cycle between notes. With a fast arpeggio speed it will sound rapid-fire, whereas with a slow speed you can hear each note one after another. If you maintain the arpeggio at a relatively slow pace, you could even lay them out like a normal melody! Although, don't do this. It is very impractical."),
						p("When placing multiple notes on each other in the pattern editor (called a chord) with a chord like \"arpeggio\" or \"strum\", numbers will appear on the very left-side of the note. This shows the order in which the arpeggio will 'arpeggiate' notes. You can place the notes in different orders to change the order of note travelling."),
					);
				}
				break;
			case "strumSpeed":
				{
					message = div(
						h2("Strum Speed"),
						p("This setting affects how fast/slow your chord will strum. Strum chords rapidly play all notes in a chord, but not simultaneously. This gives the effect of an instrument sounding manually played on an instrument like a piano or guitar."),
						p("When placing multiple notes on each other in the pattern editor (called a chord) with a chord like \"arpeggio\" or \"strum\", numbers will appear on the very left-side of the note. This shows the order in which the strum will 'strum' notes. You can place the notes in different orders to change the order of note travelling."),
					);
				}
				break;
			case "slideSpeed":
				{
					message = div(
						h2("Slide Speed"),
						p("This setting affects how fast/slow notes will 'slide'. Slower speeds tend to not work well with small note durations, whereas faster speeds act more simultaneous."),
					);
				}
				break;
			case "twoNoteArpeggio":
				{
					message = div(
						h2("Faster Two-Note Arpeggio"),
						p("This setting makes arpeggios with only two notes in them happen twice as fast. Arpeggio chords with more than 2 notes in them are unaffected."),
					);
				}
				break;
			case "bounceArpeggio":
				{
					message = div(
						h2("Bouncing Arpeggio"),
						p("Arpeggios will 'arpeggiate' notes from the first placed note, to the next note that was placed, and rapidly does this process until the last note, which it then loops back to the first note. This order is marked by the numbers on the left-side of the notes in an arpeggio chord."),
						p("When this setting is ticked, the arpeggio will instead 'bounce' off the last note, going backwards rather than looping."),
					);
				}
				break;
			case "detune": {
				message = div(
					h2("Detune"),
					p("This setting can be used to finely control the pitch of your instrument. It is in units of 'cents', 100 of which equal one semitone."),
					p("Careful - you can quickly get very dissonant sounding songs by using this setting. You can detune your whole song and give it a whole new feel. If used very slightly, it can give your instrument a shimmer effect with other instruments that have close to that amount of cents."),
				);
			} break;
			case "instrumentType": {
				message = div(
					h2("Instrument Presets/Type"),
					p("Beepbox and Jummbox add many instrument presets, with so many more from Midbox. Check them out! You can also create your own custom instruments."),
					p("There are many instrument/drum types to pick from, each with their own properties that separate them from one another. Try them out!"),
					p("There are also options for copying and pasting instrument settings at the bottom of the instrument settings, as well as for generating random instruments at the top of the instrument type menu. However, you should at least get a decent understanding of what every setting does before you start attempting to master instrument design."),
				);
			} break;
			case "eqFilter": {
				message = div(
					h2("EQ Filter"),
					p("Filters are a way of emphasizing or diminishing different parts of a sound. Musical notes have a fundamental (base) frequency, but the sound of a musical note also has parts at higher frequencies and filters can adjust the volume of each of these parts based on their frequency."),
					p("Click in the filter editor to insert, delete, or drag a filter control point. The horizontal position of the point determines which frequencies it affects, and the vertical position determines how the volume is affected at that frequency."),
					p("Insert a new point on the left side of the filter editor to add a \"high-pass\" filter point, which additionally reduces the volume of lower frequencies, or insert a new point on the right side to add a \"low-pass\" filter point which reduces the volume of higher frequencies."),
					p("You can also enable a \"Note Filter\" as an effect. EQ and note filters are mostly the same, but have different purposes. EQ filters are for overall adjustments, whereas note filters are for dynamic control and can be moved with envelopes. Note filters come before things like effect while the EQ filter comes after all instrument processing, which causes note filters to make effects like distortion behave differently."),
					p("Tip: If say, one of your instruments are too loud, yet when you turn down the volume, the best parts of that instrument are too silent, you can put a point on the EQ filter to decrease the volume of the unwanted frequencies, while keeping that wanted part at normal volume. If you are on keyboard, press Shift + E to open an enhanced view of the EQ filter. It is also worth to know that not all instruments have to be perfect. It is likely that certain aspects of an instrument will be buried in the mix of the rest."),
				);
			} break;
			case "noteFilter": {
				message = div(
					h2("Note Filter"),
					p("Note filters are mostly the same as EQ filters, but have a different purpose. EQ filters are for overall adjustments, whereas note filters are for dynamic control and can be moved with envelopes. Note filters also change how the effects like distortion, bit crusher, and freq crusher sound."),
					p("Filters are a way of emphasizing or diminishing different parts of a sound. Musical notes have a fundamental (base) frequency, but the sound of a musical note also has parts at higher frequencies and filters can adjust the volume of each of these parts based on their frequency."),
					p("Click in the filter editor to insert, delete, or drag a filter control point. The horizontal position of the point determines which frequencies it affects, and the vertical position determines how the volume is affected at that frequency."),
					p("Insert a new point on the left side of the filter editor to add a \"high-pass\" filter point, which additionally reduces the volume of lower frequencies, or insert a new point on the right side to add a \"low-pass\" filter point which reduces the volume of higher frequencies."),
					p("Tip: Note filters can also make interesting noises when combined with bit crush and frequency crush effects. If you create an envelope that changes the note filter points by note size, and then add a low-pass/high-pass point somewhere between the top left and top center of the note filter hud, you can create dubstep-like sounds by using note size. If you are on keyboard and have the effect enabled, press Shift + N to open an enhanced view of the note filter."),
				);
			} break;
			case "songEQFilter": {
				message = div(
					h2("Song EQ Filter"),
					p("Unlike the other two filters, this one affects the entire song."),
					p("Filters are a way of emphasizing or diminishing different parts of a sound. Musical notes have a fundamental (base) frequency, but the sound of a musical note also has parts at higher frequencies and filters can adjust the volume of each of these parts based on their frequency."),
					p("Click in the filter editor to insert, delete, or drag a filter control point. The horizontal position of the point determines which frequencies it affects, and the vertical position determines how the volume is affected at that frequency."),
					p("Insert a new point on the left side of the filter editor to add a \"high-pass\" filter point, which additionally reduces the volume of lower frequencies, or insert a new point on the right side to add a \"low-pass\" filter point which reduces the volume of higher frequencies."),
				);
			} break;
			case "fadeInOut": {
				message = div(
					h2("Fade In/Out"),
					p("This setting controls how long it takes for notes to reach full volume at the beginning or decay to silence at the end."),
					p("An instant fade-in sounds like instruments that are played by hitting or plucking, whereas slower fade-ins sound like instruments that are played by blowing air."),
					p("You can also make the fade-out start before the note ends to leave a gap before the next note starts, or after the note ends to allow the sound of the end of the note to overlap with the start of the next note."),
					p("Tip: Be mindful on how transitions work, for if you connect a row of notes together and enable a seamless transition like continue, the fade in/outs will no long take effect until after the chain of notes when no notes connect."),
				);
			} break;
			case "transition": {
				message = div(
					h2("Transition"),
					p("Usually, when one note ends at the same time another begins, the old note will fade out and the new note will fade in based on the fade in/out settings, but this setting can override that, connecting the end of one note to the beginning of the next."),
					p("The \"interrupt\" transition makes the wave suddenly change from the old note's frequency to the new note's frequency without any fading, but still restarts envelopes at the beginning of the new note. The \"continue\" transition is similar but it doesn't restart envelopes."),
					p("The \"slide\" transition makes the pitch shift quickly but not instantaneously from the old note's frequency to the new note's frequency, and softly restarts envelopes."),
					p("Tip: Although you cannot place notes of different sizes on top of each other due to how the pattern editor of Midbox works, you can use the \"continue\" transition to replicate the effect."),
				);
			} break;
			case "chipWave": {
				message = div(
					h2("Chip Wave"),
					p("Midbox comes with some sound waves based on classic electronic sound chips, as well as several unique waves. This is the basic source of the sound of the instrument, which is modified by the other instrument settings."),
					p("Take note that if you want waves that are more high quality and accurate, you can use the FM operator waveforms for more accurate waves."),
				);
			} break;
			case "chipNoise": {
				message = div(
					h2("Noise"),
					p("Midbox comes with several basic noise sounds. These do not have any distinct musical pitch, and can be used like drums to create beats and emphasize your song's rhythm."),
					p("In most other mods of Beepbox, noise is typically in drum channels. However, Midbox allows noise types in instrument channels as well."),
				);
			} break;
			case "supersawDynamism": {
				message = div(
					h2("Supersaw Dynamism"),
					p("A supersaw is a combination of many sawtooth waves, and this setting controls the contribution of extra sawtooth waves."),
					p("At the low end of the slider, only the first wave is contributing to the sound, which sounds like an ordinary static sawtooth wave. At the maximum setting, all of the waves are contributing equally and the resulting tone can randomly shift depending on how the waves line up with each other, similar to the \"unison\" setting and \"chorus\" effect."),
				);
			} break;
			case "supersawSpread": {
				message = div(
					h2("Supersaw Spread"),
					p("A supersaw is a combination of many sawtooth waves, and this setting controls the distance between their frequencies. The dynamism setting must be used for the extra waves to have any effect."),
					p("At the low end of the spread slider, all of the voices have the same frequency but random phase, resulting in a different sound every time a note starts. In the middle, the waves all have slightly different frequencies that shift in and out of phase over time similar to the \"unison\" and \"chorus\" settings, creating a classic supersaw sound. At the extreme end, the frequencies are so far apart they sound dissonant."),
				);
			} break;
			case "supersawShape": {
				message = div(
					h2("Supersaw Shape"),
					p("This supersaw instrument includes an option to change the shape of the waves from sawtooth waves to pulse waves. Use this setting to morph between the two shapes."),
					p("When a pulse wave shape is used, you can also control the pulse width with a separate setting."),
				);
			} break;
			case "pulseWidth": {
				message = div(
					h2("Pulse Wave Width"),
					p("This setting controls the shape and sound of a pulse wave. At the minimum width, it sounds light and buzzy. At the maximum width, it is shaped like a classic square wave. Add some envelopes to manipulate the pulse width based on note size to manually control the pulse width. This can allow for chiptune-ish songs!"),
				);
			} break;
			case "unison": {
				message = div(
					h2("Unison"),
					p("This instrument can play two identical waves at different frequencies. When two waves play at slightly different frequencies, they move in and out of phase with each other over time as different parts of the waves line up. This creates a dynamic, shifting sound. Pianos are a common example of this kind of sound, because each piano key strikes multiple strings that are tuned to slightly different frequencies."),
					p("The distance between two frequencies is called an \"interval\", and this setting controls how large it is. If the interval is too wide, then the waves may sound out-of-tune and \"dissonant\". However, if the interval is even larger, then the two frequencies can even be distinct pitches. A unison may also be offset, which allows it to sound like entirely different pitches when compared to no unison."),
				);
			} break;
			case "chords": {
				message = div(
					h2("Chords"),
					p("When multiple different notes occur at the same time, this is called a chord. Chords can be created in Midbox's pattern editor by adding notes above or below another note."),
					p("This setting determines how chords are played. The default option is \"simultaneous\", which starts playing all of the pitches in a chord at the same time. The \"strum\" option is similar, but plays the notes starting at slightly different times. Midbox offers a strum speed slider for adjusting how fast each note of the chord 'strums'. The \"arpeggio\" option is used in chiptune style music and plays a single tone that rapidly alternates between all of the pitches in the chord. This setting may also be customized to your favor."),
					p("Some Midbox instruments have an option called \"custom interval\" which uses the chord notes to control the interval between the waves of a single tone. This can create strange sound effects when combined with FM modulators."),
				);
			} break;
			case "vibrato": {
				message = div(
					h2("Vibrato"),
					p("This setting causes the frequency (pitch) of a note to wobble slightly. Singers and violinists often use vibrato. Beside this setting lies an arrow you may press to view and customize each aspect of the vibrato."),
				);
			} break;
			case "vibratoDepth":
				{
					message = div(
						h2("Vibrato Depth"),
						p("This setting affects the depth of your instrument's vibrato, making the wobbling effect sound stronger or weaker."),
					);
				} break;
			case "vibratoDelay":
				{
					message = div(
						h2("Vibrato Delay"),
						p("This setting changes when vibrato starts to kick in after a note is played. Vibrato is most common for long held notes and less common in short notes, so this can help you achieve that effect."),
					);
				} break;
			case "vibratoSpeed":
				{
					message = div(
						h2("Vibrato Speed"),
						p("This setting determines how fast the vibrato's up-and-down wobble effect will happen for your instrument."),
					);
				}
				break;
			case "vibratoType":
				{
					message = div(
						h2("Vibrato Type"),
						p("This determines the way vibrato causes your instrument's pitch to wobble. The normal type is a smooth up and down, whereas the shaky type is chaotic."),
					);
				}
				break;
			case "algorithm": {
				message = div(
					h2("FM Algorithm"),
					p('FM Synthesis is a mysterious but powerful technique for crafting sounds, popularized by Yamaha keyboards and the Sega Genesis/Mega Drive. It may seem confusing, but try playing around with the options until you get a feel for it, or check out some of the preset examples!'),
					p('This FM synthesizer uses up to four waves, numbered 1, 2, 3, and 4. Each wave may have its own frequency and volume.'),
					p('There are two kinds of waves: "carrier" waves play a tone out loud, but "modulator" waves distort other waves instead. Wave 1 is always a carrier and plays a tone, but other waves may distort it. The "Algorithm" setting determines which waves are modulators, and which other waves those modulators distort. For example, "1←2" means that wave 2 modulates wave 1, and wave 1 plays out loud.'),
					p('Tip: I would suggest playing around with FM presets like the synth kick to get a feel of what setting makes that instrument do what it does.'),
				);
			} break;
			case "feedbackType": {
				message = div(
					h2("Feedback Type"),
					p('Modulators distort in one direction (like 1←2), but you can also use the feedback setting to make any wave distort in the opposite direction (1→2), or even itself (1⟲).'),
				);
			} break;
			case "feedbackVolume": {
				message = div(
					h2("Feedback Distortion"),
					p("This setting controls the amount of feedback distortion based on the feedback type setting."),
				);
			} break;
			case "operatorFrequency": {
				message = div(
					h2("Operator Frequency"),
					p('This setting controls the frequency of an individual FM wave, relative to the fundamental frequency of the note. The multiplier 1× is the same as the fundamental frequency, whereas 2× would be an octave (12 semitones) above it, and this keeps going similar to how "harmonics" work. The frequencies with a "~" are slightly detuned and shift in and out of phase over time compared to the other frequencies.'),
					p('Try different combinations of a "carrier" wave and a "modulator" wave with different frequencies to get a feel for how they sound together.'),
				);
			} break;
			case "operatorVolume": {
				message = div(
					h2("Operator Volume"),
					p("This setting controls the volume of \"carrier\" waves, or the amount of distortion that \"modulator\" waves apply to other waves."),
				);
			} break;
			case "spectrum": {
				message = div(
					h2("Spectrum"),
					p("This setting allows you to draw your own noise spectrum! This is good for making drum sounds."),
					p("If you only use certain frequencies and a soft fade in/out, it's also possible to make howling wind sounds or even musical wind instruments."),
					p("The left side of the spectrum editor controls the noise energy at lower frequencies, and the right side controls higher frequencies."),
					p("Adding effects to the spectrum usually has really cool effects. Try plotting out your own spectrum and then putting distortion on it!"),
				);
			} break;
			case "harmonics": {
				message = div(
					h2("Harmonics"),
					p("This setting allows you to design your own sound wave! Most musical waves are actually a combination of sine waves at certain frequencies, and this lets you control the volume of each sine wave individually."),
					p("The left side of the harmonics editor controls the sine wave volumes at lower frequencies, and the right side controls higher frequencies."),
					p("This instrument is more powerful when trying to make instruments such as pianos, bells, and picked string instruments."),
				);
			} break;
			case "effects": {
				message = div(
					h2("Effects"),
					p("Midbox has many different kinds of special effects you can add to instruments. You can turn on multiple effects at once, and they can be configured individually. Try them all out!"),
				);
			} break;
			case "drumsetEnvelope": {
				message = div(
					h2("Drumset Envelope"),
					p("This drumset comes with a low-pass filter, and this setting can dynamically change the low-pass filter frequency over time. Each row in the pattern editor can have a different envelope shape."),
				);
			} break;
			case "drumsetSpectrum": {
				message = div(
					h2("Drumset Spectrum"),
					p("This setting allows you to draw your own noise spectrum! This is good for making drumsets. Each row in the pattern editor gets its own spectrum."),
					p("The left side of the spectrum editor controls the noise energy at lower frequencies, and the right side controls higher frequencies."),
				);
			} break;
			case "chorus": {
				message = div(
					h2("Chorus"),
					p("The chorus effect combines multiple copies of the instrument's sound and adds a bit of vibrato to simulate an ensemble of instruments or voices. Drag the slider to control how much chorus is added."),
				);
			} break;
			case "echoSustain": {
				message = div(
					h2("Echo Volume"),
					p("The echo effect repeats the instrument's sound after a delay. Each echo is a little bit quieter than the last, and this setting controls how much quieter."),
				);
			} break;
			case "echoDelay": {
				message = div(
					h2("Echo Delay"),
					p("The echo effect repeats the instrument's sound after a delay, and this setting controls how long the delay is."),
					p("The bars on the slider indicate x.0 beat delays. This can help for aligning."),
				);
			} break;
			case "pitchShift": {
				message = div(
					h2("Pitch Shift"),
					p("This setting makes instruments play higher or lower pitches than the ones displayed in the pattern editor. Be careful that you don't confuse yourself!"),
					p("You can combine this with envelopes to bend pitch over time, or play multiple simultaneous instruments with different pitch shifts for interesting layered sounds."),
					p("The intervals created by this setting are in \"just intonation\" which means they stay in phase with the original pitch instead of shifting in and out of phase over time. If you want the shifting, add the detune effect!"),
					p("The range of the pitch shift bar goes from -1 octave [-12 semitones] at the very left side of the bar, and +1 octave [+12 semitones] at the very right. The very middle of the bar is the default pitch. If you want to change the key of more than one of your instruments at once, try song key!"),
				);
			} break;
			case "detune": {
				message = div(
					h2("Detune"),
					p("This setting slightly adjusts the frequency of notes played by the instrument. You can use a little bit to add a shifting sound similar to the \"unison\" setting when combined with other instruments. If you use too much, then the instrument may sound unpleasantly out-of-tune. This setting can also, when appiled to the grand majority of instruments, change the feel of your song, even if ever so slightly."),
				);
			} break;
			case "distortion": {
				message = div(
					h2("Distortion"),
					p("This is the famous electric guitar effect! However, there are some things to be aware of."),
					p("First, most chords don't sound right when combined with heavy distortion, nor heavy bit/freq crush. The only chords commonly used with distorted electric guitars are \"power chords\" which consist of a root note, a \"fifth\" note above that, and/or any octaves of those two notes."),
					p("Second, the distortion sound depends a lot on filtering. In particular, I recommend enabling the note filter effect, and adding both high-pass and low-pass points to the note filter. (Note filters are applied first, then distortion (or any effect) which transforms the sound based on that filtering, then the EQ filter is applied last.)"),
					p("Finally, I recommend adjusting the fade-out setting to allow the end of each note to overlap a little bit with the beginning of the next, but not too much!"),
				);
			} break;
			case "bitcrusherQuantization": {
				message = div(
					h2("Bitcrusher Quantization"),
					p("This effect makes stuff sounds harsher, artificial, and \"low quality\", which is great if that's what you're going for! Combine this effect with a bunch of low-pass points gathered on the top-left/center-left of a note filter, and you can create dynamic sounds based on which pitch the instrument is."),
				);
			} break;
			case "bitcrusherFreq": {
				message = div(
					h2("Frequency Quantization"),
					p("The bitcrusher effect comes with an additional frequency quantization effect! This is a fun one to play with, especially when combined with the note filter effect."),
					p("Every other notch on this slider is aligned with the currently selected key of the song, and the in-between notches are aligned with the tritones of the key. High amounts of this settings will typically make your instrument sound more retro or corrupt, but don't always expect the same results!"),
				);
			} break;
			case "test": {
				message = div(
					h2("Test Effect"),
					p("This effect has been made for testing purposes. Mid should make a proper tip prompt for this in the future."),
				);
			} break;
			case "envelopes": {
				message = div(
					h2("Envelopes"),
					p("Envelopes are a way to dynamically adjust various other settings over time, usually based on how long the note lasts. Press the + button to add an envelope, then use the menus below to select which setting to control and the curve of the envelope. Try different combinations to see how they sound!"),
					p("Most envelope curves restart from the beginning every time a new note plays. The \"note size\" option is based on the note width as drawn in the pattern editor."),
					p("Envelope curves move in the range from 0 to 1 (or vice versa), where 0 means as quiet as possible and 1 is the same as the corresponding position selected in the instrument settings above. If multiple envelopes are targetting the same setting, they are multiplied before applying to the setting."),
					p("BE AWARE: Stacking too many envelopes on the same setting may have undesired effects, such as errors in sound and the program in general. Try to keep it one or two envelopes per setting to avoid such issues."),
				);
			} break;
			case "discreteEnvelope": {
				message = div(
					h2("Use Discrete Envelopes?"),
					p("Envelopes are usually interpolated, meaning they change continuously and smoothly. This setting, when ticked, makes envelopes not interpolate. It's a small difference, but can be helpful for some chip-like sounds."),
					p("For understandability, imagine this: Each envelope is a function, and every tick (or 48ths of a second) the envelope is updated to have the current value of the function. Picture this as many /48th notes that fade in volume. When this checkbox is enabled, those notes will be flat rather than faded. Very small change, but can have a larger difference on faster envelopes.")
				);
			} break;
			case "envelopeSpeed": {
				message = div(
					h2("Envelope Speed"),
					p("This setting controls the speed of ALL envelopes for the instrument. Each envelope 'plays' at a certain speed, and this slider can scale it to play faster or slower. Use this to fine-tune your tremolo or how fast something decays to get just the right effect."),
					p("Note that, while this setting is limited in the sense that it controls all envelopes at once, you can still achieve a variety of outcomes by trying combinations of modes of each envelope type, which typically differ only in speed."),
				);
			} break;
			case "usedInstrument": {
				message = div(
					h3("'Is this instrument used somewhere else?'"),
					p("This indicator will light up when the instrument you're currently looking at is used in another place in your song (outside the selection)."),
					p("This can be useful when you're not sure if you've used the instrument before, and making edits carelessly could change other parts of the song."),
				);
			} break;
			case "usedPattern": {
				message = div(
					h3("'Is this pattern used somewhere else?'"),
					p("This indicator will light up when the pattern you're currently looking at is used in another place in your song (outside the selection)."),
					p("This can be useful when you're not sure if you've used the pattern before, and making edits carelessly could change other parts of the song."),
				);
			} break;
			case "modChannel": {
				message = div(
					h2("Modulator Channel"),
					p("Modulators can be used to change settings in your song automatically over time. This technique is also known as automation."),
					p("This setting controls which channel the modulators will take effect for. If you choose 'Song', you can change song-wide settings too!"),
					p("There are a max of 6 slots. Each slot can be assigned to a different instrument and one of it's settings, or the song and one of it's settings. If the note appears neon-colored, that means that your mod channel's selection is currently doing an action. If the note is gray, that means that the mod channel cannot find the setting/doesn't have any setting selected to automate. When making a change between instruments, sometimes the setting box will be surrounded with a red line. This means that the selected instrument does not have that setting, and thus cannot be used until swapped."),
				);
			} break;
			case "modInstrument": {
				message = div(
					h2("Modulator Instrument"),
					p("Modulators can be used to change settings in your song automatically over time. This technique is also known as automation."),
					p("This setting controls which instrument your modulator will apply to within the given channel you've chosen."),
					p("If you choose 'all', every instrument in the channel will be affected. If you choose 'active', just the current ones used in this pattern will be instead."),
					p("Note that with 'all' or 'active', effects will only be applied to instruments that the effect is applicable on. For example if an instrument does not have panning effects, modulating panning will not affect it.")
				);
			} break;
			case "modSet": {
				message = div(
					h2("Modulator Setting"),
					p("This is the parameter that you want to change with this modulator. For example, if you set this to 'Tempo', you can speed up or slow down your song by laying notes in the pattern editor."),
					p("Note that you'll see different options if your channel is set to 'Song' versus a channel number. With 'Song', you'll see song-wide settings such as tempo. With a channel, you'll see specific instrument settings. Adding more effects to the instrument causes modulators for them to be available, so be sure to experiment!"),
					p("Most modulators behave as you'd expect and work just as if you were moving their associated slider. Click the '?' when you have a setting selected to get more info about it!"),
				);
			} break;
			case "modFilter": {
				message = div(
					h2("Filter Target"),
					p("This setting specifies which parameter of your targeted filter you would like to change."),
					p("With the 'morph' setting, the note value for your modulator represents the number of a subfilter to 'morph' into over time. For example, dragging a note from 0 to 7 will morph from your main filter to the 7th subfilter. To change how your subfilters are set up, click the '+' button on the target filter."),
					p("With a Dot setting, you can fine-tune the exact location of every dot on your filter graph. Note that this is extremely intensive if you want to modulate all dots - a morph is better in that case - but this can come in handy for small adjustments."),
				);
			} break;
			case "transitionBar": {
				message = div(
					h2("Tie Notes Over Bars"),
					p("With this option ticked, notes won't transition across bars if you put notes with the same pitches at the start of the next bar. Instead they will 'tie over' and sound like one long note."),
				);
			} break;
			case "clicklessTransition": {
				message = div(
					h2("Clickless Transition"),
					p("Sometimes, seamless and other transition types can make audible 'clicks' when changing between notes. Ticking this option will cause those clicks to be silenced as much as possible."),
				);
			} break;
			case "continueThruPattern": {
				message = div(
					h2("Continue Through Pattern"),
					p("By default, this checkbox is ticked. When ticked, if the transition is 'seamless', the transition will be cut off at the end of a bar."),
				);
			} break;
			case "aliases": {
				message = div(
					h2("Aliasing"),
					p("Midbox applies a technique called 'anti-aliasing' to instruments normally to help them sound cleaner even at high frequencies and low sample rates."),
					p("When this setting is ticked, that technique is disabled, so you may hear strange audio artifacts especially at high pitches and when bending notes. However, this can lend a grungy sound to an instrument that could be desirable."),
				);
			} break;
			case "percussion":{
				message = div(
					h2("Key-Affected"),
					p("The percussion effect comes with multiple checkboxs that toggle whether or not the instrument is affected by pitch-changing elements."),
					p("By default, the checkbox is checked. When this box is unchecked, the instrument will no longer be affected by the song key."),
					p("This allows changing your song key without messing up the pitches of your instrument-drums."),
					p("[Massive thanks to LeoV for making this checkbox.]"),
				);
			} break;
			case "songDetuneEffected": {
				message = div(
					h2("Song Detune-Affected"),
					p("The percussion effect comes with multiple checkboxs that toggle whether or not the instrument is affected by pitch-changing elements."),
					p("By default, the checkbox is checked. When this box is unchecked, the instrument will no longer be affected by the song detune modulator."),
					p("This allows using the song detune modulator without messing up the pitches of your drums."),
				);
			} break;
			case "songOctaveEffected": {
				message = div(
					h2("Song Key Octave-Affected"),
					p("The percussion effect comes with multiple checkboxs that toggle whether or not the instrument is affected by pitch-changing elements."),
					p("By default, the checkbox is checked. When this box is unchecked, the instrument will no longer be affected by the song key octave."),
					p("This allows changing the song key's octave without messing up the pitches of your instrument-drums."),
				);
			} break;
			case "operatorWaveform": {
				message = div(
					h2("Operator Waveform"),
					p('This setting controls the what kind of sound wave an individual FM wave uses. By defualt, the FM synth only uses sine waves.'),
					p('This feature was ported from Aury System`s GoldBox!'),
				);
			} break;
			case "filterType": {
				message = div(
					h2("Filter Type"),
					p('Toggling these buttons lets you choose between a simple filter interface with two sliders, or the more advanced filter graph.'),
					p('The two-slider version (simple) controls a single low-pass filter and was used in legacy versions. It is not as powerful, but if you feel overwhelmed you can start with this.'),
					p('Note that switching from the simple interface to the advanced interface will convert your current settings, so you can also use it as a basis for later tweaking.'),
				);
			} break;
			case "filterCutoff": {
				message = div(
					h2("Low-Pass Filter Cutoff Frequency"),
					p("The lowest setting feels \"muffled\" or \"dark\", and the highest setting feels \"harsh\" or \"bright\"."),
					p("Most sounds include a range of frequencies from low to high. Midbox instruments have a filter that allows the lowest frequencies to pass through at full volume, but can reduce the volume of the higher frequencies that are above a cutoff frequency. This setting controls the cutoff frequency and thus the range of higher frequencies that are reduced."),
					p("This cutoff setting also determines which frequency resonates when the resonance peak setting is used."),
				);
			} break;
			case "filterResonance": {
				message = div(
					h2("Low-Pass Filter Resonance Peak"),
					p("Increasing this setting emphasizes a narrow range of frequencies, based on the position of the filter cutoff setting. This can be used to imitate the resonant bodies of acoustic instruments and other interesting effects."),
					p("The filter preserves the volume of frequencies that are below the cutoff frequency, and reduces the volume of frequencies that are above the cutoff. If this setting is used, the filter also increases the volume of frequencies that are near the cutoff."),
				);
			} break;
			case "wavetableSpeed": {
				message = div(
					h2("Wavetable Speed"),
					p("The wavetable consists of multiple custom chipwaves that constantly cycle between each other. This slider controls how fast they cycle."),
				);
			} break;
			case "x": {
				message = div(
					h2("Speed Display"),
					p("This is a little number that shows you how fast/slow a speed is. This display is measured as a multiplier."),
					p("Key: 'x2' means twice as fast as standard. 'x0.5' means half as fast.")
				);
			} break;
			case "tk": {
				message = div(
					h2("Speed Display"),
					p("This is a little number that shows you how fast/slow a speed is. This display is measured in ticks."),
					p("Key: '2 tk' means the duration is for two 'ticks'.")
				);
			} break;
			case "wps": {
				message = div(
					h2("Speed Display"),
					p("This is a little number that shows you how fast/slow a speed is. This display is measured in waves per second."),
					p("Key: '4wps' means the speed is four waves per second. '0.5wps' means the speed is one wave per two seconds, or 1/2 wave per second.")
				);
			} break;

			default:
				// Check for modSetinfo#
				if (type.indexOf("modSetInfo") >= 0) {
					let modNum: number = +type[type.length - 1];
					let modulator: number = _doc.song.channels[_doc.channel].instruments[_doc.getCurrentInstrument()].modulators[modNum];
					let pList: HTMLParagraphElement[] = [];
					for (let s: number = 0; s < Config.modulators[modulator].promptDesc.length; s++) {
						pList.push(p(
							Config.modulators[modulator].promptDesc[s]
								.replace("$LO", "" + Config.modulators[modulator].convertRealFactor)
								.replace("$MID", "" + (Config.modulators[modulator].convertRealFactor + Config.modulators[modulator].maxRawVol / 2))
								.replace("$HI", "" + (Config.modulators[modulator].convertRealFactor + Config.modulators[modulator].maxRawVol))

						));
					}
					// Last element for mod settings is just some miscellaneous data for nerds like me.
					pList[pList.length-1].style.setProperty("color", "var(--secondary-text)");
					message = div(
						h2(Config.modulators[modulator].promptName),
						pList,
					);
					break;
				}
				else {
					throw new Error("Unhandled TipPrompt type: " + type);
				}
		}
		
		this.container = div({class: "prompt", style: "width: 400px;"},
			message,
			this._closeButton,
		);
			
			setTimeout(()=>this._closeButton.focus());
			
		this._closeButton.addEventListener("click", this._close);
	}
		
		private _close = (): void => { 
		this._doc.undo();
	}
		
		public cleanUp = (): void => { 
		this._closeButton.removeEventListener("click", this._close);
	}
}
