import { ValidationError } from "class-validator";

const formatErrors = (errors: ValidationError[]) => {
  const constraints: { [field: string]: any } = [];

  errors.forEach(({ property, constraints: errorConstraints }) => constraints.push({ [property]: errorConstraints }));

  return constraints;
};

export default formatErrors;