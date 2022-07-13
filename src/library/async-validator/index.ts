


import {
  InternalRuleItem,
  InternalValidateMessages,
  Rule,
  RuleItem,
  Rules,
  ValidateCallback,
  ValidateMessages,
  ValidateOption,
  Values,
  RuleValuePackage,
  ValidateError,
  ValidateFieldsError,
  SyncErrorType,
  ValidateResult,
} from './interface';

// export 

/**
 * * 首先从 validate 验证方法入手
 */


class Schema {

  // * ====================== Static  =======================
  static register = function register(type: string, validator) {
    if (typeof validator !== 'function') {
      throw new Error('Cannot register a validator by type, validator is not a function!');
    }
    validators[type] = validator;
  }

  static warning = warning;

  static messages = defaultMessages;

  static validators = validators;


  // * =====================  Instance  ========================
  rules: Record<string, RuleItem[]> = null;
  _messages: InternalValidateMessages = defaultMessages;



  // * 传入 schema 的描述对象
  constructor(descriptor: Rules) {
    this.define(descriptor);
  }

  define(rules: Rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};

    Object.keys(rules).forEach(name => {
      const item: Rule = rules[name];
      // * 转为数组 方便遍历 常用手段
      this.rules[name] = Array.isArray(item) ? item : [item];
    });
  }

  messages(messages?: ValidateMessages) {
    if (messages) {
      this._messages = deepMerge(newMessages(), messages);
    }
    return this._messages;
  }

















  
  validate(
    source: Values,
    option?: ValidateOption,
    callback?: ValidateCallback,
  ): Promise<Values>;
  validate(source: Values, callback: ValidateCallback): Promise<Values>;
  validate(source: Values): Promise<Values>;
  
  /**
   * 
   *  const validator = new Schema(descriptor);
   *  * 回调写法
   *  validator.validate({ name: 'xx' }, (errors, fields) => {
   *  if (errors) {
   *    handlerErrors(errors, fileds)
   *  }
   *  });

   * * Promise 写法
   *  validator.validate({ name: 'xx' }).then(() => {
   *  }).catch(({ errors, fileds }) => {
   *    handleErrors(erros, fields);
   *  })
   */

  validate(source_: Values, o: any = {}, oc: any = () => {}): Promise<values> {
    let source: Values = source_;
    let options: ValidateOption = o;
    let callback: ValidateCallback = oc;

    if (typeof options === 'function') {
      options = callback;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }

      return Promise.resolve(source);
    }
  }


















}