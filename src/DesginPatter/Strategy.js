/**
 * 
 * 策略模式是一种行为设计模式， 它能让你定义一系列算法， 
 * 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。
 * 策略模式的目的就是将算法的使用与算法的实现分离开。
 * 
 * 策略指的是你解决问题的手段
 *
 * 策略类：
 * 封装了具体的算法，负责计算过程
 * 
 * 环境类：Context
 * 接受客户的请求，随后把请求委托给某一个策略类 所以Context里面要维持某个策略对象的引用 
 */



/**
 * 表单验证
 * 假设我们正在编写一个注册的页面，在点击注册按钮之前，有如下几条校验逻辑。
 *    用户名不能为空。
 *    密码长度不能少于6 位。
 *    手机号码必须符合格式
 */


// 策略对象
const strategies = {
  required: function(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  len: function(value, length, errorMsg) {
    console.log(value, length, errorMsg);
  }
};

// 环境类
function Validator() {
  this.cache = [];
}


function backKeys(obj) {
  let keys = Object.keys(obj);
  let i = 0;
  while (i <= keys.length) {
    let key = keys[i];
    if (key in strategies) {
      return key;
    }
    i++;
  }
}

/**
 * @param {itemName} 具体的规则限制对象
 * @param rules 校验规则
 */
Validator.prototype.add = function (itemName, rules) {
	const self = this;

	for (let i = 0; i < rules.length; i++) {
    	let rule = rules[i];

    	(function(rule) {
        var strategAry = [];
        var strategy = backKeys(rule);
        var errorMsg = rule.errorMsg;
        self.cache.push(function() {
          // 添加要检验的value
          strategAry.unshift(itemName.value);
          strategAry.push(errorMsg);
          return strategies[strategy].apply(itemName, strategAry);
        });
    	})(rule);
  	}
}

Validator.prototype.start = function() {
  for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};

const form = {
  username: {
    value: '',
    errorMsg: '不能为空'
  }
};

function validatorFunc() {
  var validator = new Validator();

  // 用户名添加规则
  validator.add(form.username, [
    {
      required: true,
      errorMsg: '不能为空'
    },
    {
      len: 6,
      errorMsg: '用户名长度不能小于6位'
    }
  ]);

  // 密码添加规则
  // validator.add(form.password, [
  //   {
  //     strategy: 'minLength:6',
  //     errorMsg: '密码长度不能为小于6'
  //   }
  // ]);

  // // 手机号码
  // validator.add(form.phone, [
  //   {
  //     strategy: 'minLength:11',
  //     errorMsg: '手机号码长度不能小于11'
  //   },
  //   {
  //     strategy: '',
  //     errorMsg: '手机号码长度不能小于11'
  //   }
  // ]);


  // 添加规则完毕 开始遍历校验规则
  let errorMsg = validator.start();
  return errorMsg;
}


const registerForm = {};

// 最后提交
registerForm.onSubmit = function() {
  // 验证规则阶段
  var errorMsg = validatorFunc();

  if (errorMsg) {
    console.log(errorMsg);
    return false;
  }
};

registerForm.onSubmit();