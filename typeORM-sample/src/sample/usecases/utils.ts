import * as typeorm from 'typeorm';
import * as classValidator from 'class-validator';

export function partialAssign(obj, params) {
  for (const key of Object.keys(params)) {
    obj[key] = params[key] !== undefined ? params[key] : obj[key];
  }
}

export async function save(obj) {
  const errors = await classValidator.validate(obj);
  if (errors.length) {
    for (const err of errors) {
      throw new Error(err.constraints.matches);
    }
  } else {
    const connection = await typeorm.getConnection();
    await connection.manager.save(obj);
    return obj;
  }
}
