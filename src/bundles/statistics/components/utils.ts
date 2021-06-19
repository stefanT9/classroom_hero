export const getAngerEvolution = (userMetadata: UserMetadata) => {
  const aux: any = {};
  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const keys = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const key = `f:${sorted[i].metadata?.anger}-t${
      sorted[i + 1].metadata?.anger
    }`;
    if (aux[key]) {
      aux[key] = {
        ...aux[key],
        count: aux[key].count + 1,
      };
    } else {
      keys.push(key);
      aux[key] = {
        from: `f:${sorted[i].metadata?.anger}`,
        to: `t:${sorted[i + 1].metadata?.anger}`,
        count: 1,
      };
    }
  }

  return keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]);
};

export const getSorrowEvolution = (userMetadata: UserMetadata) => {
  const aux: any = {};
  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const keys = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const key = `f:${sorted[i].metadata?.sorrow}-t${
      sorted[i + 1].metadata?.sorrow
    }`;
    if (aux[key]) {
      aux[key] = {
        ...aux[key],
        count: aux[key].count + 1,
      };
    } else {
      keys.push(key);
      aux[key] = {
        from: `f:${sorted[i].metadata?.sorrow}`,
        to: `t:${sorted[i + 1].metadata?.sorrow}`,
        count: 1,
      };
    }
  }

  return keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]);
};

export const getJoyEvolution = (userMetadata: UserMetadata) => {
  const aux: any = {};
  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const keys = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const key = `f:${sorted[i].metadata?.joy}-t${sorted[i + 1].metadata?.joy}`;
    if (aux[key]) {
      aux[key] = {
        ...aux[key],
        count: aux[key].count + 1,
      };
    } else {
      keys.push(key);
      aux[key] = {
        from: `f:${sorted[i].metadata?.joy}`,
        to: `t:${sorted[i + 1].metadata?.joy}`,
        count: 1,
      };
    }
  }

  return keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]);
};

export const getSurpriseEvolution = (userMetadata: UserMetadata) => {
  const aux: any = {};
  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const keys = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const key = `f:${sorted[i].metadata?.surprise}-t${
      sorted[i + 1].metadata?.surprise
    }`;
    if (aux[key]) {
      aux[key] = {
        ...aux[key],
        count: aux[key].count + 1,
      };
    } else {
      keys.push(key);
      aux[key] = {
        from: `f:${sorted[i].metadata?.surprise}`,
        to: `t:${sorted[i + 1].metadata?.surprise}`,
        count: 1,
      };
    }
  }

  return keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]);
};

export const getAbsentEvolution = (userMetadata: UserMetadata) => {
  const aux: any = {};

  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  const keys: Array<string> = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    let from = "";
    let to = "";
    if (sorted[i].metadata?.absent === false) {
      from = "f:present";
    } else {
      from = "f:absend";
    }
    if (sorted[i + 1].metadata?.absent === false) {
      to = "t:present";
    } else {
      to = "t:absent";
    }
    const key = `${from}-${to}`;
    if (aux[key]) {
      aux[key] = {
        ...aux[key],
        count: aux[key].count + 1,
      };
    } else {
      aux[key] = {
        from,
        to,
        count: 0,
      };
    }
  }

  console.log(keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]));
  return keys.map((key) => [aux[key].from, aux[key].to, aux[key].count]);
};
