
// Typescript 官方的高级技巧
namespace UtilityType {
  type Language = 'Chinese' | 'English';

  type Person = {
    name: string,
    id: string,
    company?: string,
  };
  
  // 把所有属性转为可选属性
  type a = Partial<Person>

  // required 把所有属性转换为必选
  type rb = Required<Person>;


  type recordC = Record<'zhangsan' | 'lisi', Person>;

  const recordCExample: recordC = {
    'zhangsan': {
      name: '张三',
      id: '9527',
      company: '北京',
    },
    'lisi': {
      name: '李四',
      id: '9528',
    }
  };

  // Record 在 axios 里面的应用

  enum HTTPMethods {
    GET = 'get',
    POST = 'post',
    DELETE = 'delete',
    PUT = 'put',
  };

  const methods = ['get', 'post', 'delete', 'put'];

  type AxiosRequestConfig = {
    data: {},
  };

  interface IHttpFn {
    <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  }

  type IHttp = Record<HTTPMethods, IHttpFn>;

  const httpMethods: IHttp = methods.reduce((map: any, method: string) => {
    map[method] = (url: string, options: AxiosRequestConfig) => {
      const { data, ...config } = options;

      return (axios as any)[method](url, data, config)
        .then((res: any) => {
          if (res.data.errCode) {
            // todo somethings
          } else {
            // todo somethings
          }
        })
    }
    return map;
  }, {});


  /**
   * Pick<T, keys>
   * 从 T对象里面 选出包含 keys 属性 组成一个新对象
   * 
   * Pick<T, K extends keyof T> = { [P in K]: T[P] };
   */
  type pickE = Pick<Person, 'name' | 'id'>;


  /**
   * Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
   * 保留 T 中不存在 U 里面的值
   * type Exclude<T, U> = T extends U ? never : T;
   */
  // value is 'name'
  type excludeVal = Exclude<'name' | 'id',  'id'>;

  /**
   * Extract<T, U> -- 提取T中可以赋值给U的类型。
   * 
   * type Extract<T, U> = T extends U ? T : never;
   */
  type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"


  /**
   * Omit 返回除去 keys 类型的新对象
   * type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
   */
  type omitVal = Omit<Person, 'name'>; // { id: string, company?: string }

}


