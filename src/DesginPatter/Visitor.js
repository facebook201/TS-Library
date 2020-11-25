/**
 * 访问者模式可以 不改变对象结构的前提 给对象增加新的逻辑，
 * 新增的逻辑保存在一个独立的访问者对象中。访问者模式一般用来扩展第三方库和工具
 * 
 * 
 * Visitor      访问者对象 有一个visit方法
 * Receiving    接收对象 拥有一个accept方法
 */

function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
}

// 获取薪水
Employee.prototype.getSalary = function() {
  return this.salary;
};

Employee.prototype.setSalary = function(salary) {
  this.salary = salary;
};

// 接收访问者
Employee.prototype.accept = function(visitor) {
  visitor.visit(this);
};

function Visitor() {}

Visitor.prototype.visit = function(employee) {
  // 设置两倍薪水
  employee.setSalary(employee.getSalary * 2);
};
