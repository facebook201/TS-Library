
namespace TSQuestion {
  type People = {
    id: string,
    name: string,
    age: number,
    from?: string,
    speak?: string,
  };
  
  type IsOptional<T, K extends keyof T> = {
    [K1 in Exclude<keyof T, K>]: T[K1]
  } & { K?: T[K] } extends T ? K : never
  
  type OptionalKeys<T> = {
    [K in keyof T]: IsOptional<T, K>
  }[keyof T];
  
  type a = OptionalKeys<People>;
  // warm-up



  // 第一题 
  type Foo = {
    name: string
    age: string
  }
  type Bar = {
    name: string
    age: string
    gender: number
  }

  // Exclude

  type Diff<A, B> = {
    [K in Exclude<keyof A, keyof B> | Exclude<keyof B, keyof A>]: 
      K extends keyof A ? A[K] : (K extends keyof B ? B[K] : never)
  }

  type value = Diff<Foo, Bar>;





  







}









