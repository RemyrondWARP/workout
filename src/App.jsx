
import { useEffect, useState } from "react";
import localforage from "localforage";

const seed = [
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Protraction / Retraction in push up position",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Pike press",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Pike press deep",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 6,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Triceps extension",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Handstand press drag",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Tucked planche dragging forward",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Tucked planche drag hold (off ground)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 4,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Tucked planche press",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Handstand",
    "Oefening": "Tucked planche raise",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Overhead press",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 3",
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Overhead press lateral tilt",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 3",
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Side hip thrusters (barbell behind neck)",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Elevation press ups in side tilt",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Dragon flag hip extension",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Dragon flag decline raise",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Dragon flag raise and hold",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Side dragon flag",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Hanging flag hold",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Hanging flag shoulder press outs",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Flag",
    "Oefening": "Hanging flag hold + pelvic raise",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Biceps pull ups",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Pull up knee raise (with or without band)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "max 3",
    "Aanbevolen reps": 6,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Chest ups (eplosive pull up)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 6,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Abs ups (explosive pull up)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "max 5",
    "Aanbevolen reps": 6,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Double dip diagonal swing",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "3 before fatiguing",
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Back spin muscle up (same back spin for 360)",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Diagonal swings (reposition grip)",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Assisted Muscle up (banded)",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Muscle up",
    "Oefening": "Kipping Muscle up (freestyle version)",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 3,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Dead hang with active hang",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 3",
    "Aanbevolen reps": 8,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "One arm active hang",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": "max 3",
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Hyper active hang with hip raise",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 8,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Knees to shoulders raise",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 8,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Skin the cat",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Skin the cat to german hang (3 sec)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 3,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "German hang semi hang",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "5 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "GH full hang (pronated/supinated grip)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Backlever full tuck hold",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 3,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "GH tu full tuck backlever hold",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": "3 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Semi tuck backlever",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": "5 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Semi tuck backlever hold and raise",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": "6 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Shoulder stand backlever",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": "2 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Shoulder stand Straddle backlever hold",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": "5 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Full backlever raise",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "2 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "Full backlever hold and raise",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 5,
    "Aanbevolen reps": "2 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL Ice cream makers",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 5,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL tucked hold",
    "Type": "Conditioning",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": "7 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL tucked hold and pulls",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": "4 - 4 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL straddle hold",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 2,
    "Aanbevolen reps": "2 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL straddle raise and hold",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "2 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Front and Backlever",
    "Oefening": "FL straddle hold",
    "Type": "Exposure",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "3 sec",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Dips/Pull ups/Push ups",
    "Oefening": "Push-ups",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "Max 100",
    "Aanbevolen reps": "#sets",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Dips/Pull ups/Push ups",
    "Oefening": "Clap push-ups (plyometric press)",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "Max 100",
    "Aanbevolen reps": "#sets",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Dips/Pull ups/Push ups",
    "Oefening": "Pull-ups",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "Max 100",
    "Aanbevolen reps": "#sets",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Calisthenics",
    "Categorie": "Dips/Pull ups/Push ups",
    "Oefening": "Dips",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": "Max 100",
    "Aanbevolen reps": "#sets",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Straddle squats",
    "Type": "Strengthening",
    "Tempo": "3/1/3",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": 20
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Romanian deadlift",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": 30
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Single leg hip thrust",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": 20
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Backward lunge",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "0",
    "Aanbevolen gewicht": 0
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Band lateral walk",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 100,
    "Aanbevolen gewicht": 0
  },
  {
    "Training type": "Leg day 1",
    "Categorie": "Legs",
    "Oefening": "Hip hike",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": 0
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Compression push up with band",
    "Type": "Full strength prog.",
    "Tempo": "5 - 1 - 3 - 2",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": "15-20",
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Hefesto Push ups",
    "Type": "Full strength prog.",
    "Tempo": "2 - 2 - 2",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 15,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Pike Push up transitions",
    "Type": "Functional and endurance",
    "Tempo": "1 - 1 - 1",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Resistance HSPU",
    "Type": "Exposure and Raw",
    "Tempo": "1 - 1",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Planche Push ups \u2192 Tucked Planche",
    "Type": "Exposure and Raw",
    "Tempo": "3 sec?",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Elevate TRX Pike push",
    "Type": "Conditoning & Programming",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Push-ups",
    "Oefening": "Headbangers \u2192  High/Low Pull ups",
    "Type": "",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "High pull ups ",
    "Type": "Full strength prog.",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "High - low Pull ups",
    "Type": "Full strength prog.",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "Parallel pull ups (weighted)",
    "Type": "Conditoning & Programming",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "Compression pull up with band",
    "Type": "Conditoning & Programming",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "High - low Pull ups",
    "Type": "Functional and endurance",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "Inverted deadlift",
    "Type": "Exposure and Raw",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Pull-ups",
    "Oefening": "Wide Pull ups",
    "Type": "Functional and endurance",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Dips",
    "Oefening": "Korean dip \\ hefesto",
    "Type": "Exposure and Raw",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Compr. / abs",
    "Oefening": "Pelvic tilt pull ups",
    "Type": "Conditoning & Programming",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Strength day",
    "Categorie": "Compr. / abs",
    "Oefening": "Dragonflag Hip Thrust",
    "Type": "Functional and endurance",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 10,
    "Aanbevolen gewicht": ""
  },
  {
    "Training type": "Leg day 2",
    "Categorie": "Legs",
    "Oefening": "Goblet squats",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 4,
    "Aanbevolen reps": "0",
    "Aanbevolen gewicht": "16/20"
  },
  {
    "Training type": "Leg day 2",
    "Categorie": "Legs",
    "Oefening": "Hip thrusts + band",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": 20
  },
  {
    "Training type": "Leg day 2",
    "Categorie": "Legs",
    "Oefening": "Bulgarian split squats",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 12,
    "Aanbevolen gewicht": 14
  },
  {
    "Training type": "Leg day 2",
    "Categorie": "Legs",
    "Oefening": "Side hip thrusts",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": 0
  },
  {
    "Training type": "Leg day 2",
    "Categorie": "Legs",
    "Oefening": "Standing hip abduction",
    "Type": "Strengthening",
    "Tempo": "",
    "Aanbevolen sets": 3,
    "Aanbevolen reps": 20,
    "Aanbevolen gewicht": 0
  }
];

export default function App() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    localforage.getItem("workouts").then((stored) => {
      if (!stored || stored.length === 0) {
        localforage.setItem("workouts", seed).then(() => setWorkouts(seed));
      } else {
        setWorkouts(stored);
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h1>Workout App met seed data</h1>
      <p>Oefeningen geladen: {workouts.length}</p>
    </div>
  );
}
