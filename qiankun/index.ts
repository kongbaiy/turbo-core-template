import { loadMicroApp, start } from 'qiankun'

// const microList: RegistrableApp<ObjectType>[] = [
//     {
//         name: 'child1', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
//         entry: `http://localhost:3004/__qiankun_entry.html?t=${Date.now()}`,
//         container: '#qiankun-child-container',
//         activeRule: '/child',
//         props: {
//             userInfo: { name: 'Parent App' },
//         },
//     },
// ]

export function register() {
    // registerMicroApps(microList)

    loadMicroApp({
        name: 'child1', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
        entry: `http://localhost:3004/__qiankun_entry.html?t=${Date.now()}`,
        container: '#qiankun-child-container',
    })

    start({
        sandbox: {
            // 开启严格的样式隔离，防止样式冲突[reference:10]
            experimentalStyleIsolation: true,
        },
    })
}
