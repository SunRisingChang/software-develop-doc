---
footer: false
---

## 1.取消订阅

```js
destroy$ = new Subject();

// 实现 OnDestroy 接口
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

initSub(){
  this.sharedService.commonNoticeVar$
    .pipe(
      // 取消订阅
      takeUntil(this.destroy$),
      filter((val) =>
        [
          ConstDef.JxplusMsg.Category.ResetRouterDone,
          ConstDef.JxplusMsg.Category.UpdateMqIdbDone,
          ConstDef.JxplusMsg.Category.MqttInvoiceSync,
        ].includes(val)
      )
    )
    .subscribe(() => {});
}
```

## 2.Http 异常处理

```js
handleTest() {
  this.httpClient.post<HttpResponseBody>(Apis.postApiJxplusInvoiceCheckGetIllegalInfo, {}).pipe(
    // 页面销毁时取消订阅
    takeUntil(this.destroy$),
    map((res) => {
      // 处理业务开始...
      // 抛出异常
      if (res.status != HTTP_BIZ_STATUS.SUCCESS.CODE) throw new ZxtError(res.message);
      // 处理业务结束...
      return res;
    }),
    catchError((error: any) => {
      // 捕获异常
      // 处理异常场景
      if (error instanceof ZxtError) this.zxtMessageService.errorMessage(error.message);
      return throwError(error);
    }),
    finalize(() => {
      // 无论如何都会执行
      // 释放资源
    }),
  ).subscribe(res => {
      // 对 Class 对象进行赋值操作
      // this.data=res
  })
```

## 3.轮询请求

```js
// 延迟进行轮询操作
timer(1000 * 5)
  .pipe(
    concatMap(() =>
      // 进行目标查询
      sendHttp().pipe(
        // 业务判断是否要进行轮询操作
        map((res) => {
          if (res == 0) throw new ZxtError("申请还未通过，继续轮训...");
        }),
        // 错误判断是否要进行轮询操作
        catchError((error) => {
          if (error instanceof Error) {
            return throwError(() => error);
          }
          return of("手动消费异常，终止轮询");
        })
      )
    ),
    retryWhen((result$) => {
      return result$.pipe(
        // 不符合重试的异常类型 直接抛出
        filter((result) => {
          if (result instanceof ZxtError) return true;
          throw result;
        }),
        // 重试次数限制
        scan((retryCount, result) => {
          if (retryCount == 5) throw result;
          return retryCount + 1;
        }, 0),
        // 延迟重试
        delayWhen((retryCount) => timer(1000 * retryCount)),
        // 输出重试日志
        tap((retryCount) => {
          console.log(`第（${retryCount}）次重试...`);
        })
      );
    })
  )
  .subscribe(console.log);
```
