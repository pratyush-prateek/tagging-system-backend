import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { SAME_LENGTH_AS } from './validators.const';

/**
 * Validator which validates if an array have same property as another valid array.
 * @param property property name.
 * @param validationOptions Validation options.
 * @returns Validator.
 */
export const SameLengthAs = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: SAME_LENGTH_AS,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, any>)[
            relatedPropertyName
          ];
          return (
            Array.isArray(value) &&
            Array.isArray(relatedValue) &&
            value.length === relatedValue.length
          );
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must have the same length as ${relatedPropertyName}`;
        },
      },
    });
  };
};
