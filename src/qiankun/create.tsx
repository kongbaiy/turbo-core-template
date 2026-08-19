import { DataRouteObject, useLocation } from 'react-router-dom'
import { loadMicroApp } from 'qiankun'
import router from '@/router'

interface Props {
    keepAlive?: boolean
}

interface ContainerProps {
    microApps: DataRouteObject[]
}

const getContainerId = (container: string) => {
    return container.replace('#', '')
}

const Container = (props: ContainerProps) => {
    const { microApps = [] } = props

    return microApps.map((item: any) => {
        const { microConfig } = item?.handle || {}

        return (
            <div
                key={getContainerId(microConfig?.container)}
                id={getContainerId(microConfig?.container)}
            ></div>
        )
    })
}

const KeepAliveContainer = (props: ContainerProps) => {
    const { microApps = [] } = props
    const location = useLocation()

    return microApps.map((item: any) => {
        const { microConfig } = item?.handle || {}
        const path = item.path.replace(/\/\*/, '')
        const display = location.pathname.startsWith(path) ? 'block' : 'none'

        return (
            <div
                style={{ display }}
                key={getContainerId(microConfig?.container)}
                id={getContainerId(microConfig?.container)}
            ></div>
        )
    })
}

const microAppCached = new Map()
const CreateMicroApp = (props: Props) => {
    const { keepAlive = false } = props
    const location = useLocation()

    const microApps: DataRouteObject[] = useMemo(
        () => router.routes.filter((item) => item.handle?.microConfig?.name),
        [],
    )

    // useLayoutEffect(() => {
    //     const microApp: any = microApps.find((item: any) => {
    //         const path = item.path.replace(/\/\*/, '')
    //         return location.pathname.startsWith(path)
    //     })

    //     const cached = microAppCached.get(microApp.id)

    //     if (!cached) {
    //         const microAppInstance = loadMicroApp(microApp?.handle?.microConfig)
    //         microAppCached.set(microApp.id, microAppInstance)
    //     } else {
    //         cached?.update?.()
    //     }
    // }, [microApps, location])

    // useEffect(() => {
    //     microApps.forEach((item) => {
    //         const cached = microAppCached.get(item.id)
    //         if (cached) cached.unmount()
    //     })
    // }, [location.pathname])

    useEffect(() => {
        const microApp: any = microApps.find((item: any) => {
            const path = item.path.replace(/\/\*/, '')
            return location.pathname.startsWith(path)
        })

        const cached = microAppCached.get(microApp.id)
        if (!cached) {
            const microAppInstance = loadMicroApp(
                microApp?.handle?.microConfig,
                {
                    sandbox: {
                        experimentalStyleIsolation: true,
                    },
                },
            )
            microAppCached.set(microApp.id, microAppInstance)
        } else {
            cached.update?.()
        }
    }, [microApps, location.pathname])

    return keepAlive ? (
        <KeepAliveContainer microApps={microApps} />
    ) : (
        <Container microApps={microApps} />
    )
}

export default CreateMicroApp
