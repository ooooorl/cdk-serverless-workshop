const commons = {
  env: {
    account: "381492218855",
  },
  stage: "staging",
};

const Stateful = {
  ...commons,
  env: {
    ...commons.env,
    region: "ap-southeast-1",
  },
};

const Stateless = {
  ...commons,
  env: {
    ...commons.env,
    region: "ap-southeast-1",
  },
};

const Global = {
  ...commons,
  env: {
    ...commons.env,
    region: "us-east-1",
  },
};

export default {
  commons,
  Stateful,
  Stateless,
  Global,
};
