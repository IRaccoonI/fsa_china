const keys = [
  "id",
  "declDate",
  "applicantName",
  "applicantInn",
  "creatorInn",
  //   "productFullName",
  "productIdentificationOkpdTnved",
];

export const prepareData = (items: Record<string, any>[]) => {
  return items.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => keys.includes(key))
    )
  );
};
