import { registerMicroApps, start } from 'qiankun'

export function register() {
    registerMicroApps([
        {
            name: 'child1', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
            entry: `http://localhost:3002/__qiankun_entry.html?t=${Date.now()}`, // 子应用入口地址（开发环境为服务端口）
            container: '#qiankun-child-container', // 子应用挂载的 DOM 容器
            activeRule: '/child', // 匹配此路由时激活子应用
            props: {
                // 可选的 props，会传递给子应用 mount 函数
                userInfo: { name: 'Parent App' },
            },
        },
    ])

    start({
        sandbox: {
            experimentalStyleIsolation: true, // 开启严格的样式隔离，防止样式冲突[reference:10]
        },
    })
}
