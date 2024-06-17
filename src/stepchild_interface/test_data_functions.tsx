import { StepchildFile } from "@/app/context/FilesContext";

const generateRandomArrayBuffer = (size: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
};

export const loadTestData = async (): Promise<StepchildFile[]> => {
  const data: StepchildFile[] = [
    {
      path: "/SAVES/ambient_sounds_01.child",
      name: "Ambient Sounds 01",
      fileSize: 300,
      id: 1,
      data: generateRandomArrayBuffer(300),
    },
    {
      path: "/SAVES/session_2023_05_15.child",
      name: "Session 2023-05-15",
      fileSize: 400,
      id: 2,
      data: generateRandomArrayBuffer(400),
    },
    {
      path: "/SAVES/synthwave_bassline.child",
      name: "Synthwave Bassline",
      fileSize: 500,
      id: 3,
      data: generateRandomArrayBuffer(500),
    },
    {
      path: "/SAVES/idea_sketch_01.child",
      name: "Idea Sketch 01",
      fileSize: 350,
      id: 4,
      data: generateRandomArrayBuffer(350),
    },
    {
      path: "/SAVES/mixdown_final_v2.child",
      name: "Mixdown Final V2",
      fileSize: 450,
      id: 5,
      data: generateRandomArrayBuffer(450),
    },
    {
      path: "/SAVES/drum_patterns_01.child",
      name: "Drum Patterns 01",
      fileSize: 320,
      id: 6,
      data: generateRandomArrayBuffer(320),
    },
    {
      path: "/SAVES/jazz_jam_session.child",
      name: "Jazz Jam Session",
      fileSize: 480,
      id: 7,
      data: generateRandomArrayBuffer(480),
    },
    {
      path: "/SAVES/ambient_pad_02.child",
      name: "Ambient Pad 02",
      fileSize: 310,
      id: 8,
      data: generateRandomArrayBuffer(310),
    },
    {
      path: "/SAVES/trap_beat_01.child",
      name: "Trap Beat 01",
      fileSize: 390,
      id: 9,
      data: generateRandomArrayBuffer(390),
    },
    {
      path: "/SAVES/vocal_samples.child",
      name: "Vocal Samples",
      fileSize: 420,
      id: 10,
      data: generateRandomArrayBuffer(420),
    },
    {
      path: "/SAVES/fx_library.child",
      name: "FX Library",
      fileSize: 350,
      id: 11,
      data: generateRandomArrayBuffer(350),
    },
    {
      path: "/SAVES/lofi_beat_02.child",
      name: "Lofi Beat 02",
      fileSize: 370,
      id: 12,
      data: generateRandomArrayBuffer(370),
    },
    {
      path: "/SAVES/orchestral_strings_01.child",
      name: "Orchestral Strings 01",
      fileSize: 460,
      id: 13,
      data: generateRandomArrayBuffer(460),
    },
    {
      path: "/SAVES/electro_house_bass.child",
      name: "Electro House Bass",
      fileSize: 430,
      id: 14,
      data: generateRandomArrayBuffer(430),
    },
    {
      path: "/SAVES/film_score_sketch.child",
      name: "Film Score Sketch",
      fileSize: 490,
      id: 15,
      data: generateRandomArrayBuffer(490),
    },
    {
      path: "/SAVES/sound_design_ideas.child",
      name: "Sound Design Ideas",
      fileSize: 410,
      id: 16,
      data: generateRandomArrayBuffer(410),
    },
  ];

  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};
