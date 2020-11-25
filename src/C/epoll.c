
// 网络服务器 异步非阻塞IO
// 多线程需要CPU上下文切换 需要操作文件句柄
// 单线程 IO 多路复用











// Select 主要是收集文件描述符 然后交给内核（用户态拷贝到内核态），当里面一个或多个有数据的会后 select函数返回。
// 有数据的fd 会被置位，然后返回。
// 缺点 数据结构 bitmap 只有1024位、fdSET会置位、用户和内核态的切换开销大。、select遍历的复杂度是O(n)



// select poll 需要每次把所有用户态的文件事件复制到内核空间处理，轮询完一遍后把所有的fs复制到用户空间。
// epoll是内核空间 用一个红黑树维护所有的id，只需要把就绪的fd用链表复制到用户空间

int main() {
  /**
   * 初始化设置，包括socket建立，地址的设置
   */ 

  // int fds = 0;
  int max = 0;

  while (1) {
    // &rset 是bitmap类型 1024个 0 1 占位，  需要监听的置位1 不需要监听置位0
    FD_ZERO(&rset);
    for (int i = 0; i < 5; i++) {
      FD_SET(fds[i], &rset);
    }
    // 阻塞获取 每次把fd从用户态拷贝到内核态
    select(max + 1, &rset, NULL, NULL, NULL);
    // 有数据之后 fd置位
    for (int i = 0; i < 5; i++) {
      if (FD_ISSET(fds[i], &rset)) {
        memset(buffer, 0, MAXBUF);
        round(fds[i], buffer, MAXBUF);
        puts(buffer);
      }
    }
  }
}


// poll 

struct pollfds {
  int fd;
  short events;
  // 对events的回馈
  short revents;
};


// 内核置位 revents字段
// 

void pollM() {
  while(1) {
    // pollfds 是一个数组 poll的数据结构也是数组
    poll(pollfds, 5, 50000);

    for (int i = 0; i < 5; i++) {
      if (pollfds[i].revents && POLLIN) {
        pollfds[i].revents = 0;
        memset(buffer, 0, MAXBUF);
        read(pollfds[i].fd, buffer, MAXBUF);
        puts(buffer);
      }
    }
  }
}



