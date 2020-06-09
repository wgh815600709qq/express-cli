##  埋点系统

> 前端埋点

>> 引入前沿

```
// 定义埋点调用类
class PerformanceListener {
  constructor() {
    this.status = false
    this.host = ''
  }
  report (params, url = '/logs/add', headers = {
      'Content-Type': 'application/json'
  }) {
      // 非阻塞
      setTimeout(() => {
        fetch(this.host + url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params),
            mode: 'cors'
        }).then(response => {
            if (response.ok === false) {
                throw new Error('error:' + url)
            }  else {
                console.log('report success')
            }
        })
      })
  }

  updateHost (host) {
    this.host = host
  }
  updateStatus (status) {
    this.status = status
  }
}
const instance = new PerformanceListener()
window.performanceInstance = instance
// 定义钩子挂点函数

window.console.hook = (params) => {
  if (instance.status) {
    instance.report(params)
  }
}
```
>> 埋点示例

```
console.hook({
    type: 'treeMenuClick', 
    random_string: model.pageId, 
    timestamp: +new Date(), 
    user_agent: navigator.userAgent,
    user_id: 'admin',
    url: '',
    sign: 'start'
})

```

> 实现核心

```
1、express根据数据分析
2、dva平台展示数据
```