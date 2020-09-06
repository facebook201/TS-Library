/**
 * 
 * @param el 获取当前元素相对于document的偏移量
 */

const getOffset = (el: HTMLElement) => {
  const {
      top,
      left
  } = el.getBoundingClientRect()
  const {
      scrollTop,
      scrollLeft
  } = document.body
  return {
      top: top + scrollTop,
      left: left + scrollLeft
  }
}

/**
 * 判断是否是移动端
 */
const isMobile = () => 'ontouchstart' in window;


/**
 * 获取元素的类型
 */
const dataType = (obj: any) => Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();

/**
 * 禁止网页复制粘贴
 */

const html = document.querySelector('html')!;
html.oncopy = () => false
html.onpaste = () => false


/**
 * 只能输中文
 */
const input = document.querySelector('input[type="text"]')!;
const clearText = (target: any) => {
  const { value } = target
  target.value = value.replace(/[^\u4e00-\u9fa5]/g, '')
}

input.addEventListener('input', ({ target }) => {
  clearText(target);
}, false);






