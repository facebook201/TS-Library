
import {
  ValidateError,
  ValidateOption,
  RuleValuePackage,
  InternalRuleItem,
  SyncErrorType,
  RuleType,
  Value,
  Values,
} from './interface';

const formatRegExp = /%[sdj%]/g;

// declare var ASYNC_VALIDATOR_NO_WARNING;

export let warning: (type: string, errors: SyncErrorType[]) => void = () => {};


export function convertFieldsError(
  errors: ValidateError[],
): Record<string, ValidateError[]> {
  if ()

  return {};
}

