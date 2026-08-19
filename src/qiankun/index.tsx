import { ObjectType, registerMicroApps, RegistrableApp, start } from 'qiankun'
import actions from './actions'

export function register() {
    const microList: RegistrableApp<ObjectType>[] = [
        {
            name: 'sc-cloud-platform',
            entry: `http://localhost:3002/__qiankun_entry.html?t=${Date.now()}`,
            container: '#qiankun-container',
            activeRule: '/platforms',
            props: {
                basicActions: actions,
            },
        },
        {
            name: 'test',
            entry: `http://localhost:3004/__qiankun_entry.html?t=${Date.now()}`,
            container: '#qiankun-container2',
            activeRule: '/test',
            props: {
                basicActions: actions,
            },
        },
    ]

    registerMicroApps(microList)

    start({
        sandbox: {
            strictStyleIsolation: true,
            experimentalStyleIsolation: true,
        },
    })
}
