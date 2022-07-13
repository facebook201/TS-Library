

/**
 * 正则表达式 匹配 标签 注释 文档
 * 开始标签 < a-zA-Z0-9 和 - 出现多次，然后是属性的正则 > 开头 
 * 结束标签 </ a-zA-Z0-9 - 出现多次 >
 */

const htmlTemplate = `
<!doctype html>
<body>
  <header></header>
  <!-- 主体内容 -->
  <div class="text">
    <span id="span-box"></span>
    <div class="box1>
      boxs12
    </div>
  </div>
  <footer></footer>
</body>
`;


const startTagRex = /^<([a-zA-Z0-9\-]+)(?:([ ]+[a-zA-Z0-9\-]+=[^> ]+))*>/;
const endTagReg = /^<\/([a-zA-Z0-9\-]+)>/;

// 注释标签 comment 正则表达式 <!-- -->
const commentReg = /^<!\-\-[^(-->)]*\-\->/;

// <!doctype html>
const docTypeReg = /^<!doctype [^>]+>/;


// attribute 是多个空格开始，加 a-zA-Z0-9 或 - 出现多次，接一个 =，之后是非 > 字符出多次
const attrbuteReg = /^(?:[ ]+([a-zA-Z0-9\-]+=[^>]+))/;


function parse(html, options) {
  function advance(num) {
    html = html.slice(num);
  }

  while (html) {
    if (html.startsWith('<')) {
      const commentMatch = html.match(commentReg);
      // 先匹配注释
      if (commentMatch) {
        options.onComment({
          type: 'comment',
          value: commentMatch[0]
        });
        advance(commentMatch[0].length);
        continue;
      }

      // 在匹配 doctype 头
      const docTypeMatch = html.match(docTypeReg);
      if (docTypeMatch) {
        options.onDoctype({
          type: 'docType',
          value: docTypeMatch[0],
        });
        advance(docTypeMatch[0].length);
        continue;
      }

      // 
      const endTagMatch = html.match(endTagReg);
      if (endTagMatch) {
          options.onEndTag({
              type: 'tagEnd',
              value: endTagMatch[1]
          });
          advance(endTagMatch[0].length);
          continue;
      }

      // 匹配开头的项目 可匹配多个以及子级
      const startTagMatch = html.match(startTagRex);

      if (startTagMatch) {
        options.onStartTag({
          type: 'tagStart',
          value: startTagMatch[1],
        });
        
        advance(startTagMatch[1].length + 1);
        let attributeMatch;

        while (attributeMatch = html.match(attrbuteReg)) {
          options.onAttribute({
            type: 'attribute',
            value: attributeMatch[1]
          });
          advance(attributeMatch[0].length);
        }
        advance(1);
        continue;
      }
    } else {
      let textEndIndex = html.indexOf('<');
      options.onText({
        type: 'text',
        value: html.slice(0, textEndIndex),
      });

      textEndIndex = textEndIndex === -1 ? html.length : textEndIndex;
      advance(textEndIndex);
    }
  }
}

function htmlParser(str) {
  const AST = {
    children: []
  };

  let curParent = AST;
  let prevParent = null;

  const domTree = parse(str, {
    onComment(node) {

    },
    onStartTag(token) {
      const tag = {
        tagName: token.value,
        attributes: [],
        text: '',
        children: [],
      };

      curParent.children.push(tag);
      prevParent = curParent;
      curParent = tag;
    },

    onAttribute(token) {
      const [name, value] = token.value?.split('=');
      curParent.attributes.push({
        name,
        value: value.replace(/^['"]/, '').replace(/['"]$/, '') // 属性值 去掉' "
      });
    },

    onEndTag(token) {
      curParent = prevParent;
    },
    
    onDoctype(token) {},

    onText(token) {
      curParent.text = token.value;
    }
  });
  return AST.children[0];
};





const domTree = htmlParser(htmlTemplate);

console.log(JSON.stringify(domTree, null, 4), '-----asdsada')











