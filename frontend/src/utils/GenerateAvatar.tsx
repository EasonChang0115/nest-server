const generateDiceBearAvataaars = (seed: number) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;

const generateDiceBearBottts = (seed: number) =>
  `https://avatars.dicebear.com/api/bottts/${seed}.svg`;

const generateDiceBearGridy = (seed: number) =>
  `https://avatars.dicebear.com/api/gridy/${seed}.svg`;

export const generateAvatar = () => {
  const data: any[] = [];

  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearAvataaars(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearBottts(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearGridy(Math.random());
    data.push(res);
  }
  return data;
};
