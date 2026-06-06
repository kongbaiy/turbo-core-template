import React from 'react'
import { DataRouteObject } from 'react-router-dom'
import { loadMicroApp } from 'qiankun'
import { useLocationSearch, useWatch } from '@repo/react-hooks'

import router from '@/router'

interface Props {
    keepAlive?: boolean
}

interface ContainerProps {
    microApps: DataRouteObject[]
    activeContainer: string
}

const getContainerId = (container: string) => {
    return container.replace('#', '')
}

const Container = (props: ContainerProps) => {
    const { microApps = [], activeContainer } = props

    return microApps.map((item: any) => {
        const { microConfig } = item?.handle || {}

        return activeContainer === microConfig?.container ? (
            <div
                key={getContainerId(item.handle?.microConfig?.container)}
                id={getContainerId(item.handle?.microConfig?.container)}
            ></div>
        ) : null
    })
}

const KeepAliveContainer = (props: ContainerProps) => {
    const { microApps = [], activeContainer } = props

    return microApps.map((item: any) => {
        const { microConfig } = item?.handle || {}
        const display =
            activeContainer === microConfig?.container ? 'block' : 'none'

        return (
            <div
                style={{ display }}
                key={getContainerId(microConfig?.container)}
                id={getContainerId(microConfig?.container)}
            ></div>
        )
    })
}

const CreateMicroApp = (props: Props) => {
    const { keepAlive = false } = props
    const [basename] = useLocationSearch()
    const [activeContainer, setActiveContainer] = useState<string>('')

    const microApps: DataRouteObject[] = useMemo(
        () => router.routes.filter((item) => item.handle?.microConfig?.name),
        [],
    )

    useWatch(() => {
        const microApp = router.routes.find(
            (item) =>
                item.handle?.microConfig?.name && item.path?.includes(basename),
        )
        const { microConfig } = microApp?.handle || {}

        setActiveContainer(microConfig.container)

        if (microConfig) {
            const microAppContainer = document.querySelector(
                microConfig.container,
            )

            if (!microAppContainer || !microAppContainer?.children?.length)
                loadMicroApp(microConfig)
        }
    }, [basename])

    return (
        <>
            {keepAlive ? (
                <KeepAliveContainer
                    microApps={microApps}
                    activeContainer={activeContainer}
                />
            ) : (
                <Container
                    microApps={microApps}
                    activeContainer={activeContainer}
                />
            )}
        </>
    )
}

export default React.memo(CreateMicroApp)
