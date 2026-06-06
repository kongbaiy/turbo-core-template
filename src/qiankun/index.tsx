import {
    ObjectType,
    registerMicroApps,
    RegistrableApp,
    start,
    // addGlobalUncaughtErrorHandler,
} from 'qiankun'
import actions from './actions'

export function register() {
    const microList: RegistrableApp<ObjectType>[] = [
        {
            name: 'sc-cloud-platform', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
            entry: `http://localhost:3002/__qiankun_entry.html?t=${Date.now()}`,
            container: '#qiankun-container',
            activeRule: '/platforms',
            props: {
                basicActions: actions,
            },
        },
        {
            name: 'test', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
            entry: `http://localhost:3004/__qiankun_entry.html?t=${Date.now()}`,
            container: '#qiankun-container2',
            activeRule: '/test',
            props: {
                basicActions: actions,
            },
        },
    ]

    registerMicroApps(microList)

    // addGlobalUncaughtErrorHandler((error) => {
    //     console.log('全局捕获到的未处理错误:', error)
    // })

    start({
        sandbox: {
            // 开启严格的样式隔离，防止样式冲突[reference:10]
            strictStyleIsolation: true,
            // 开启严格的样式隔离，防止样式冲突[reference:10]
            experimentalStyleIsolation: true,
        },
    })
}
