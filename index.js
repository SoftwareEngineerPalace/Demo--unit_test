const deepClone = (v) => {
  if (v instanceof Object) {
    let result;
    if (v instanceof Array) {
      result = [];
    } else {
      result = {};
    }
    for (let key in v) {
      if (v.hasOwnProperty(key)) {
        result[key] = deepClone(v[key]);
      }
    }
    return result;
  } else {
    return v;
  }
};

/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (properties, objects) => {
  objects.forEach((o) => properties.forEach((property) => delete o[property]));
  return objects;
};

exports.excludeByProperty = (property, objects) => {
  return objects.filter((o) => !o.hasOwnProperty(property));
};

exports.sumDeep = (source) => {
  const clonedSource = deepClone(source);
  clonedSource.forEach((o) => {
    const sum = o.objects.reduce((prev, cur) => cur.val + prev, 0);
    o.objects = sum;
  });
  return clonedSource;
};

exports.applyStatusColor = (rule, sources) => {
  let ruleMap = new Map();
  Object.keys(rule).forEach((color) => {
    const statusArr = rule[color];
    statusArr.forEach((status) => {
      ruleMap.set(status, color);
    });
  });

  const DefaultColor = "DefaultColor";
  const result = sources
    .map((o) => {
      o.color = ruleMap.get(o.status) || DefaultColor;
      return o;
    })
    .filter((o) => o.color !== DefaultColor);
  return result;
};

exports.createGreeting = (greetTemplateFunc, greeting) => {
  return (name) => greetTemplateFunc(greeting, name);
};

exports.setDefaults = () => {
  return (obj) => Object.assign({ subscribed: true }, obj);
};

exports.fetchUserByNameAndUsersCompany = (name, services) => {
  async function fetchUserAndCompany() {
    const users = await services.fetchUsers();
    const user = users.find((user) => user.name === name);
    const company = await services.fetchCompanyById(user.companyId);
    return { user, company };
  }

  return new Promise((resolve) => {
    return Promise.all([fetchUserAndCompany(), services.fetchStatus()]).then(
      (values) => {
        resolve({
          user: values[0].user,
          company: values[0].company,
          status: values[1],
        });
      }
    );
  });
};
