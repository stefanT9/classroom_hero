export const getAngerEvolution = (userMetadata: UserMetadata) => {
  const aux = [];

  console.log("userMetadata =>", userMetadata);
  console.log("metadataCopy =>", [...userMetadata.metadata]);
  console.log(
    "filtered =>",
    [...userMetadata.metadata].filter((val) => val.type === "emotions")
  );
  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  console.log("sorted =>", sorted);
  for (let i = 0; i < sorted.length - 1; i++) {
    aux.push([
      `f:${sorted[i].metadata?.anger}`,
      `t:${sorted[i + 1].metadata?.anger}`,
      1,
    ]);
  }

  return aux;
};

export const getSorrowEvolution = (userMetadata: UserMetadata) => {
  const aux = [];

  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  for (let i = 0; i < sorted.length - 1; i++) {
    aux.push([
      `f:${sorted[i].metadata?.sorrow}`,
      `t:${sorted[i + 1].metadata?.sorrow}`,
      1,
    ]);
  }
  return aux;
};

export const getJoyEvolution = (userMetadata: UserMetadata) => {
  const aux = [];

  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  for (let i = 0; i < sorted.length - 1; i++) {
    aux.push([
      `f:${sorted[i].metadata?.joy}`,
      `t:${sorted[i + 1].metadata?.joy}`,
      1,
    ]);
  }

  return aux;
};

export const getSurpriseEvolution = (userMetadata: UserMetadata) => {
  const aux = [];

  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

  for (let i = 0; i < sorted.length - 1; i++) {
    aux.push([
      `f:${sorted[i].metadata?.surprise}`,
      `t:${sorted[i + 1].metadata?.surprise}`,
      1,
    ]);
  }

  return aux;
};

export const getAbsentEvolution = (userMetadata: UserMetadata) => {
  const aux = [];

  const sorted = [...userMetadata.metadata]
    .filter((val) => val.type === "emotions")
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

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
    aux.push([from, to, 1]);
  }

  return aux;
};
